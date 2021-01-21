import { Foodable } from "./interfaces.js";
import { Score } from "./score.js";

// 食べ物のカードクラス
export class Food　implements Foodable {
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
