interface IFruit {
    size: number;
    color: string;
    nextFruit?: keyof FruitsList;
}

export interface FruitsList {
    apple: IFruit;
    banana: IFruit;
    grapefruit: IFruit;
    kiwi: IFruit;
    lemon: IFruit;
    lychee: IFruit;
    mandarin: IFruit;
    mango: IFruit;
    orange: IFruit;
    peach: IFruit;
    pear: IFruit;
    pineapple: IFruit;
}