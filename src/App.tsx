import { FC, useState } from "react";
import "./App.css";
import { Page } from "./Components/Page/Page";
import { AppContext, AppContextProps } from "./Constants/AppContext";
import "./Styles/App.scss";

const App: FC = () => {
	const [quizType, setQuizType] = useState<AppContextProps["quizType"]>(null);
	const [index, setIndex] = useState<AppContextProps["index"]>(0);
	const [correct, setCorrect] = useState<AppContextProps["correct"]>(0);
	const [type1, setType1] = useState<AppContextProps["type1"]>(0);
	const [type2, setType2] = useState<AppContextProps["type2"]>(0);
	const [explanation, setExplanation] = useState<AppContextProps["explanation"]>(false);

	const defaultContext: AppContextProps = {
		quizType,
		setQuizType,
		index,
		setIndex,
		correct,
		setCorrect,
		type1,
		setType1,
		type2,
		setType2,
		explanation,
		setExplanation,
	};

	return (
		<AppContext.Provider value={defaultContext}>
			<Page />
		</AppContext.Provider>
	);
};

export default App;
