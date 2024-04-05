import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { generateRandomFourId } from './utils/randomPokemonHelper';
import { ConfigService } from '@nestjs/config';
import { QuestionTransformer } from './questionTransformer';
import {
  Answer,
  PokemonAPIResponse,
  PokemonTransformedData,
  ValidateAnswerResponse,
} from './types';
import { AxiosError } from 'axios';

@Injectable()
export class PokeGuessService {
  logger: Logger;
  POKEMON_API: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly questionTransformer: QuestionTransformer,
  ) {
    this.POKEMON_API = this.configService.get('POKEMON_API');
    this.logger = new Logger(PokeGuessService.name);
  }

  async validateAnswer(data: Answer): Promise<ValidateAnswerResponse> {
    try {
      const { pokemonId, answer } = data;
      const { name, sprites } = await this.fetchPokemon(pokemonId);

      return {
        correct: name === answer,
        image: sprites.front_default,
        pokemonName: name,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async getPokemonQuestion(): Promise<PokemonTransformedData> {
    const pokemons = await this.getRandomPokemons();

    const transformedQuestion = this.questionTransformer.transform(pokemons);

    return transformedQuestion;
  }

  private async getRandomPokemons(): Promise<PokemonAPIResponse[]> {
    const result = await Promise.allSettled(
      generateRandomFourId().map(async (id) => this.fetchPokemon(id)),
    );
    // Throw error when there is a rejected value
    const extractedData = result.map((val) => {
      if (val.status !== 'rejected') return val.value;
      throw new InternalServerErrorException((val.reason as AxiosError).stack);
    });
    return extractedData;
  }

  private async fetchPokemon(id: number): Promise<PokemonAPIResponse> {
    const apiResult = await this.httpService.axiosRef.get<PokemonAPIResponse>(
      `${this.POKEMON_API}/${id}`,
    );
    return apiResult.data;
  }
}

// Testing for Error handling
// if (idx === 3) {
//   const res = await this.httpService.axiosRef.get(
//     `${this.POKEMON_API}/1026`,
//   );
//   return res.data;
// }
