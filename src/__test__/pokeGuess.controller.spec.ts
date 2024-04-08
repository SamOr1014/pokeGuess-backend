import { TestBed } from '@automock/jest';

import { PokeGuessController } from '../pokeGuess/pokeGuess.controller';
import { PokeGuessService } from '../pokeGuess/pokeGuess.service';
import type { TriviaQuestion } from '../pokeGuess/entities/TriviaQuestion';

describe('pokeGuess Controller', () => {
  let controller: PokeGuessController;
  const mockServiceRes: TriviaQuestion = {
    pokemonId: 1,
    pokemonCry: 'cry url',
    pokemonImg: 'url',
    pokemonNameList: ['a', 'b', 'c', 'd'],
  };
  beforeAll(() => {
    const { unit } = TestBed.create(PokeGuessController)
      .mock(PokeGuessService)
      .using({
        createPokemonQuestion: async () => mockServiceRes,
      })
      .compile();

    controller = unit;
  });
  it('Controller return', async () => {
    expect(await controller.getPokemonQuestion()).toStrictEqual(mockServiceRes);
  });
});
