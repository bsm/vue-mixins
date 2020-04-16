/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function cloneDeep(obj: any, target?: any): any {
  if (obj == null) {
    return target;
  } else if (Array.isArray(obj)) {
    return obj.map((v) => cloneDeep(v));
  } else if (obj === Object(obj)) {
    const clone = target || Object.create(Object.getPrototypeOf(obj));
    Object.keys(obj).forEach((key) => (clone[key] = cloneDeep(obj[key], clone[key])));
    return clone;
  }
  return obj;
}
