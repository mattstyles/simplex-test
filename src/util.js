import { WIDTH, HEIGHT, PIXEL_SIZE } from './constants'

export function to1d( x, y ) {
    return x + ( y * WIDTH )
}
