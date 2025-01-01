import { FC, memo, useContext, useLayoutEffect, useRef, useState } from "react";
import { AppContext } from "../../Constants/AppContext";
import { useStart } from "./useStart";

/**
 * 結果ページ
 */
export const EndPage: FC = memo(function EndPage() {
	const { correct } = useContext(AppContext);
	const time = useClearTime();
	const restart = useStart();

	if (time.length === 0) {
		return null;
	}

	return (
		<>
			<p className="Page__endPage__result">
				10問中、{correct}問正解！（クリアタイム：{time}）
			</p>
			<CopyArea correct={correct} time={time} />
			<button className="Page__startButton" onClick={restart}>
				もう一度はじめる
			</button>
		</>
	);
});

type CopyAreaProps = {
	correct: number;
	time: string;
};

const CopyArea: FC<CopyAreaProps> = memo(function CopyArea(props: CopyAreaProps) {
	const { correct, time } = props;
	const inputRef = useRef<HTMLTextAreaElement | null>(null);

	const value: string = `ポケモン耐性クイズ ${time}で10問中、${correct}問正解！`;

	return (
		<div className="Page__endPage__copyArea">
			<textarea ref={inputRef} defaultValue={value} readOnly />
			<button
				onClick={() => {
					if (inputRef.current) {
						navigator.clipboard.writeText(inputRef.current.value);
					}
				}}
			>
				クリップボードにコピー
			</button>
		</div>
	);
});

const useClearTime = (): string => {
	const [time, setTime] = useState<string>("");

	useLayoutEffect(() => {
		performance.mark("quizEnd");

		performance.measure("clearTime", "quizStart", "quizEnd");

		const clearTime = performance.getEntriesByName("clearTime");
		const { duration } = clearTime[0];

		console.log(duration);
		// 秒に変換
		const sec = Math.floor(duration / 1000);

		if (sec < 60) {
			setTime(`${sec}秒`);
		} else {
			const min = Math.floor(sec / 60);
			const rest = sec % 60;
			setTime(`${min}分${rest}秒`);
		}

		return () => {
			setTime("");
		};
	}, []);

	return time;
};
