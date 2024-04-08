import { TestBed } from '@automock/jest';
import { PokeGuessService } from '../pokeGuess/pokeGuess.service';
import { QuestionTransformer } from '../pokeGuess/questionTransformer';
import { PokeGuessRepository } from '../pokeGuess/pokeGuess.repository';
import { TriviaQuestion } from '../pokeGuess/entities/TriviaQuestion';
import { Answer } from '../pokeGuess/entities/Answer';
import { PokeApiRes } from '../pokeGuess/entities/PokeApiRes';
import { ValidatedAnswer } from '../pokeGuess/entities/ValidatedAnswer';

const mockQuestion: TriviaQuestion = {
  pokemonId: 1,
  pokemonCry: 'cry url',
  pokemonName: 'name',
  pokemonImg: 'url',
  pokemonNameList: ['a', 'b', 'c', 'd'],
};

const mockAnswer: Answer = {
  pokemonId: 1,
  answer: 'wrong',
};

const mockApiRes: PokeApiRes = {
  cries: {
    latest: 'cryurl',
  },
  id: 1,
  name: 'correct',
  sprites: {
    front_default: 'sprites url',
  },
};

const expectedValidate: ValidatedAnswer = {
  correct: false,
  image: 'sprites url',
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
  it('getPokemonQuestion', async () => {
    expect(await service.validateAnswer(mockAnswer)).toStrictEqual(
      expectedValidate,
    );
  });
});
