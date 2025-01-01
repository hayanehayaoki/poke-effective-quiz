import { FC, memo, useContext } from "react";
import { AppContext } from "../../Constants/AppContext";
import { EffectiveRatioTable } from "./EffectiveRatioTable";

export const Problem: FC = memo(function Problem() {
	const { index } = useContext(AppContext);

	return (
		<div className="Problem">
			<p>この耐性を持つ複合タイプはどれ？（全10問）</p>
			<p>第{index}問</p>
			<EffectiveRatioTable />
		</div>
	);
});
