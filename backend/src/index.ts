require('dotenv').config({ quiet: true });

import { Elysia, file } from "elysia";
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { rateLimit } from 'elysia-rate-limit'

import { WebSocketManager, WebSocketShardEvents } from '@discordjs/ws';
import { Snowflake, RESTGetAPIUserResult, GatewayIntentBits, APIUser } from 'discord-api-types/v9'

const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

let spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
let spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let spotifyRefreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

var lastSpotifyTick = 0;
var lastDiscordTick = 0;
var lastTokenTick = 0;

var spotifyAccessToken: string | null = null;

const ALL_INTENTS = GatewayIntentBits.GuildPresences;
const token = process.env.DISCORD_TOKEN

const rest = new REST().setToken(token);
const manager = new WebSocketManager({
  token: token,
  intents: ALL_INTENTS,
  rest,
});

let currentDiscordData: { status: string, user: APIUser | null } = {
  status: "offline",
  user: null
}

let currentSpotifyData: { data: any } = {
  data: null
};

manager.on(WebSocketShardEvents.Dispatch, async (event: any) => {
  if (event == null || event.t != "PRESENCE_UPDATE") return;
  currentDiscordData.status = event.d.status;
});

const fetchUser = async (id: Snowflake): Promise<RESTGetAPIUserResult> =>
  rest.get(Routes.user(id)) as Promise<RESTGetAPIUserResult>

async function updateUser() {
  if (Date.now() - lastDiscordTick < 30000) {
    return; // Prevent frequent updates, only update every 30 seconds
  }
  
  currentDiscordData.user = await fetchUser("329152844261490689");
  lastDiscordTick = Date.now();
}

async function updateSpotify() {
  if (Date.now() - lastSpotifyTick < 1000) {
    return; // Prevent frequent updates, only update every 1 second
  }

  await getSpotifyAccessToken();
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Authorization': `Bearer ${spotifyAccessToken}`
    }
  });

  if (!response.ok) {
    console.error("Failed to fetch Spotify currently playing track:", response.statusText);
    return;
  }

  const data = await response.json();
  currentSpotifyData.data = data;
  lastSpotifyTick = Date.now();
}

const getSpotifyAccessToken = async () => {
  if (spotifyAccessToken && Date.now() - lastTokenTick < (3600000 / 4)) { // Return cached token if it's still valid (15 minutes)
    return { access_token: spotifyAccessToken, refresh_token: spotifyRefreshToken };
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString('base64')}`
    },
    body: new URLSearchParams({
      'grant_type': 'refresh_token',
      'refresh_token': spotifyRefreshToken as string
    })
  });

  const data = await response.json();
  
  if (response.ok) {
    spotifyAccessToken = data.access_token;
    lastTokenTick = Date.now();
    return { access_token: data.access_token, refresh_token: data.refresh_token };
  } else {
    return { error: data.error || "Failed to get access token." };
  }
};

await getSpotifyAccessToken();

await updateUser();
await updateSpotify();
await manager.connect();

class SpotifyData {
  constructor(public data: any = null) { }
}

class DiscordData {
  constructor(public data: { status: string, user: APIUser | null } = {
    status: currentDiscordData.status,
    user: currentDiscordData.user
  }) { }
}

const app = new Elysia()
  .use(cors())
  .use(rateLimit())
  .use(swagger())
  .state('discord', new DiscordData())
  .state('spotify', new SpotifyData())
  .get('/discord', async ({ store: { discord } }) => {
    await updateUser();
    if (currentDiscordData.user == null || currentDiscordData.status == null) {
      return { error: "Discord user data is not available." };
    }

    discord.data.user = currentDiscordData.user;
    discord.data.status = currentDiscordData.status;

    return discord.data;
  })
  .get('/spotify', async ({ store: { spotify } }) => {
    await updateSpotify();
    if (currentSpotifyData.data == null) {
      return { error: "Spotify currently playing data is not available." };
    }

    spotify.data = currentSpotifyData.data;
    return spotify.data;
  })
  .onError(({ code }) => {
    if (code === 'NOT_FOUND') {
      return 'Route not found :('
    }
  })
  .listen(3000);

console.log("Server is running!");