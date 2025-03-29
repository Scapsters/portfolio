import { raw_items } from './wheel_info'

export const delta_t = 6
const phase = -90
const prephase = 70 // This affects the position of the wheel when loading

// Circular equations based off of https://www.desmos.com/calculator/cvaldk77ud, created by me
export const circular_rotate = (index: number, scroll: number): number =>
    mod(delta_t * index - 90 * scroll + prephase, (raw_items.length + 1) * delta_t) + phase

function mod(n: number, m: number) {
    return ((n % m) + m) % m
}

export function roundTo(value: number, n: number): number {
    const factor = Math.pow(10, n);
    return Math.round(value * factor) / factor;
}
