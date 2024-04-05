import {
  generateRandomFourId,
  generateRandomId,
} from '../pokeGuess/utils/randomPokemonHelper';

describe('random pokemon helper', () => {
  it('random Number', () => {
    const id = generateRandomId();
    expect(typeof id).toBe('number');
    expect(id).toBeLessThan(1026);
    expect(id).toBeGreaterThan(0);
  });
  it('random Number array', () => {
    const idArr = generateRandomFourId();
    expect(idArr.length).toStrictEqual(4);
    idArr.forEach((id) => {
      expect(typeof id).toBe('number');
    });
  });
});
