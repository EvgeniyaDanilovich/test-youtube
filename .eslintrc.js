module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    parser: '@typescript-eslint/parser',
    // "overrides": [
    //     {
    //         "env": {
    //             "node": true
    //         },
    //         "files": [
    //             ".eslintrc.{js,cjs}"
    //         ],
    //         "parserOptions": {
    //             "sourceType": "script",
    //             // "project": ['./tsconfig.json']
    //         }
    //     }
    // ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        project: 'tsconfig.eslint.json',
    },
    "plugins": [
        "react",
        "prettier",
        '@typescript-eslint',
    ],
    "rules": {
        indent: [2 ,4],
        '@typescript-eslint/semi': 'off',
        '@typescript-eslint/indent': [2, 4],
        '@typescript-eslint/prefer-nullish-coalescing': 0,
        '@typescript-eslint/strict-boolean-expressions': 0
    }
}
