import antfu from '@antfu/eslint-config'

export default antfu()
  .override('antfu/typescript/rules', {
    rules: {
      complexity: ['error', 5],
    },
  })
  // .override('antfu/imports/rules', {
  //   // rules: {
  //   //   'import/order': ['error', { 'newlines-between': 'always' }],
  //   // },
  // })
