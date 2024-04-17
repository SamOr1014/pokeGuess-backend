import { TestBed } from '@automock/jest';

import { PokeGuessController } from '../pokeGuess/pokeGuess.controller';
import { PokeGuessService } from '../pokeGuess/pokeGuess.service';
import type { TriviaQuestion } from '../pokeGuess/entities/TriviaQuestion';
import { Answer } from '../pokeGuess/entities/Answer';
import { ValidatedAnswer } from '../pokeGuess/entities/ValidatedAnswer';
import { PokemonInfo } from '../pokeGuess/entities/PokemonInfo';
import { HttpException, HttpStatus } from '@nestjs/common';

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

const mockInfo: PokemonInfo = {
  pokemonId: 23,
  pokemonName: 'ekans',
  pokemonCry: 'cry url',
  pokemonImg: 'img url',
  weight: 6.9,
  height: 200,
  type: ['poison'],
};
describe('pokeGuess Controller', () => {
  let controller: PokeGuessController;
  beforeAll(() => {
    const { unit } = TestBed.create(PokeGuessController)
      .mock(PokeGuessService)
      .using({
        getPokemonQuestion: async () => mockServiceRes,
        validateAnswer: async () => mockValidate,
        getRandomPokemonInfo: async () => mockInfo,
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

  it('getRandomPokemonInfo', async () => {
    expect(await controller.getPokemonInfo()).toStrictEqual(mockInfo);
  });
});

describe('error', () => {
  let controller: PokeGuessController;
  beforeAll(() => {
    const { unit } = TestBed.create(PokeGuessController)
      .mock(PokeGuessService)
      .using({
        getPokemonQuestion: async () => {
          throw new Error();
        },
        validateAnswer: async () => {
          throw new Error();
        },
        getRandomPokemonInfo: async () => {
          throw new Error();
        },
      })
      .compile();

    controller = unit;
  });
  it('getPokemonInfo', async () => {
    try {
      await controller.getPokemonInfo();
    } catch (e) {
      expect(e).toStrictEqual(new Error());
    }
  });
  it('getPokemonQuestion', async () => {
    try {
      await controller.getPokemonQuestion();
    } catch (e) {
      expect(e).toStrictEqual(new Error());
    }
  });
  it('validateChoice', async () => {
    try {
      await controller.validateChoice(mockBody);
    } catch (e) {
      expect(e).toStrictEqual(new Error());
    }
  });
  it('validateChoice - no Body', async () => {
    try {
      await controller.validateChoice({} as Answer);
    } catch (e) {
      expect(e).toStrictEqual(
        new HttpException('Body Not Provided', HttpStatus.BAD_REQUEST),
      );
    }
  });
});
