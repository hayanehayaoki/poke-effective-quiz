import { FC, memo, useContext, useRef } from "react";
import { AppContext } from "../../Constants/AppContext";
import { useStart } from "./useStart";

/**
 * 結果ページ
 */
export const EndPage: FC = memo(function EndPage() {
	const { correct } = useContext(AppContext);
	const restart = useStart();

	return (
		<>
			<p className="Page__endPage__result">10問中、{correct}問正解！</p>
			<CopyArea correct={correct} />
			<button className="Page__startButton" onClick={restart}>
				もう一度はじめる
			</button>
		</>
	);
});

type CopyAreaProps = {
	correct: number;
};

const CopyArea: FC<CopyAreaProps> = memo(function CopyArea(props: CopyAreaProps) {
	const { correct } = props;
	const inputRef = useRef<HTMLTextAreaElement | null>(null);

	const value: string = `ポケモン耐性クイズ 10問中、${correct}問正解！\nhttps://poke-effective-quiz.vercel.app/`;

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
