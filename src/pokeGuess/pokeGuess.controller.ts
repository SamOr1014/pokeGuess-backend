import { Body, Controller, Get, HttpCode, Logger, Post } from '@nestjs/common';
import { PokeGuessService } from './pokeGuess.service';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Answer } from './entities/Answer';
import { ValidatedAnswer } from './entities/ValidatedAnswer';
import { TriviaQuestion } from './entities/TriviaQuestion';

@Controller('/pokeGuess')
export class PokeGuessController {
  logger: Logger;
  constructor(private readonly pokeGuessService: PokeGuessService) {
    this.logger = new Logger(PokeGuessController.name);
  }

  @Get('/random')
  @ApiOperation({
    summary: 'Get a question of Pokemon Trivia',
  })
  @ApiResponse({
    status: 200,
    description: 'Success Api',
    type: TriviaQuestion,
  })
  async getRandomPokemon(): Promise<TriviaQuestion> {
    try {
      return await this.pokeGuessService.getPokemonQuestion();
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Post('/validate')
  @ApiOperation({
    summary:
      "Validate the answer. Receiving the correct Pokemon ID and the answered Pokemon's Name.",
  })
  @ApiResponse({
    status: 200,
    description: 'Success Api',
    type: ValidatedAnswer,
  })
  @HttpCode(200)
  async validateChoice(@Body() body: Answer): Promise<ValidatedAnswer> {
    try {
      return await this.pokeGuessService.validateAnswer(body);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
