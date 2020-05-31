/**
 * Created by admin on 2017/8/23.
 */
export function randomRange(under, over) {
    return Math.ceil(Math.random() * (over - under) + under);
}