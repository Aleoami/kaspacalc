export function getKeys<T>(data: T): (keyof T)[] {
  //@ts-ignore
  return Object.keys(data);
}

export function numberWithSpaces(x: string | number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
