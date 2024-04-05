import { Body, Controller, Get, HttpCode, Logger, Post } from '@nestjs/common';
import { PokeGuessService } from './pokeGuess.service';
import {
  Answer,
  PokemonTransformedData,
  ValidateAnswerResponse,
} from './types';

@Controller('/pokeGuess')
export class PokeGuessController {
  logger: Logger;
  constructor(private readonly pokeGuessService: PokeGuessService) {
    this.logger = new Logger(PokeGuessController.name);
  }

  @Get('/random')
  async getRandomPokemon(): Promise<PokemonTransformedData> {
    try {
      return await this.pokeGuessService.getPokemonQuestion();
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Post('/validate')
  @HttpCode(200)
  async validateChoice(@Body() body: Answer): Promise<ValidateAnswerResponse> {
    try {
      return await this.pokeGuessService.validateAnswer(body);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
