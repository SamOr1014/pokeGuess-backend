import { TestBed } from '@automock/jest';
import { PokemonAPIResponse } from '../pokeGuess/types';
import { QuestionTransformer } from '../pokeGuess/questionTransformer';

const mockApiRes: PokemonAPIResponse[] = [
  {
    id: 1,
    name: 'asd',
    sprites: { front_default: 'url' },
    cries: {
      latest: 'cry',
    },
  },
  {
    id: 2,
    name: 'ghbd',
    sprites: { front_default: 'url' },
    cries: {
      latest: 'cry',
    },
  },
  {
    id: 3,
    name: 'bnmn',
    sprites: { front_default: 'url' },
    cries: {
      latest: 'cry',
    },
  },
  {
    id: 4,
    name: 'tre',
    sprites: { front_default: 'url' },
    cries: {
      latest: 'cry',
    },
  },
];

const responsePokemonList = ['asd', 'ghbd', 'bnmn', 'tre'];

describe('Transformer', () => {
  let transformer: QuestionTransformer;
  beforeAll(() => {
    const { unit } = TestBed.create(QuestionTransformer).compile();
    transformer = unit;
  });
  it('transform api to res', () => {
    const { pokemonId, pokemonImg, pokemonNameList, pokemonCry } =
      transformer.transform(mockApiRes);

    expect(pokemonId).toBeDefined();
    expect(typeof pokemonId).toBe('number');
    expect(pokemonCry).toStrictEqual('cry');
    expect(pokemonImg).toStrictEqual('url');
    expect(pokemonNameList).toStrictEqual(responsePokemonList);
  });
});
