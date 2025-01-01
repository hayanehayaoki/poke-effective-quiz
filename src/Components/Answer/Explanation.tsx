import { FC, memo, useContext, useMemo } from "react";
import { AppContext } from "../../Constants/AppContext";
import { PokeData, pokeList } from "../../Constants/PokeList";
import { pokeTypeName } from "../../Constants/PokeTypeDef";

type ExplanationProps = {
	isCorrect: boolean;
	label: string[];
	pokemon: string[];
};

export const Explanation: FC = memo(function Explanation() {
	const explanation = useGetExplanation();

	if (explanation === null) {
		return null;
	}

	return (
		<div className="Explanation">
			<p className="Explanation__correct">
				{explanation.isCorrect ? "正解！" : "不正解・・・"}
			</p>
			<TypeText label={explanation.label} />
			<PokeText pokemon={explanation.pokemon} />
		</div>
	);
});

const TypeText: FC<Pick<ExplanationProps, "label">> = memo(function TypeText({
	label,
}: Pick<ExplanationProps, "label">) {
	return (
		<p>
			答えは 「<span>{label[0]}</span>」タイプ＆「<span>{label[1]}</span>」タイプ です。
		</p>
	);
});

const PokeText: FC<Pick<ExplanationProps, "pokemon">> = memo(function PokeText({
	pokemon,
}: Pick<ExplanationProps, "pokemon">) {
	if (pokemon.length === 0) {
		return <p>このタイプのポケモンは存在しません。</p>;
	} else if (pokemon.length === 1) {
		return (
			<p>
				このタイプのポケモンは<span>{pokemon[0]}</span>がいます。
			</p>
		);
	} else {
		return (
			<p>
				このタイプのポケモンは <span>{pokemon[0]}</span>や<span>{pokemon[1]}</span>
				などがいます。
			</p>
		);
	}
});

const useGetExplanation = (): ExplanationProps | null => {
	const { quizType, type1, type2 } = useContext(AppContext);

	const memo = useMemo((): ExplanationProps | null => {
		if (quizType === null) {
			return null;
		}

		const isCorrect = quizType.includes(type1) && quizType.includes(type2);

		const [quizType1, quizType2] = quizType;

		// タイプ名称
		const label1 = pokeTypeName[quizType1].label;
		const label2 = pokeTypeName[quizType2].label;

		// 該当するポケモン
		let data: PokeData[];
		try {
			if (quizType1 < quizType2) {
				data = pokeList[quizType1][quizType2];
			} else {
				data = pokeList[quizType2][quizType1];
			}
		} catch (error) {
			console.error(error);
			data = [];
		}

		// 名称を取得
		const pokemon = data.map(({ name }) => {
			return name;
		});

		return { isCorrect, label: [label1, label2], pokemon };
	}, [quizType, type1, type2]);

	return memo;
};
