const getWord = (text: string, index: number) => {
    // first word
    if (index === 0 || index <= text.split(" ")[0].length) return text.split(" ")[0];

    // next to type is space
    if (text[index + 1] === " ") return " ";

    // at index of a space
    if (index !== 0 && text[index] === " ") return text.slice(index + 1).split(" ")[0];

    // middle of word
    let pivotIndex = index;
    while (text[pivotIndex--] !== " ");
    pivotIndex += 2;

    return text.slice(pivotIndex).split(" ")[0];
};

export default getWord;
