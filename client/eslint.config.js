import js from '@eslint/js'
import globals from 'globals'
import reactX from "eslint-plugin-react-x";
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactDom from "eslint-plugin-react-dom";
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@stylistic': stylistic
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      reactX.configs['recommended-typescript'],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      reactDom.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/semi': ["error", "always", { "omitLastInOneLineBlock": true }],
      '@stylistic/no-trailing-spaces': "error",
      '@stylistic/no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 0, "maxBOF": 0 }]
    }
  },
])
