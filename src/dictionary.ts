export type Dictionary<T extends string | symbol | number, U> = {
  [key in T]: U
}
