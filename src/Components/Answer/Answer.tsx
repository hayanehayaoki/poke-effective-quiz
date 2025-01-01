import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../Constants/AppContext";
import { getQuizType } from "../../Constants/PokeTypeDef";
import "../../Styles/Answer.scss";
import { Explanation } from "./Explanation";
import { TypeSelect } from "./TypeSelect";

export const Answer: FC = memo(function Answer() {
	const { explanation } = useContext(AppContext);

	const answer = useAnswer();
	const next = useNext();

	const width = useMonitorResize();

	return (
		<div className="Answer">
			<TypeSelect width={width} />
			{explanation ? (
				<>
					<button className="Answer__bottomButton" onClick={next}>
						次の問題
					</button>
					<Explanation />
				</>
			) : (
				<button className="Answer__bottomButton" onClick={answer}>
					解答
				</button>
			)}
		</div>
	);
});

const useAnswer = (): (() => void) => {
	const { quizType, type1, type2, correct, setCorrect, setExplanation } = useContext(AppContext);

	const callback = useCallback(() => {
		if (quizType === null) {
			return;
		}

		const isCorrect = quizType.includes(type1) && quizType.includes(type2);

		if (isCorrect) {
			// 正解
			setCorrect(correct + 1);
		}

		// 解説を表示する
		setExplanation(true);
	}, [correct, quizType, setCorrect, setExplanation, type1, type2]);

	return callback;
};

/**
 * @returns 次の問題に行く処理
 */
const useNext = (): (() => void) => {
	const { setQuizType, setType1, setType2, index, setIndex, setExplanation } =
		useContext(AppContext);

	const callback = useCallback(() => {
		// 初期化
		setQuizType(getQuizType());
		setIndex(index + 1);
		setType1(0);
		setType2(0);
		setExplanation(false);
	}, [index, setExplanation, setIndex, setQuizType, setType1, setType2]);

	return callback;
};

/**
 * 画面幅を監視する
 * @returns 画面幅
 */
const useMonitorResize = (): number => {
	const [width, setWidth] = useState<number>(window.innerWidth);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setWidth(window.innerWidth);
		});

		return window.removeEventListener("resize", () => {
			setWidth(window.innerWidth);
		});
	}, []);

	return width;
};
