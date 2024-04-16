import { TestBed } from '@automock/jest';

import { PokeGuessController } from '../pokeGuess/pokeGuess.controller';
import { PokeGuessService } from '../pokeGuess/pokeGuess.service';
import type { TriviaQuestion } from '../pokeGuess/entities/TriviaQuestion';
import { Answer } from '../pokeGuess/entities/Answer';
import { ValidatedAnswer } from '../pokeGuess/entities/ValidatedAnswer';
import { PokemonInfo } from '../pokeGuess/entities/PokemonInfo';

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

  const mockInfo: PokemonInfo = {
    pokemonId: 23,
    pokemonName: 'ekans',
    pokemonCry:
      'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/23.ogg',
    pokemonImg:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png',
    weight: 6.9,
    height: 200,
    type: ['poison'],
  };

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
