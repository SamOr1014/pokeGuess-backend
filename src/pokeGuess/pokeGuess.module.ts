import { Module } from '@nestjs/common';
import { PokeGuessController } from './pokeGuess.controller';
import { PokeGuessService } from './pokeGuess.service';
import { HttpModule } from '@nestjs/axios';
import { QuestionTransformer } from './questionTransformer';
import { PokeGuessRepository } from './pokeGuess.repository';

@Module({
  imports: [HttpModule],
  controllers: [PokeGuessController],
  providers: [PokeGuessService, QuestionTransformer, PokeGuessRepository],
})
export class PokeGuessModule {}
