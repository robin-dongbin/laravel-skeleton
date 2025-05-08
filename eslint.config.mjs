import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import preferArrowFunctionsPlugin from 'eslint-plugin-prefer-arrow-functions'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import typescript from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...typescript.configs.recommended,
  {
    ...react.configs.flat.recommended,
    ...react.configs.flat['jsx-runtime'], // Required for React 17+
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    plugins: {
      'react-hooks': reactHooks,
      'prefer-arrow-functions': preferArrowFunctionsPlugin,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-arrow-functions/prefer-arrow-functions': [
        // There is no recommended configuration to extend so we have to set it here to enforce arrow functions.
        // @see https://github.com/JamieMason/eslint-plugin-prefer-arrow-functions
        'warn',
        {
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: 'unchanged',
          singleReturnOnly: false,
        },
      ],
    },
  },
  {
    ignores: ['vendor', 'node_modules', 'public', 'bootstrap/ssr', 'tailwind.config.js'],
  },
  prettier, // Turn off all rules that might conflict with Prettier
]
