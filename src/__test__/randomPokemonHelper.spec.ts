import {
  generateRandomFourId,
  generateRandomId,
} from '../pokeGuess/utils/randomPokemonHelper';

describe('random pokemon helper', () => {
  it('random one Number', () => {
    const mockMathRandom = jest.spyOn(Math, 'random');
    mockMathRandom.mockReturnValueOnce(0.1);
    const id = generateRandomId();
    expect(typeof id).toBe('number');
    expect(id).toStrictEqual(Math.ceil(0.1 * 1025));
  });
  it('random Number array', () => {
    const idArr = generateRandomFourId();
    expect(idArr.length).toStrictEqual(4);
  });

  it('all four random number different', () => {
    const idArr = generateRandomFourId();
    const set = new Set();
    idArr.forEach((id) => {
      expect(set.has(id)).toStrictEqual(false);
      set.add(id);
    });
  });
});
