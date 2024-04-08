class Cries {
  latest: string | null;
}

class Sprites {
  front_default: string | null;
}

export class PokeApiRes {
  cries: Cries;

  id: number;

  name: string;

  sprites: Sprites;
}
