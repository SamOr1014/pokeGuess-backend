import { Injectable, Logger } from '@nestjs/common';
import { PokeApiRes } from '../entities/PokeApiRes';
import { PokemonInfo } from '../entities/PokemonInfo';

@Injectable()
export class PokemonTransformer {
  logger: Logger;
  constructor() {
    this.logger = new Logger(PokemonTransformer.name);
  }
  transform(data: PokeApiRes): PokemonInfo {
    this.logger.log('@transform');

    return {
      pokemonId: data.id,
      pokemonName: data.name,
      pokemonCry: data.cries.latest,
      pokemonImg: data.sprites.front_default,
      // hectograms to kilograms
      weight: data.weight / 10,
      // decimetres to centermeteres
      height: data.height * 10,
      type: data.types.map((type) => type.type.name),
    };
  }
}
