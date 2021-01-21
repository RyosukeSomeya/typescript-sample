interface Scoreble {
    readonly totalScore: number;
    render(): void;
}

interface Foodable {
    element: HTMLDivElement;
    clickEventHandler: void;
}

interface Foodsable {
    elements: NodeListOf<HTMLDivElement>;
    readonly activeElements: HTMLDivElement[];
    readonly activeElementsScore: number[];
}
