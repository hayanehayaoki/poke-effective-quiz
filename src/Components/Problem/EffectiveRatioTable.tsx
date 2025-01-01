import { FC, memo, useContext, useMemo } from "react";
import { AppContext } from "../../Constants/AppContext";
import { DamageEffective, moveDamageEffective } from "../../Constants/MoveEffectDef";
import { PokeType, pokeTypeId, pokeTypeName } from "../../Constants/PokeTypeDef";

export const EffectiveRatioTable: FC = memo(function EffectiveRatioTable() {
	const tableData = useTableRow();

	if (tableData === null) {
		return null;
	}

	return (
		<table>
			<tbody>
				<TableRow head="4倍" type={tableData.fourTimes} />
				<TableRow head="2倍" type={tableData.double} />
				<TableRow head="0.5倍" type={tableData.half} />
				<TableRow head="0.25倍" type={tableData.quarter} />
				<TableRow head="無効" type={tableData.zero} />
			</tbody>
		</table>
	);
});

type TableRowProps = {
	head: string;
	type: string[];
};
const TableRow: FC<TableRowProps> = memo(function TableRow(props: TableRowProps) {
	const { head, type } = props;

	return (
		<tr>
			<th scope="row">{head}</th>
			<td>{type.join(", ")}</td>
		</tr>
	);
});

type TableData = {
	fourTimes: string[];
	double: string[];
	half: string[];
	quarter: string[];
	zero: string[];
};

const useTableRow = (): TableData | null => {
	const { quizType } = useContext(AppContext);

	const memo = useMemo((): TableData | null => {
		if (quizType === null) {
			return null;
		}

		const de1 = moveDamageEffective[pokeTypeName[quizType[0]].name];
		const de2 = moveDamageEffective[pokeTypeName[quizType[1]].name];

		const fourTimes: string[] = [];
		const double: string[] = [];
		const half: string[] = [];
		const quarter: string[] = [];
		const zero: string[] = [];

		// タイプごとに倍率を種痘
		for (const id of pokeTypeId) {
			const { name, label } = pokeTypeName[id];

			// 倍率の取得
			const ratio1 = getRatio(name, de1);
			const ratio2 = getRatio(name, de2);

			const ratio = ratio1 * ratio2;

			// 倍率の振り分け
			if (ratio === 4) {
				fourTimes.push(label);
			} else if (ratio === 2) {
				double.push(label);
			} else if (ratio === 0.5) {
				half.push(label);
			} else if (ratio === 0.25) {
				quarter.push(label);
			} else if (ratio === 0) {
				zero.push(label);
			}
		}

		return { fourTimes, double, half, quarter, zero };
	}, [quizType]);

	return memo;
};

/**
 * ダメージの倍率を取得する
 *
 * @param name タイプ名
 * @param de 受け側のタイプのダメージ倍率
 * @returns ダメージの倍率
 */
const getRatio = (name: PokeType, de: DamageEffective): number => {
	const { double, half, zero } = de;

	if (double.includes(name)) {
		return 2;
	} else if (half.includes(name)) {
		return 0.5;
	} else if (zero.includes(name)) {
		return 0;
	} else {
		return 1;
	}
};
