import { TestBed } from '@automock/jest';

import { PokeGuessController } from '../pokeGuess/pokeGuess.controller';
import { PokeGuessService } from '../pokeGuess/pokeGuess.service';
import type { TriviaQuestion } from '../pokeGuess/entities/TriviaQuestion';
import { Answer } from '../pokeGuess/entities/Answer';
import { ValidatedAnswer } from '../pokeGuess/entities/ValidatedAnswer';

describe('pokeGuess Controller', () => {
  let controller: PokeGuessController;
  const mockServiceRes: TriviaQuestion = {
    pokemonId: 1,
    pokemonCry: 'cry url',
    pokemonImg: 'url',
    pokemonNameList: ['a', 'b', 'c', 'd'],
  };
  const mockBody: Answer = {
    pokemonId: 1,
    answer: 'bulbasaur',
  };

  const mockValidate: ValidatedAnswer = {
    correct: true,
    image: 'bulbasaur.img',
    pokemonName: 'bulbasaur',
  };
  beforeAll(() => {
    const { unit } = TestBed.create(PokeGuessController)
      .mock(PokeGuessService)
      .using({
        createPokemonQuestion: async () => mockServiceRes,
        validateAnswer: async () => mockValidate,
      })
      .compile();

    controller = unit;
  });
  it('getPokemonQuestion', async () => {
    expect(await controller.getPokemonQuestion()).toStrictEqual(mockServiceRes);
  });

  it('validateChoice', async () => {
    expect(await controller.validateChoice(mockBody)).toStrictEqual(
      mockValidate,
    );
  });
});
