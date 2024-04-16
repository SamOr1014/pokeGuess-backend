class Cries {
  latest: string | null;
}

class Sprites {
  front_default: string | null;
}

class Types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export class PokeApiRes {
  cries: Cries;

  id: number;

  name: string;

  sprites: Sprites;

  types: Types[];

  weight: number;

  height: number;
}
