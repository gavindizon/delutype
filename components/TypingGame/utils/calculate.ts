export const getStandardDeviation = (array: number[]) => {
    if (array[0] === 0) array.shift();

    const n = array.length;
    const mean = array.reduce((a, b) => a + b) / n;
    return Math.sqrt(array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
};

export const getMean = (array: number[]) => {
    if (array[0] === 0) array.shift();

    return array.reduce((a, b) => a + b) / array.length;
};
