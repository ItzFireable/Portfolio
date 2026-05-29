import Elysia from 'elysia';

interface TachiGameConfig {
  name: string;
}

interface TachiUserGameStatsDocument {
  userID: number;
  game: string;
  ratings: Record<string, number | null>;
  classes: Record<string, number | string | null>;
}

interface TachiUserGameStatsBody {
  gameStats: TachiUserGameStatsDocument;
  totalScores: number;
  firstScore: unknown;
  mostRecentScore: unknown;
  playtime: number;
  rankingData: Record<string, { ranking: number; outOf: number }>;
}

interface TachiGamesBody {
  supportedGames: string[];
  configs: Record<string, TachiGameConfig>;
}

interface TachiApiResponse<T> {
  success: boolean;
  description: string;
  body: T;
}

export interface GameStats {
  game: string;
  gameName: string;
  playCount: number;
  playtime: number;
  rating: number | null;
  colour: string;
}

export interface TachiPluginConfig {
  tachiApiToken: string;
  tachiApiBaseUrl: string;
  colourOverrides?: Record<string, string>;
}

export function tachiPlugin(config: TachiPluginConfig) {
  const authHeaders = { Authorization: `Bearer ${config.tachiApiToken}` };

  function getColour(id: string): string {
    return config.colourOverrides?.[id] ?? '#888888';
  }

  async function tachiGet<T>(path: string): Promise<T> {
    const url = `${config.tachiApiBaseUrl}${path}`;
    const res = await fetch(url, { headers: authHeaders });
    if (!res.ok) throw new Error(`Tachi HTTP ${res.status} on ${url}`);
    const json = (await res.json()) as TachiApiResponse<T>;
    if (!json.success) throw new Error(`Tachi error: ${json.description}`);
    return json.body;
  }

  return new Elysia({ prefix: '/tachi' })
    .get('/game/:id', async ({ params: { id } }): Promise<GameStats> => {
      if (!id)
        throw new Error(`Invalid game format — got "${id}"`);

      const [statsBody, gamesBody] = await Promise.all([
        tachiGet<TachiUserGameStatsBody>(`/users/me/games/${id}`),
        tachiGet<TachiGamesBody>('/games'),
      ]);

      const { gameStats, totalScores, rankingData } = statsBody;
      const gameName = gamesBody.configs[id]?.name ?? id;
      const defaultAlg = Object.keys(rankingData)[0];
      const rating = defaultAlg ? (gameStats.ratings[defaultAlg] ?? null) : null;

      return {
        game: id,
        gameName,
        playCount: totalScores,
        playtime: statsBody.playtime,
        rating,
        colour: getColour(id),
      };
    })

    .get('/games', async (): Promise<GameStats[]> => {
      const [myGamesBody, allGamesBody] = await Promise.all([
        tachiGet<TachiUserGameStatsDocument[]>('/users/me/games'),
        tachiGet<TachiGamesBody>('/games'),
      ]);

      return myGamesBody.map((gameStats) => {
        const { game, ratings } = gameStats;
        const id = `${game}`;
        const gameName = allGamesBody.configs[game]?.name ?? game;
        const rating = Object.values(ratings)[0] ?? null;

        return {
          game,
          gameName,
          playCount: 0,
          playtime: 0,
          rating,
          colour: getColour(id),
        };
      });
    });
}