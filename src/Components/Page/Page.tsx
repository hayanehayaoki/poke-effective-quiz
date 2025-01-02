import { FC, memo, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../Constants/AppContext";
import { Answer } from "../Answer/Answer";
import { Problem } from "../Problem/Problem";
import { EndPage } from "./EndPage";
import { StartPage } from "./StartPage";

export const Page: FC = memo(function Page() {
	const { index } = useContext(AppContext);
	const clearTime = useMeasureClearTime();

	if (index === 0) {
		// 開始ページ
		return <StartPage />;
	} else if (index === 11) {
		// 結果ページ
		return <EndPage clearTime={clearTime} />;
	} else {
		return (
			<>
				<Problem />
				<Answer />
			</>
		);
	}
});

/**
 * @returns 計測結果
 */
const useMeasureClearTime = (): string => {
	const { index, explanation } = useContext(AppContext);
	const startTimeRef = useRef<number>(0);
	const [clearTime, setClearTime] = useState<string>("");

	useEffect(() => {
		if (index === 1) {
			// 解答開始
			startTimeRef.current = performance.now();
			setClearTime("");
		} else if (index === 10 && explanation) {
			// 解答終了
			const endTime = performance.now();
			const duration = endTime - startTimeRef.current;

			// 秒に変換
			const second = Math.floor(duration / 1000);

			if (second < 60) {
				setClearTime(`${second}秒`);
			} else {
				const minute = Math.floor(second / 60);
				const restSecond = second % 60;
				setClearTime(`${minute}分${restSecond}秒`);
			}
		}
	}, [explanation, index]);

	return clearTime;
};
