import { Food } from "./food";
// 食べ物のカード一覧を管理するクラス
// 一覧を保持する。食べ物自体（Foodクラス）の操作は行わない。
export class Foods {
    constructor() {
        // foodクラスのdiv要素をすべて取得
        this.elements = document.querySelectorAll('.food');
        // 選択された要素を格納する配列
        this._activeElements = [];
        this._activeElementsScore = [];
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
        });
        return this._activeElementsScore;
    }
    static getInstance() {
        if (!Foods.instance) {
            Foods.instance = new Foods();
        }
        return Foods.instance;
    }
}
