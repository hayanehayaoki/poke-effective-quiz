import { ChangeEvent, FC, memo } from "react";
import { pokeTypeId, pokeTypeName } from "../../Constants/PokeTypeDef";

type AnswerSelectsProps = {
	types: number[];
	onUpdate: (param: { id: number; order?: number }) => void;
};

export const AnswerSelects: FC<AnswerSelectsProps> = memo(function AnswerSelects(
	props: AnswerSelectsProps,
) {
	const { types, onUpdate } = props;

	return (
		<div className="Answer__selects">
			<AnswerSelect order={1} type={types[0]} onUpdate={onUpdate} />
			<AnswerSelect order={2} type={types[1]} onUpdate={onUpdate} />
		</div>
	);
});

type AnswerSelectProps = {
	/** 何個目のリストボックスか */
	order: number;
	type: number;
	onUpdate: (param: { id: number; order?: number }) => void;
};

const AnswerSelect: FC<AnswerSelectProps> = memo(function AnswerSelect(props: AnswerSelectProps) {
	const { order, type, onUpdate } = props;

	const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		onUpdate({ id: Number(value), order });
	};

	return (
		<select value={type} onChange={onChange}>
			<option value={0} />
			{pokeTypeId.map((id) => {
				const { label } = pokeTypeName[id];
				return (
					<option key={id} value={id}>
						{label}
					</option>
				);
			})}
		</select>
	);
});
