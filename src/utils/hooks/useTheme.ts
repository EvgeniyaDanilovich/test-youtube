import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme } from '@components/App/types/themeTypes';

export const useTheme = (): [Theme, () => void] => {
	const [theme, setTheme] = useState(Theme.LIGHT);

	const setMode = (mode) => {
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, mode);
		setTheme(mode);
	};

	const switchTheme = () => {
		theme === Theme.LIGHT ? setMode(Theme.DARK) : setMode(Theme.LIGHT);
	};

	useEffect(() => {
		const localTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;
		localTheme && setTheme(localTheme);
	}, []);

	return [theme, switchTheme];
};

// module.exports = {
//     "env": {
//         "browser": true,
//         "es2021": true
//     },
//     "extends": [
//         "standard-with-typescript",
//         "plugin:react/recommended"
//     ],
//     parser: '@typescript-eslint/parser',
//     // "overrides": [
//     //     {
//     //         "env": {
//     //             "node": true
//     //         },
//     //         "files": [
//     //             ".eslintrc.{js,cjs}"
//     //         ],
//     //         "parserOptions": {
//     //             "sourceType": "script",
//     //             // "project": ['./tsconfig.json']
//     //         }
//     //     }
//     // ],
//     "parserOptions": {
//         "ecmaVersion": "latest",
//         "sourceType": "module",
//         project: 'tsconfig.eslint.json',
//     },
//     "plugins": [
//         "react",
//         "prettier",
//         '@typescript-eslint',
//     ],
//     "rules": {
//         indent: [2 ,4],
//         '@typescript-eslint/semi': 'off',
//         '@typescript-eslint/indent': [2, 4],
//         '@typescript-eslint/prefer-nullish-coalescing': 0,
//         '@typescript-eslint/strict-boolean-expressions': 0,
//         'react/display-name': 'off',
//         '@typescript-eslint/prefer-optional-chain': 'off',
//         '@typescript-eslint/member-delimiter-style': 'off',
//         '@typescript-eslint/explicit-function-return-type': 'off',
//         '@typescript-eslint/no-floating-promises': 'off'
//     }
// }
