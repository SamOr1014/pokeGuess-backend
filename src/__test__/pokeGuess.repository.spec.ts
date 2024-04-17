import { TestBed } from '@automock/jest';
import { PokeGuessRepository } from '../pokeGuess/pokeGuess.repository';
import { HttpService } from '@nestjs/axios';
import { PokeApiRes } from '../pokeGuess/entities/PokeApiRes';
import { HttpException, HttpStatus } from '@nestjs/common';

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

  it('service return', async () => {
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
    expect(await repo.fetchPokemon(1)).toStrictEqual(mockData);
  });
  it('service return', async () => {
    const { unit } = TestBed.create(PokeGuessRepository)
      .mock(HttpService)
      .using({
        axiosRef: {
          get: async () => {
            throw new Error();
          },
        },
      })
      .compile();

    repo = unit;
    try {
      await repo.fetchPokemon(1);
    } catch (e) {
      expect(e).toStrictEqual(
        new HttpException('PokeAPI Fetch Failed', HttpStatus.BAD_GATEWAY),
      );
    }
  });
});
