interface QuipCombination {
    totalWeight: number;
    itemWeight: number;
    subjectName: string;
    lostItemName: string;
}

const combinations: QuipCombination[] = [
    {subjectName: "the Titanic",  totalWeight:1.8e+6,  itemWeight: 136.7, lostItemName: "passengers" }
]



export function generateQuip(percentageLost: number): string {
    const quipNumber = Math.floor(Math.random() * combinations.length);
    const quip = combinations[quipNumber];
    const lostCount = (quip.totalWeight * percentageLost / quip.itemWeight);
    return `You lost ${percentageLost}%. That's like if ${quip.subjectName} lost ${lostCount.toFixed(1)} ${quip.lostItemName}!`;
}