import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { generateRandomFourId } from './utils/randomPokemonHelper';
import { QuestionTransformer } from './questionTransformer';

import { PokeGuessRepository } from './pokeGuess.repository';
import { Answer } from './entities/Answer';
import { ValidatedAnswer } from './entities/ValidatedAnswer';
import { TriviaQuestion } from './entities/TriviaQuestion';
import { PokeApiRes } from './entities/PokeApiRes';

@Injectable()
export class PokeGuessService {
  logger: Logger;
  constructor(
    private readonly questionTransformer: QuestionTransformer,
    private readonly pokeGuessRepository: PokeGuessRepository,
  ) {
    this.logger = new Logger(PokeGuessService.name);
  }

  async validateAnswer(data: Answer): Promise<ValidatedAnswer> {
    this.logger.log('@validateAnswer');
    try {
      const { pokemonId, answer } = data;
      const { name, sprites } = await this.pokeGuessRepository.fetchPokemon(
        pokemonId,
      );

      return {
        correct: name === answer,
        image: sprites.front_default,
        pokemonName: name,
      };
    } catch (e) {
      this.logger.log('Catch Error @validateAnswer');
      throw e;
    }
  }

  async createPokemonQuestion(): Promise<TriviaQuestion> {
    this.logger.log('@getPokemonQuestion');
    try {
      const pokemons = await this.getRandomPokemons();
      return this.questionTransformer.transform(pokemons);
    } catch (e) {
      this.logger.log('Catch Error @getPokemonQuestion');
      throw e;
    }
  }

  private async getRandomPokemons(): Promise<PokeApiRes[]> {
    this.logger.log('@getRandomPokemons');
    const result = await Promise.allSettled(
      generateRandomFourId().map(async (id) => {
        return this.pokeGuessRepository.fetchPokemon(id);
      }),
    );
    // Throw error when there is a rejected value
    const pokemonsInfo = result.map((val) => {
      if (val.status === 'rejected') {
        throw new HttpException(
          'Found Rejected PokeAPI fetch',
          HttpStatus.BAD_GATEWAY,
        );
      }
      return val.value;
    });

    return pokemonsInfo;
  }
}

// Testing for Error handling
// if (idx === 3) {
//   const res = await this.httpService.axiosRef.get(
//     `${this.POKEMON_API}/1026`,
//   );
//   return res.data;
// }
