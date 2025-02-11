import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: false,
  typescript: true,
  react: true,
  rules: {
    'perfectionist/sort-imports': 'off',
  },
})
