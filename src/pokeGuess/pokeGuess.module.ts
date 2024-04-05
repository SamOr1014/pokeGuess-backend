import { Module } from '@nestjs/common';
import { PokeGuessController } from './pokeGuess.controller';
import { PokeGuessService } from './pokeGuess.service';
import { HttpModule } from '@nestjs/axios';
import { QuestionTransformer } from './questionTransformer';

@Module({
  imports: [HttpModule],
  controllers: [PokeGuessController],
  providers: [PokeGuessService, QuestionTransformer],
})
export class PokeGuessModule {}
