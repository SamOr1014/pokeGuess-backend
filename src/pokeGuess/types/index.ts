export type PokemonTransformedData = {
  pokemonId: number;
  pokemonName?: string;
  pokemonCry?: string;
  pokemonImg: string;
  pokemonNameList: string[];
};

export type PokemonAPIResponse = {
  cries: {
    latest: string | null;
  };
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
  };
};

export type Answer = {
  pokemonId: number;
  answer: string;
};

export type ValidateAnswerResponse = {
  correct: boolean;
  image: string;
  pokemonName: string;
};
