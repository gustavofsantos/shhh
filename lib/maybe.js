export function maybe(value) {
  if (value !== null && value !== undefined) return Just(value)
  return Nothing(value)
}

export function Just(value) {
  return {
    map: (fn) => maybe(fn(value)),
    value: () => value
  }
}

export function Nothing(value) {
  return {
    map: () => Nothing(value),
    value: () => undefined
  }
}
