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

// 食べ物のスコアを合計するクラス
class Score implements Scoreble {
    private static instance: Score;
    get totalScore() {
        const foods = Foods.getInstance();
        return foods.activeElementsScore.reduce((total, score) => total + score);
    }
    render() {
        document.querySelector('.score__number')!.textContent = String(this.totalScore);
    }
    private constructor () {}
    static getInstance() {
        if (!Score.instance) {
            Score.instance = new Score();
        }
        return Score.instance;
    }
}

// 食べ物のカードクラス
class Food {
    constructor(public element: HTMLDivElement) {
        element.addEventListener('click', this.clickEventHandler.bind(this));
        // addEventListner内のcallback関数内のthisはクリックされた要素となるので、thisを明示的にbindする必要がある。
    }

    clickEventHandler() {
        this.element.classList.toggle('food--active');
        // bindがないとthisはクリックされた要素を指す。
        const score = Score.getInstance();
        score.render();
    }
}

// 食べ物のカード一覧を管理するクラス
// 一覧を保持する。食べ物自体（Foodクラス）の操作は行わない。
class Foods {
    private static instance: Foods;
    // foodクラスのdiv要素をすべて取得
    elements = document.querySelectorAll<HTMLDivElement>('.food');
    // 選択された要素を格納する配列
    private _activeElements: HTMLDivElement[] = [];
    private _activeElementsScore: number[] = [];

    constructor() {
        // 取得した各要素からFoodクラスインスタンスを作成
        this.elements.forEach(element => {
            new Food(element);
        });
    }

    get activeElements() {
        this._activeElements = []; // 初期化
        this.elements.forEach(element => {
            if (element.classList.contains('food--active')) {
                this._activeElements.push(element);
            }
        });
        return this._activeElements;
    }
    get activeElementsScore() {
        this._activeElementsScore = [];
        this.activeElements.forEach(element => {
            // activeがついているdivから、更にfood__scoreクラスがついている要素を取得
            const foodScore = element.querySelector('.food__score');
            if (foodScore) { // nullチェック
                this._activeElementsScore.push(Number(foodScore.textContent)); // Numberで数値にキャスト
            }
        })
        return this._activeElementsScore;
    }

    static getInstance() {
        if (!Foods.instance) {
            Foods.instance = new Foods();
        }
        return Foods.instance;
    }
}

const foods = Foods.getInstance();
