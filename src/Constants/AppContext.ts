import { createContext } from "react";

export type AppContextProps = {
	/** 出題するタイプ */
	quizType: [number, number] | null;
	/** 出題するタイプ変更 */
	setQuizType: (quizType: [number, number]) => void;

	/** 問題番号 */
	index: number;
	/** 問題番号変更 */
	setIndex: (index: number) => void;

	/** 正解数 */
	correct: number;
	/** 正解数変更 */
	setCorrect: (correct: number) => void;

	/** 選択中のタイプ1 */
	type1: number;
	setType1: (type: number) => void;
	/** 選択中のタイプ2 */
	type2: number;
	setType2: (type: number) => void;

	/** 解説 */
	explanation: boolean;
	/** 解説変更 */
	setExplanation: (explanation: boolean) => void;
};

export const AppContext = createContext({} as AppContextProps);
