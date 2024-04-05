import { TestBed } from '@automock/jest';
import { PokemonTransformedData } from '../pokeGuess/types';
import { PokeGuessService } from '../pokeGuess/pokeGuess.service';
import { QuestionTransformer } from '../pokeGuess/questionTransformer';
import { HttpService } from '@nestjs/axios';
describe('pokeGuess Service', () => {
  let service: PokeGuessService;
  const mockServiceRes: PokemonTransformedData = {
    pokemonId: 1,
    pokemonImg: 'url',
    pokemonNameList: ['a', 'b', 'c', 'd'],
  };
  beforeAll(() => {
    const { unit } = TestBed.create(PokeGuessService)
      .mock(QuestionTransformer)
      .using({
        transform: async () => mockServiceRes,
      })
      .mock(HttpService)
      .using({
        axiosRef: {
          get: async () => [],
        },
      })
      .compile();

    service = unit;
  });
  it('Controller return', async () => {
    expect(await service.getPokemonQuestion()).toStrictEqual(mockServiceRes);
  });
});
