import { raw_items } from './wheel_info'

const delta_t = 5
const phase = -90
const prephase = 90 // This affects the position of the wheel when loading

// Circular equations based off of https://www.desmos.com/calculator/cvaldk77ud, created by me
export const circular_rotate = (index: number, scroll: number): number =>
    (mod((delta_t * index - 90 * scroll) + prephase, ((raw_items.length + 1)) * delta_t)) + phase

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }