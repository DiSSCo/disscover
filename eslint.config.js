import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';

export default defineConfig([
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    jsxA11y.flatConfigs.recommended,
    jsxA11y.flatConfigs.strict,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'], 
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
            // Need to be fixed and/or evaluated
            "prefer-const": "off",
            "no-undef": "off",
            "no-useless-catch": "off",
            "@typescript-eslint/no-unused-expressions": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "jsx-a11y/no-noninteractive-element-interactions": "off",
            "react/jsx-no-target-blank": "off",
            "react/no-unescaped-entities": "off"
        },
    },
    {
        files: ['**/*.jsx', '**/*.tsx'],
        ...reactHooks.configs['recommended-latest'],
        rules: {
            "react-hooks/exhaustive-deps": "off"
        }
    },
    {
        files: ['**/*.jsx', '**/*.tsx'],
        ...reactRefresh.configs.vite,
        rules: {
            "react-refresh/only-export-components": "off",
        },
    },
    {
        ignores: ['dist', 'eslint.config.js', './src/app/types/*'],
    },
]);