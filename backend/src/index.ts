require('dotenv').config({ quiet: true });
var fs = require('fs');

import { Elysia, file } from "elysia";
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { rateLimit } from 'elysia-rate-limit'

import { WebSocketManager, WebSocketShardEvents } from '@discordjs/ws';
import { Snowflake, RESTGetAPIUserResult, GatewayIntentBits, APIUser } from 'discord-api-types/v9'

const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

let currentDiscordData: { status: string, user: APIUser | null } = {
  status: "offline",
  user: null
}

const ALL_INTENTS = GatewayIntentBits.GuildPresences;
const token = process.env.DISCORD_TOKEN

const rest = new REST().setToken(token);
const manager = new WebSocketManager({
  token: token,
  intents: ALL_INTENTS,
  rest,
});

manager.on(WebSocketShardEvents.Dispatch, async (event: any) => {
  if (event == null || event.t != "PRESENCE_UPDATE") return;
  currentDiscordData.status = event.d.status;
});

const fetchUser = async (id: Snowflake): Promise<RESTGetAPIUserResult> =>
  rest.get(Routes.user(id)) as Promise<RESTGetAPIUserResult>

async function updateUser() {
  currentDiscordData.user = await fetchUser("329152844261490689");
  new Promise(resolve => {
    setTimeout(function () { resolve(100) }, 300000);
  }).then(updateUser);

  return await fetchUser("329152844261490689");
}

await updateUser();
await manager.connect();

class DiscordData {
  constructor(public data: { status: string, user: APIUser | null } = {
    status: currentDiscordData.status,
    user: currentDiscordData.user
  }) { }
}

const app = new Elysia()
  .use(cors())
  //.use(rateLimit())
  .state('discord', new DiscordData())
  .get('/discord', ({ store: { discord } }) => {
    discord.data.user = currentDiscordData.user;
    discord.data.status = currentDiscordData.status;

    return discord.data;
  })
  .get('/det', () => {
    // get a random image from the assets/det folder
    let files = fs.readdirSync('./public/images');
    let randomFile = files[Math.floor(Math.random() * files.length)];
    console.log(`Serving random image: ${randomFile}`);

    return file(`./public/images/${randomFile}`);
  })
  .onError(({ code }) => {
    if (code === 'NOT_FOUND') {
      return 'Route not found :('
    }
  })
  .listen(3000);

let spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
let spotifyClientCallback = process.env.SPOTIFY_CLIENT_CALLBACK;
let spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let spotifyRefreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

if (!spotifyClientId || !spotifyClientCallback || !spotifyClientSecret || !spotifyRefreshToken) {
  console.error("Spotify client ID, callback, secret, or refresh token is not set in the environment variables.");
}

const getSpotifyAccessToken = async () => {
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
    return { access_token: data.access_token, refresh_token: data.refresh_token };
  } else {
    return { error: data.error || "Failed to get access token." };
  }
};

const getSpotifyCurrentlyPlaying = async () => {
  const accessTokenResponse = await getSpotifyAccessToken();
  if (accessTokenResponse.error) {
    console.error("Error getting Spotify access token:", accessTokenResponse.error);
    return { error: accessTokenResponse.error };
  }

  const accessToken = accessTokenResponse.access_token;
  const currentlyPlayingResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!currentlyPlayingResponse.ok) {
    return { error: "Failed to fetch currently playing track." };
  }

  const currentlyPlayingData = await currentlyPlayingResponse.json();
  return currentlyPlayingData;
};

app.get('/spotify', async () => {
  const currentlyPlaying = await getSpotifyCurrentlyPlaying();
  if (currentlyPlaying.error) {
    return { error: currentlyPlaying.error };
  }

  return currentlyPlaying;
});