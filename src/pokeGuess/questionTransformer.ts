import { Injectable, Logger } from '@nestjs/common';
import { PokemonAPIResponse, PokemonTransformedData } from './types';

@Injectable()
export class QuestionTransformer {
  logger: Logger;
  constructor() {
    this.logger = new Logger(QuestionTransformer.name);
  }
  transform(data: PokemonAPIResponse[]): PokemonTransformedData {
    this.logger.log('Pokemon Data Transform');
    // random the correct Pokemon before sending to frontend
    const answerIdx = Math.floor(Math.random() * data.length);
    return {
      pokemonId: data[answerIdx].id,
      pokemonName: data[answerIdx].name,
      pokemonImg: data[answerIdx].sprites.front_default,
      pokemonNameList: data.map((pokemon) => {
        return pokemon.name;
      }),
    };
  }
}
