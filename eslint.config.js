import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import reactRefresh from "eslint-plugin-react-refresh";

export default defineConfig([
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            parserOptions: {
                project: './tsconfig.json',
                ecmaFeatures: {
                    jsx: true,
                }
            }
        },
        rules: {
            "no-useless-catch": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
            "@typescript-eslint/no-unused-expressions": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-unused-vars": "off"
        },
    },
    {
        files: ['**/*.jsx'],
        ...reactHooks.configs['recommended-latest'],
    },
    {
        files: ['**/*.jsx'],
        ...reactRefresh.configs.vite,
        rules: {
            "react-refresh/only-export-components": "warn",
        },
    },
    {
        ignores: ['dist', 'eslint.config.js'],
    },
]);