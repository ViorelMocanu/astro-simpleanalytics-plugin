/** @format */

import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
	{
		files: ['**/*.js'],
		ignores: ['.astro/**', '.cache/**', '.github/**', '.idea/**', '.netlify/**', '.vercel/**', 'build/**', 'coverage/**', 'dev-dist/**', 'dist/**', 'node_modules/**', 'static/**'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: { modules: true },
				ecmaVersion: 'latest',
			},
		},
		plugins: {
			'@typescript-eslint': ts,
			ts,
		},
		rules: {
			...ts.configs['eslint-recommended'].rules,
			...ts.configs['recommended'].rules,
			'indent': ['error', 'tab', { SwitchCase: 1 }],
			'linebreak-style': ['error', 'unix'],
			'brace-style': ['error', '1tbs', { allowSingleLine: true }],
			'sort-imports': 'warn',
			'key-spacing': ['error', { beforeColon: false, afterColon: true }],
			'keyword-spacing': ['error', { before: true, after: true }],
			'no-console': 'warn',
			'no-dupe-args': 'error',
			'no-duplicate-imports': 'error',
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'no-unexpected-multiline': 'error',
			'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
			'semi': ['warn', 'always', { omitLastInOneLineBlock: true }],
			'semi-style': ['error', 'last'],
			'semi-spacing': ['error', { before: false, after: true }],
			'space-before-blocks': 'error',
			'space-before-function-paren': 'warn',
			'space-in-parens': ['warn', 'never'],
			'template-curly-spacing': 'warn',
			'wrap-regex': 'warn',
		},
	},
	{
		files: ['**/*.ts'],
		ignores: ['.astro/**', '.cache/**', '.github/**', '.idea/**', '.netlify/**', '.vercel/**', 'build/**', 'coverage/**', 'dist/**', 'dev-dist/**', 'node_modules/**', 'src/env.d.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: { modules: true },
				ecmaVersion: 'latest',
			},
		},
		plugins: {
			'@typescript-eslint': ts,
			ts,
		},
		rules: {
			...ts.configs['eslint-recommended'].rules,
			...ts.configs['recommended'].rules,
			'indent': ['error', 'tab', { SwitchCase: 1 }],
			'linebreak-style': ['error', 'unix'],
			'brace-style': ['error', '1tbs', { allowSingleLine: true }],
			'sort-imports': 'warn',
			'key-spacing': ['error', { beforeColon: false, afterColon: true }],
			'keyword-spacing': ['error', { before: true, after: true }],
			'no-console': 'warn',
			'no-dupe-args': 'error',
			'no-duplicate-imports': 'error',
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'no-unexpected-multiline': 'error',
			'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
			'semi': ['warn', 'always', { omitLastInOneLineBlock: true }],
			'semi-style': ['error', 'last'],
			'semi-spacing': ['error', { before: false, after: true }],
			'space-before-blocks': 'error',
			'space-before-function-paren': 'warn',
			'space-in-parens': ['warn', 'never'],
			'template-curly-spacing': 'warn',
			'wrap-regex': 'warn',
		},
	},
];
