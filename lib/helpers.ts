export function shuffle<T>(array: Array<T>): Array<T> {
  return array.sort(() => 0.5 - Math.random());
}
