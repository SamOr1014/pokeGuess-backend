import { TestBed } from '@automock/jest';
import { PokeGuessRepository } from '../pokeGuess/pokeGuess.repository';
import { HttpService } from '@nestjs/axios';

describe('pokeGuess Service', () => {
  let repo: PokeGuessRepository;
  const mockData = {
    cries: {
      latest: 'cryurl',
    },
    id: 1,
    name: 'name',
    sprites: {
      front_default: 'sprites url',
    },
  };

  beforeAll(() => {
    const { unit } = TestBed.create(PokeGuessRepository)
      .mock(HttpService)
      .using({
        axiosRef: {
          get: async () => ({
            data: mockData,
          }),
        },
      })
      .compile();

    repo = unit;
  });
  it('service return', async () => {
    expect(await repo.fetchPokemon(1)).toStrictEqual(mockData);
  });
});