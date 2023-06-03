type Env = { GITHUB_TOKEN: string }
const env = process.env as Env;
export const GITHUB_TOKEN = env.GITHUB_TOKEN