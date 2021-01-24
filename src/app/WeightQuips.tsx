interface QuipCombination {
    totalWeight: number;
    itemWeight: number;
    subjectName: string;
    lostItemName: string;
    action: string;
}

const combinations: QuipCombination[] = [
    {subjectName: "the Titanic",  totalWeight:1.8e+6,  itemWeight: 136.7, lostItemName: "passengers", action: 'lost' },
    {subjectName: "the sun", totalWeight:1.989e+30, itemWeight: 5.972e+24, lostItemName: "earths", action: 'gave birth to'},
    {subjectName: "a 737 plane", totalWeight: 22145.4, itemWeight: 136.7, lostItemName: "passengers jump out", action: 'had'}
]



export function generateQuip(fractionalPercentageLost: number): string {
    const quipNumber = Math.floor(Math.random() * combinations.length);
    const quip = combinations[quipNumber];
    const lostCount = (quip.totalWeight * fractionalPercentageLost / quip.itemWeight);
    return `You lost ${(fractionalPercentageLost * 100).toFixed(2)}%. That's like if ${quip.subjectName} ${quip.action} ${lostCount.toLocaleString()} ${quip.lostItemName}!`;
}