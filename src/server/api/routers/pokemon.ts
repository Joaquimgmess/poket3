import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const pokemonRouter = createTRPCRouter({
  getList: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(10),
      offset: z.number().min(0).default(0),
      search: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const { limit, offset, search } = input;
      
      let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
      if (search) {
        url = `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon list");
      }

      const data = await response.json();
      
      let results = search ? [data] : data.results;
      const pokemonDetails = await Promise.all(
        results.map(async (pokemon: { name: string; url: string }) => {
          const detailResponse = await fetch(pokemon.url || `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          if (!detailResponse.ok) {
            throw new Error(`Failed to fetch details for ${pokemon.name}`);
          }
          return await detailResponse.json();
        })
      );

      return {
        results: pokemonDetails.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types.map((type: { type: { name: string } }) => type.type.name),
          sprites: {
            front_default: pokemon.sprites.front_default,
          },
        })),
        hasMore: !search && results.length === limit,
      };
    }),

  getPokemon: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`);
      if (!response.ok) {
        throw new Error("Pokémon não encontrado");
      }
      const data = await response.json();
      return {
        name: data.name,
        id: data.id,
        height: data.height,
        weight: data.weight,
        types: data.types.map((type: { type: { name: string } }) => type.type.name),
        sprites: {
          front_default: data.sprites.front_default,
        },
      };
    }),
  
  getRandomPokemon: publicProcedure
    .query(async () => {
      const randomId = Math.floor(Math.random() * 898) + 1; // Há 898 Pokémon na API
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (!response.ok) {
        throw new Error("Falha ao buscar Pokémon aleatório");
      }
      const data = await response.json();
      return {
        name: data.name,
        id: data.id,
        types: data.types.map((type: { type: { name: string } }) => type.type.name),
        sprites: {
          front_default: data.sprites.front_default,
        },
      };
    }),
});