import { FC, memo, useContext, useRef } from "react";
import { AppContext } from "../../Constants/AppContext";
import { useStart } from "./useStart";

type EndPageProps = {
	clearTime: string;
};

/**
 * 結果ページ
 */
export const EndPage: FC<EndPageProps> = memo(function EndPage({ clearTime }: EndPageProps) {
	const { correct } = useContext(AppContext);
	const restart = useStart();

	if (clearTime.length === 0) {
		return null;
	}

	const title = `10問中、${correct}問正解！（クリアタイム：${clearTime}）`;
	const copyText: string = `ポケモン耐性クイズ ${clearTime}で10問中、${correct}問正解！\nhttps://poke-effective-quiz.vercel.app/`;

	return (
		<>
			<p className="Page__endPage__result">{title}</p>
			<CopyArea text={copyText} />
			<button className="Page__startButton" onClick={restart}>
				もう一度はじめる
			</button>
		</>
	);
});

type CopyAreaProps = {
	text: string;
};

const CopyArea: FC<CopyAreaProps> = memo(function CopyArea({ text }: CopyAreaProps) {
	const inputRef = useRef<HTMLTextAreaElement | null>(null);

	return (
		<div className="Page__endPage__copyArea">
			<textarea ref={inputRef} defaultValue={text} readOnly />
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
