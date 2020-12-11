// This file contains native common utilities instead of importing larger counterparts from
// libraries such as lodash

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isNil = (value: any): value is null | undefined => value == null;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isEmpty = (obj: any): boolean =>
  [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;

export const keys = (object: Record<string, any>): string[] => Object.keys(object);

export const uniq = (arr: any[]): any[] => [...Array.from(new Set(arr))];

export const pickBy = (object: Record<string, any>): Record<string, any> => {
  const obj: Record<string, any> = {};
  for (const key in object) {
    if (object[key]) {
      obj[key] = object[key];
    }
  }
  return obj;
};
