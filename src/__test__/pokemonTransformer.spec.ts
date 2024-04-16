import { TestBed } from '@automock/jest';
import { PokeApiRes } from '../pokeGuess/entities/PokeApiRes';
import { PokemonTransformer } from '../pokeGuess/transformers/pokemonTransformer';

const mockApiRes: PokeApiRes = {
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
  height: 110,
};
describe('Transformer', () => {
  let transformer: PokemonTransformer;
  beforeAll(() => {
    const { unit } = TestBed.create(PokemonTransformer).compile();
    transformer = unit;
  });
  it('transform api to res', () => {
    const { pokemonId, pokemonImg, pokemonCry, weight, height, type } =
      transformer.transform(mockApiRes);

    expect(pokemonId).toBeDefined();
    expect(typeof pokemonId).toBe('number');
    expect(pokemonCry).toStrictEqual('cry');
    expect(pokemonImg).toStrictEqual('url');
    expect(weight).toStrictEqual(10);
    expect(height).toStrictEqual(1100);
    expect(type).toStrictEqual(['test']);
  });
});
