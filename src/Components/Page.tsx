import { FC, memo, useContext } from "react";
import { AppContext } from "../Constants/AppContext";
import { Answer } from "./Answer/Answer";
import { EndPage } from "./Page/EndPage";
import { StartPage } from "./Page/StartPage";
import { Problem } from "./Problem/Problem";

export const Page: FC = memo(function Page() {
	const { index } = useContext(AppContext);

	if (index === 0) {
		// 開始ページ
		return <StartPage />;
	} else if (index === 11) {
		// 結果ページ
		return <EndPage />;
	} else {
		return (
			<>
				<Problem />
				<Answer />
			</>
		);
	}
});
