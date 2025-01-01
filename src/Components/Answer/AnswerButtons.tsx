import { FC, memo } from "react";
import { PokeType, pokeTypeId, pokeTypeName } from "../../Constants/PokeTypeDef";

type AnswerButtonsProps = {
	types: number[];
	onUpdate: (param: { id: number; order?: number }) => void;
};

export const AnswerButtons: FC<AnswerButtonsProps> = memo(function AnswerButtons(
	props: AnswerButtonsProps,
) {
	const { types, onUpdate } = props;

	return (
		<div className="Answer__buttons">
			{pokeTypeId.map((id) => {
				// 選択状態
				const selected = types.includes(id);
				// 選択状態変更
				const setSelected = () => {
					onUpdate({ id });
				};
				return (
					<AnswerButton
						key={id}
						selected={selected}
						setSelected={setSelected}
						{...pokeTypeName[id]}
					/>
				);
			})}
		</div>
	);
});

type AnswerButtonProps = {
	name: PokeType;
	/** ボタンラベル */
	label: string;
	/** 選択状態 */
	selected: boolean;
	/** 選択状態変更 */
	setSelected: () => void;
};

export const AnswerButton = memo(function AnswerButton(props: AnswerButtonProps) {
	const { name, label, selected, setSelected } = props;
	return (
		<button
			className={`Answer__button Answer__button--${name}--${selected ? "selected" : "deselected"}`}
			onClick={setSelected}
		>
			{label}
		</button>
	);
});
