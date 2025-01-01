import { PokeType } from "./PokeTypeDef";

export type DamageEffective = {
	double: PokeType[];
	half: PokeType[];
	zero: PokeType[];
};

/**
 * タイプごとのわざのダメージ
 */
export const moveDamageEffective: Record<PokeType, DamageEffective> = {
	normal: {
		double: ["kakutou"],
		half: [],
		zero: ["ghost"],
	},
	honoo: {
		double: ["mizu", "jimen", "iwa"],
		half: ["honoo", "kusa", "koori", "musi", "hagane", "fairy"],
		zero: [],
	},
	mizu: {
		double: ["denki", "kusa"],
		half: ["honoo", "mizu", "koori", "hagane"],
		zero: [],
	},
	denki: {
		double: ["jimen"],
		half: ["denki", "hikou", "hagane"],
		zero: [],
	},
	kusa: {
		double: ["honoo", "koori", "doku", "hikou", "musi"],
		half: ["mizu", "denki", "kusa", "jimen"],
		zero: [],
	},
	koori: {
		double: ["honoo", "kakutou", "iwa", "hagane"],
		half: ["koori"],
		zero: [],
	},
	kakutou: {
		double: ["hikou", "esper", "fairy"],
		half: ["musi", "iwa", "aku"],
		zero: [],
	},
	doku: {
		double: ["jimen", "esper"],
		half: ["kusa", "kakutou", "doku", "musi", "fairy"],
		zero: [],
	},
	jimen: {
		double: ["mizu", "kusa", "koori"],
		half: ["doku", "iwa"],
		zero: ["denki"],
	},
	hikou: {
		double: ["denki", "koori", "iwa"],
		half: ["kusa", "kakutou", "musi"],
		zero: ["jimen"],
	},
	esper: {
		double: ["musi", "ghost", "aku"],
		half: ["kakutou", "esper"],
		zero: [],
	},
	musi: {
		double: ["honoo", "hikou", "iwa"],
		half: ["kusa", "kakutou", "jimen"],
		zero: [],
	},
	iwa: {
		double: ["mizu", "kusa", "kakutou", "jimen", "hagane"],
		half: ["normal", "honoo", "doku", "hikou"],
		zero: [],
	},
	ghost: {
		double: ["ghost", "aku"],
		half: ["doku", "musi"],
		zero: ["normal", "kakutou"],
	},
	dragon: {
		double: ["koori", "dragon", "fairy"],
		half: ["honoo", "mizu", "denki", "kusa"],
		zero: [],
	},
	aku: {
		double: ["kakutou", "musi", "fairy"],
		half: ["ghost", "aku"],
		zero: ["esper"],
	},
	hagane: {
		double: ["honoo", "kakutou", "jimen"],
		half: [
			"normal",
			"kusa",
			"koori",
			"hikou",
			"esper",
			"musi",
			"iwa",
			"dragon",
			"hagane",
			"fairy",
		],
		zero: ["doku"],
	},
	fairy: {
		double: ["doku", "hagane"],
		half: ["kakutou", "musi", "aku"],
		zero: ["dragon"],
	},
};
