import { TestBed } from '@automock/jest';
import { PokemonTransformedData } from '../pokeGuess/types';
import { PokeGuessController } from '../pokeGuess/pokeGuess.controller';
import { PokeGuessService } from '../pokeGuess/pokeGuess.service';

describe('pokeGuess Controller', () => {
  let controller: PokeGuessController;
  const mockServiceRes: PokemonTransformedData = {
    pokemonId: 1,
    pokemonImg: 'url',
    pokemonNameList: ['a', 'b', 'c', 'd'],
  };
  beforeAll(() => {
    const { unit } = TestBed.create(PokeGuessController)
      .mock(PokeGuessService)
      .using({
        getPokemonQuestion: async () => mockServiceRes,
      })
      .compile();

    controller = unit;
  });
  it('Controller return', async () => {
    expect(await controller.getRandomPokemon()).toStrictEqual(mockServiceRes);
  });
});
