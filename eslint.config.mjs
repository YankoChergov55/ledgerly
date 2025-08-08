import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.strict,
	tseslint.configs.stylistic,
	{
		ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],
		languageOptions: {
			parserOptions: {
				project: './tsconfig.json',
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
			globals: {
				...globals.node,
			},
		},
		rules: {
			'no-console': 'warn',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['error'],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-floating-promises': 'error',
			'prefer-const': 'warn',
			'prettier/prettier': 'off',
		},
	},
	prettierRecommended
);

