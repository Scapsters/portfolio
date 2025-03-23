const delta_t = 6

export function degree_to_radian(degree: number): number {
    return (degree * Math.PI) / 180
}

/**
 * Restricts value to [min, max]
 */
export function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value))
}

/**
 * Maps value from [low1, high1] to [low2, high2]
 */
export function map_range(value: number, low1: number, high1: number, low2: number, high2: number): number {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1)
}

// Circular equations based off of https://www.desmos.com/calculator/cvaldk77ud, created by me
export const circular_rotate = (index: number, scroll: number): number => delta_t * index - 90 * scroll