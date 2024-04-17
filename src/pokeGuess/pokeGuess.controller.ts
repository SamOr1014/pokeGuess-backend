import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { PokeGuessService } from './pokeGuess.service';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Answer } from './entities/Answer';
import { ValidatedAnswer } from './entities/ValidatedAnswer';
import { TriviaQuestion } from './entities/TriviaQuestion';
import { PokemonInfo } from './entities/PokemonInfo';

@Controller('/pokeGuess')
export class PokeGuessController {
  logger: Logger;
  constructor(private readonly pokeGuessService: PokeGuessService) {
    this.logger = new Logger(PokeGuessController.name);
  }

  @Get('/question')
  @ApiOperation({
    summary: 'Get a question of Pokemon Trivia',
  })
  @ApiResponse({
    status: 200,
    description: 'Success Api',
    type: TriviaQuestion,
  })
  async getPokemonQuestion(): Promise<TriviaQuestion> {
    this.logger.log('@getPokemonQuestion');
    try {
      return await this.pokeGuessService.getPokemonQuestion();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  @Post('/validate')
  @ApiOperation({
    summary: 'Validate the answer.',
  })
  @ApiResponse({
    status: 200,
    description: 'Success Api',
    type: ValidatedAnswer,
  })
  @HttpCode(200)
  async validateChoice(@Body() body: Answer): Promise<ValidatedAnswer> {
    this.logger.log('@validateChoice');
    try {
      // Don't allow missing body info provided
      if (!body.pokemonId || !body.answer)
        throw new HttpException('Body Not Provided', HttpStatus.BAD_REQUEST);

      return await this.pokeGuessService.validateAnswer(body);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  @Get('/learn')
  @ApiOperation({
    summary: 'Random Pokemon generated for user to learn!',
  })
  @ApiResponse({
    status: 200,
    description: 'Success Api',
    type: PokemonInfo,
  })
  @HttpCode(200)
  async getPokemonInfo(): Promise<PokemonInfo> {
    this.logger.log('@getPokemonInfo');
    try {
      return await this.pokeGuessService.getRandomPokemonInfo();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
