export function getKeys<T>(data: T): (keyof T)[] {
  //@ts-ignore
  return Object.keys(data);
}
