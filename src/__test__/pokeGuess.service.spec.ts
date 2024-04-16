import { TestBed } from '@automock/jest';
import { PokeGuessService } from '../pokeGuess/pokeGuess.service';
import { QuestionTransformer } from '../pokeGuess/transformers/questionTransformer';
import { PokeGuessRepository } from '../pokeGuess/pokeGuess.repository';
import { TriviaQuestion } from '../pokeGuess/entities/TriviaQuestion';
import { Answer } from '../pokeGuess/entities/Answer';
import { PokeApiRes } from '../pokeGuess/entities/PokeApiRes';
import { ValidatedAnswer } from '../pokeGuess/entities/ValidatedAnswer';
import { PokemonTransformer } from '../pokeGuess/transformers/pokemonTransformer';
import { PokemonInfo } from '../pokeGuess/entities/PokemonInfo';

const mockQuestion: TriviaQuestion = {
  pokemonId: 1,
  pokemonCry: 'cry.url',
  pokemonImg: 'img.url',
  pokemonNameList: ['a', 'b', 'c', 'd'],
};

const mockAnswer: Answer = {
  pokemonId: 1,
  answer: 'wrong',
};

const mockApiRes: PokeApiRes = {
  cries: {
    latest: 'cry.url',
  },
  id: 1,
  name: 'correct',
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

const mockPokemonInfo: PokemonInfo = {
  pokemonCry: 'cry_url',
  pokemonId: 1,
  pokemonImg: 'img_url',
  pokemonName: 'name',
  weight: 6.9,
  height: 200,
  type: ['poison'],
};
const expectedValidate: ValidatedAnswer = {
  correct: false,
  image: 'sprites.url',
  pokemonName: 'correct',
};

describe('pokeGuess Service', () => {
  let service: PokeGuessService;

  beforeAll(() => {
    const { unit } = TestBed.create(PokeGuessService)
      .mock(QuestionTransformer)
      .using({
        transform: async () => mockQuestion,
      })
      .mock(PokemonTransformer)
      .using({
        transform: async () => mockPokemonInfo,
      })
      .mock(PokeGuessRepository)
      .using({
        fetchPokemon: async () => mockApiRes,
      })
      .compile();

    service = unit;
  });
  it('getPokemonQuestion', async () => {
    expect(await service.getPokemonQuestion()).toStrictEqual(mockQuestion);
  });
  it('validateAnswer', async () => {
    expect(await service.validateAnswer(mockAnswer)).toStrictEqual(
      expectedValidate,
    );
  });

  it('getRandomPokemonInfo', async () => {
    expect(await service.getRandomPokemonInfo()).toStrictEqual(mockPokemonInfo);
  });
});
