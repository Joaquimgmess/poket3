"use client";

import React, { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import PokemonCard from "./poke_card";
import { BaseModal } from "~/ui/BaseModal";
import Pagination from "~/ui/pagination";

const ITEMS_PER_PAGE = 12;

const PokemonList: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const {
    data: pokemonList,
    isLoading,
    error,
  } = api.pokemon.getList.useQuery({
    limit: ITEMS_PER_PAGE,
    offset: currentPageIndex * ITEMS_PER_PAGE,
    search: searchTerm,
  });

  const { data: randomPokemon, refetch: refetchRandom } =
    api.pokemon.getRandomPokemon.useQuery(undefined, {
      enabled: false,
    });

  useEffect(() => {
    if (pokemonList) {
      setTotalPages(currentPageIndex + (pokemonList.hasMore ? 2 : 1));
    }
  }, [pokemonList, currentPageIndex]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPageIndex(0);
  };

  const handleRandom = async () => {
    await refetchRandom();
    setOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">Pokédex T3</h1>

      <div className="mb-8 flex items-center justify-between">
        <form onSubmit={handleSearch} className="mr-4 flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Pokémon"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
        <button
          onClick={handleRandom}
          className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Random Pokémon
        </button>
      </div>

      {randomPokemon && (
        <BaseModal
          open={open}
          onClose={() => setOpen(false)}
          title="Pokémon"
          subTitle={randomPokemon.name}
        >
          <PokemonCard
            name={randomPokemon.name}
            id={randomPokemon.id}
            types={randomPokemon.types}
            imageUrl={randomPokemon.sprites.front_default}
          />
        </BaseModal>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {pokemonList?.results.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            name={pokemon.name}
            id={pokemon.id}
            types={pokemon.types}
            imageUrl={pokemon.sprites.front_default}
          />
        ))}
      </div>

      <Pagination
        totalItemsCount={totalPages * ITEMS_PER_PAGE}
        currentPageIndex={currentPageIndex}
        itensPerPage={ITEMS_PER_PAGE}
        setCurrentPageIndex={setCurrentPageIndex}
      />
    </div>
  );
};

export default PokemonList;
