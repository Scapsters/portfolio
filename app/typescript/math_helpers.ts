const delta_t = 5
const phase = -90;

// Circular equations based off of https://www.desmos.com/calculator/cvaldk77ud, created by me
export const circular_rotate = (index: number, scroll: number): number => delta_t * index - 90 * scroll + phase
