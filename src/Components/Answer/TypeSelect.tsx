import { FC, memo, useCallback, useContext } from "react";
import { AppContext } from "../../Constants/AppContext";
import { AnswerButtons } from "./AnswerButtons";
import { AnswerSelects } from "./AnswerSelects";

type TypeSelectProps = {
	width: number;
};

export const TypeSelect: FC<TypeSelectProps> = memo(function TypeSelect({
	width,
}: TypeSelectProps) {
	const { type1, type2 } = useContext(AppContext);
	const updateType = useUpdateType();

	if (width <= 460) {
		return <AnswerSelects types={[type1, type2]} onUpdate={updateType} />;
	} else {
		return <AnswerButtons types={[type1, type2]} onUpdate={updateType} />;
	}
});

const useUpdateType = (): ((param: { id: number; order?: number }) => void) => {
	const { type1, setType1, type2, setType2, explanation } = useContext(AppContext);

	const callback = useCallback(
		(param: { id: number; order?: number }) => {
			if (explanation) {
				return;
			}

			const { id, order } = param;
			if (order === 1) {
				// リストボックスの1つ目が更新
				setType1(id);
			} else if (order === 2) {
				// リストボックスの2つ目が更新
				setType2(id);
			} else {
				// ボタンの更新（選択・選択解除）
				if (type1 === id) {
					setType1(0);
				} else if (type2 === id) {
					setType2(0);
				} else {
					if (type1 === 0) {
						setType1(id);
					} else {
						setType2(id);
					}
				}
			}
		},
		[explanation, setType1, setType2, type1, type2],
	);

	return callback;
};
