import { useCallback, useContext } from "react";
import { AppContext } from "../../Constants/AppContext";
import { getQuizType } from "../../Constants/PokeTypeDef";

/**
 * @returns 解答開始処理
 */
export const useStart = (): (() => void) => {
	const { setIndex, setCorrect, setQuizType } = useContext(AppContext);

	const callback = useCallback(() => {
		// 共通処理
		// 問題の生成
		setQuizType(getQuizType());
		// ページの更新
		setIndex(1);
		// 正解数のリセット
		setCorrect(0);

		performance.mark("quizStart");
	}, [setCorrect, setIndex, setQuizType]);

	return callback;
};
