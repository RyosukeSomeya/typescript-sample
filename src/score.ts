import { Scoreble } from "./interfaces.js";
import { Foods } from "./foods.js";

// 食べ物のスコアを合計するクラス
export class Score implements Scoreble {
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
