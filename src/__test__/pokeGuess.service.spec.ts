import { TestBed } from '@automock/jest';
import { PokeGuessService } from '../pokeGuess/pokeGuess.service';
import { QuestionTransformer } from '../pokeGuess/questionTransformer';
import { PokeGuessRepository } from '../pokeGuess/pokeGuess.repository';
import { TriviaQuestion } from '../pokeGuess/entities/TriviaQuestion';

describe('pokeGuess Service', () => {
  let service: PokeGuessService;

  const mockServiceRes: TriviaQuestion = {
    pokemonId: 1,
    pokemonCry: 'cry url',
    pokemonName: 'name',
    pokemonImg: 'url',
    pokemonNameList: ['a', 'b', 'c', 'd'],
  };

  beforeAll(() => {
    const { unit } = TestBed.create(PokeGuessService)
      .mock(QuestionTransformer)
      .using({
        transform: async () => mockServiceRes,
      })
      .mock(PokeGuessRepository)
      .using({
        fetchPokemon: async () => [],
      })
      .compile();

    service = unit;
  });
  it('service return', async () => {
    expect(await service.getPokemonQuestion()).toStrictEqual(mockServiceRes);
  });
});
