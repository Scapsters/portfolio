import { raw_items } from './wheel_info'

const delta_t = 5
const phase = -90

// Circular equations based off of https://www.desmos.com/calculator/cvaldk77ud, created by me
export const circular_rotate = (index: number, scroll: number): number =>
    (mod((delta_t * index - 90 * scroll), ((raw_items.length + 1)) * delta_t)) + phase

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }