export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatDate(ts) {
    return new Date(ts).toLocaleString();
}
