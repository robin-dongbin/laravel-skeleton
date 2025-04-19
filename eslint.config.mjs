import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: false,
  react: true,
  typescript: true,
  rules: {
    'react-refresh/only-export-components': 'off',
    'perfectionist/sort-imports': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
})
