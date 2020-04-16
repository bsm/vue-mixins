import { cloneDeep } from './util';

describe('cloneDeep', () => {
  const original = {
    name: 'Test',
    weight: { unit: 'g', value: 10 },
    ary: [1, { b: 2 }, 'c'],
  };

  it('should clone nested objects', () => {
    const klon = cloneDeep(original);
    expect(klon).toEqual(original);

    klon.name = 'Simcoe';
    klon.weight.value = 20;
    expect(original.name).toEqual('Test');
    expect(original.weight.value).toEqual(10);
  });

  it('should clone arrays', () => {
    const klon = cloneDeep(original);
    expect(klon).toEqual(original);

    klon.ary[1].b = 4;
    expect(original.ary).toEqual([1, { b: 2 }, 'c']);
  });

  it('should support nested targets', () => {
    const klon = cloneDeep(original, {
      weight: { unit: 'kg' },
      extra: 'val',
      ary: [4],
    });
    expect(klon).toEqual({
      name: 'Test',
      weight: { unit: 'g', value: 10 },
      ary: [1, { b: 2 }, 'c'],
      extra: 'val',
    });
    expect(original).not.toHaveProperty('extra');
  });

  it('should handle nulls', () => {
    expect(cloneDeep(undefined)).toBeUndefined();
    expect(cloneDeep(undefined, {})).toEqual({});
  });
});
