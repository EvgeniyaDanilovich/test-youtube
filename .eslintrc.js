module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: ['standard-with-typescript', 'plugin:react/recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: 'tsconfig.eslint.json',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'react/jsx-max-props-per-line': ['error', { maximum: 4 }],
		'@typescript-eslint/semi': 'off',
		'@typescript-eslint/prefer-nullish-coalescing': 0,
		'@typescript-eslint/strict-boolean-expressions': 0,
		'react/display-name': 'off',
		'@typescript-eslint/prefer-optional-chain': 'off',
		'@typescript-eslint/member-delimiter-style': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'@typescript-eslint/prefer-ts-expect-error': 'off',
	},
};
