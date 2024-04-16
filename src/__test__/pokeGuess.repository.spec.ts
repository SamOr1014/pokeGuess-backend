import { TestBed } from '@automock/jest';
import { PokeGuessRepository } from '../pokeGuess/pokeGuess.repository';
import { HttpService } from '@nestjs/axios';
import { PokeApiRes } from '../pokeGuess/entities/PokeApiRes';

describe('pokeGuess Service', () => {
  let repo: PokeGuessRepository;
  const mockData: PokeApiRes = {
    cries: {
      latest: 'cry.url',
    },
    id: 1,
    name: 'name',
    sprites: {
      front_default: 'sprites.url',
    },
    types: [
      {
        slot: 1,
        type: {
          name: 'test',
          url: 'type_url',
        },
      },
    ],
    weight: 100,
    height: 110,
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
