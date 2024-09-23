"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";

const PokemonDisplay = () => {
  const [pokemonName, setPokemonName] = useState("");
  const { data: pokemonData, refetch: refetchPokemon } =
    api.pokemon.getPokemon.useQuery(pokemonName, {
      enabled: false,
    });
  const { data: randomPokemonData, refetch: refetchRandomPokemon } =
    api.pokemon.getRandomPokemon.useQuery(undefined, {
      enabled: false,
    });

  const handleSearch = () => {
    if (pokemonName) {
      refetchPokemon();
    }
  };

  const handleRandom = () => {
    refetchRandomPokemon();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-8 text-4xl font-bold">Pokédex T3</h1>
      <div className="mb-4">
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Enter Pokémon name"
          className="rounded-l-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="rounded-r-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
      <button
        onClick={handleRandom}
        className="mb-4 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Random Pokémon
      </button>
      {pokemonData && (
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold">{pokemonData.name}</h2>
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            className="mb-4"
          />
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>Types: {pokemonData.types.join(", ")}</p>
        </div>
      )}
      {randomPokemonData && (
        <div className="mt-4 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold">
            {randomPokemonData.name}
          </h2>
          <img
            src={randomPokemonData.sprites.front_default}
            alt={randomPokemonData.name}
            className="mb-4"
          />
          <p>ID: {randomPokemonData.id}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonDisplay;
