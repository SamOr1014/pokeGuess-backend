import { Module } from '@nestjs/common';
import { PokeGuessController } from './pokeGuess.controller';
import { PokeGuessService } from './pokeGuess.service';
import { HttpModule } from '@nestjs/axios';
import { QuestionTransformer } from './transformers/questionTransformer';
import { PokeGuessRepository } from './pokeGuess.repository';
import { PokemonTransformer } from './transformers/pokemonTransformer';

@Module({
  imports: [HttpModule],
  controllers: [PokeGuessController],
  providers: [
    PokeGuessService,
    PokeGuessRepository,
    QuestionTransformer,
    PokemonTransformer,
  ],
})
export class PokeGuessModule {}
