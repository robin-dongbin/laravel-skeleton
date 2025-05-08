import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions'
import react from 'eslint-plugin-react'
import reactCompiler from 'eslint-plugin-react-compiler'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import ts from 'typescript-eslint'

export default ts.config(
  { ignores: ['vendor', 'node_modules', 'public'] },
  {
    extends: [js.configs.recommended, ts.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    plugins: {
      'prefer-arrow-functions': preferArrowFunctions,
    },
    rules: {
      'prefer-arrow-functions/prefer-arrow-functions': 'warn',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs['recommended-latest'],
      reactCompiler.configs.recommended,
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    extends: [prettier],
  },
)
