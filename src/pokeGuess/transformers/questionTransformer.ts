import { Injectable, Logger } from '@nestjs/common';
import { TriviaQuestion } from '../entities/TriviaQuestion';
import { PokeApiRes } from '../entities/PokeApiRes';

@Injectable()
export class QuestionTransformer {
  logger: Logger;
  constructor() {
    this.logger = new Logger(QuestionTransformer.name);
  }
  transform(data: PokeApiRes[]): TriviaQuestion {
    this.logger.log('@transform');
    // random the correct Pokemon before sending to frontend
    const answerIdx = Math.floor(Math.random() * data.length);
    const answer = data[answerIdx];
    return {
      pokemonId: answer.id,
      pokemonCry: answer.cries.latest,
      pokemonImg: answer.sprites.front_default,
      pokemonNameList: data.map((pokemon) => {
        return pokemon.name;
      }),
    };
  }
}
