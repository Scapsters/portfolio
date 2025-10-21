import { getPortfolioItemCount } from './wheel_info';

const { totalRenderedItems, categoryCount } = getPortfolioItemCount();

export const delta_t = 6
const phase = -90
const prephase = 70 // This affects the position of the wheel when loading

function theta(index: number, scroll: number): number {
    return mod((delta_t * index) - (90 * scroll) + prephase, delta_t * (totalRenderedItems + categoryCount * 2))
}

// Circular equations based off of https://www.desmos.com/calculator/cvaldk77ud, created by me
export const circular_rotate = (index: number, scroll: number) => theta(index, scroll) + phase
export const isVisible = (index: number, scroll: number) => theta(index, scroll) < 180

export function mod(n: number, m: number) {
    return ((n % m) + m) % m
}

export function roundTo(value: number, n: number): number {
    const factor = Math.pow(10, n);
    return Math.round(value * factor) / factor;
}
