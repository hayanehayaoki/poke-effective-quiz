import { FC, memo } from "react";
import { useStart } from "./useStart";

/**
 * 開始ページ
 */
export const StartPage: FC = memo(function StartPage() {
	const start = useStart();

	return (
		<div className="Page__startPage">
			<p className="Page--bold">ポケモン耐性クイズ（全10問）</p>
			<p>表示された耐性をもつ複合タイプを選択してください。</p>
			<ul>
				<li>ふゆうなどの無効特性は考慮しません。</li>
				<li>該当するタイプのポケモンがいない複合タイプも出題されます。</li>
			</ul>
			<button className="Page__startButton" onClick={start}>
				はじめる
			</button>
			<p className="Page__startPage__caution">
				クリアタイム計測機能を一時的に停止しています。
			</p>

			<a className="Page__link" href="https://x.com/aryr_asmy">
				作者X
			</a>
			<p className="Page__startPage__caution">
				ポケットモンスターのファンサイトです。関係各社様とは一切関係ございません。
			</p>
		</div>
	);
});
