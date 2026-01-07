export const config = {
  // Gateway runs on port 8080 - routes to all microservices
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  pokemonApiKey: process.env.REACT_APP_POKEMON_TCG_API_KEY || '1a55b655-e1ed-4c83-89b5-a6f70fdde7d5',
  isDevelopment: process.env.REACT_APP_ENV === 'development',
};