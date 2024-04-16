import { TestBed } from '@automock/jest';
import { QuestionTransformer } from '../pokeGuess/transformers/questionTransformer';
import { PokeApiRes } from '../pokeGuess/entities/PokeApiRes';

const mockApiRes: PokeApiRes[] = [
  {
    id: 1,
    name: 'asd',
    sprites: { front_default: 'url' },
    cries: {
      latest: 'cry',
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
    height: 100,
  },
  {
    id: 2,
    name: 'ghbd',
    sprites: { front_default: 'url' },
    cries: {
      latest: 'cry',
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
    weight: 70,
    height: 70,
  },
  {
    id: 3,
    name: 'bnmn',
    sprites: { front_default: 'url' },
    cries: {
      latest: 'cry',
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
    weight: 80,
    height: 80,
  },
  {
    id: 4,
    name: 'tre',
    sprites: { front_default: 'url' },
    cries: {
      latest: 'cry',
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
    weight: 50,
    height: 50,
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
