/**
 * ポケモンのタイプ定義
 */
const pokeTypeDef = [
	"normal",
	"honoo",
	"mizu",
	"kusa",
	"denki",
	"koori",
	"kakutou",
	"doku",
	"jimen",
	"hikou",
	"esper",
	"musi",
	"iwa",
	"ghost",
	"dragon",
	"aku",
	"hagane",
	"fairy",
] as const;

/**
 * ポケモンのタイプ型
 */
export type PokeType = (typeof pokeTypeDef)[number];

export const pokeTypeId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

/**
 * タイプの情報
 */
export const pokeTypeName: Record<number, { name: PokeType; label: string }> = {
	1: { name: "normal", label: "ノーマル" },
	2: { name: "honoo", label: "ほのお" },
	3: { name: "mizu", label: "みず" },
	4: { name: "kusa", label: "くさ" },
	5: { name: "denki", label: "でんき" },
	6: { name: "koori", label: "こおり" },
	7: { name: "kakutou", label: "かくとう" },
	8: { name: "doku", label: "どく" },
	9: { name: "jimen", label: "じめん" },
	10: { name: "hikou", label: "ひこう" },
	11: { name: "esper", label: "エスパー" },
	12: { name: "musi", label: "むし" },
	13: { name: "iwa", label: "いわ" },
	14: { name: "ghost", label: "ゴースト" },
	15: { name: "dragon", label: "ドラゴン" },
	16: { name: "aku", label: "あく" },
	17: { name: "hagane", label: "はがね" },
	18: { name: "fairy", label: "フェアリー" },
};

/**
 * @returns 出題対象IDの取得
 */
export const getQuizType = (): [number, number] => {
	const idx1 = Math.floor(Math.random() * pokeTypeDef.length);
	const idx2 = Math.floor(Math.random() * pokeTypeDef.length);

	if (idx1 === idx2) {
		// タイプが重複したので再実行
		return getQuizType();
	} else {
		return [idx1 + 1, idx2 + 1];
	}
};
