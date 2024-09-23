import React from "react";
import Image from "next/image";

interface PokemonCardProps {
  name: string;
  id: number;
  types: string[];
  imageUrl: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  id,
  types,
  imageUrl,
}) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="relative mb-4 h-48 w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <h2 className="mb-2 text-xl font-semibold capitalize">{name}</h2>
      <p className="mb-2 text-gray-600">#{id.toString().padStart(3, "0")}</p>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <span
            key={type}
            className="rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-800"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
