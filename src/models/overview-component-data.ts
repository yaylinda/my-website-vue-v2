export class MarkerData {
    public markerId!: string;
    public position!: string;
    public cardData!: CardData;

    constructor(markerId: string, position: string, cardData: CardData) {
        this.markerId = markerId;
        this.position = position;
        this.cardData = cardData;
    }
}

export class CardData {
    public title!: string;
    public subtitle!: string;
    public content!: string;

    constructor(title: string, subtitle: string, content: string) {
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
    }
}
