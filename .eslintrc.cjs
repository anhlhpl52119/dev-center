module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  extends: [
    'eslint-config-prettier',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  plugins: ['simple-import-sort', 'import'],
  rules: {
    semi: [2, 'always'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/order': 'off',
    'import/named': 'off',
    'sort-imports': 'off', // Turn off config because 'sort-imports' conflict with 'simple-import-sort'
    // Config syntax of vue file is template -> script -> style
    'vue/component-tags-order': [
      'error',
      {
        order: [['template', 'script'], 'style']
      }
    ],
    '@typescript-eslint/typedef': [
      'error',
      {
        arrowParameter: true,
        variableDeclaration: false,
        arrayDestructuring: true,
        parameter: true,
        propertyDeclaration: true,
        variableDeclarationIgnoreFunction: true
      }
    ],
    'no-useless-constructor': 'off',
    // Turn off this rules config because this have conflict with nuxt syntax
    'vue/multi-word-component-names': 'off',
    'vue/attribute-hyphenation': ['error', 'never', { ignore: [] }],
    'vue/v-on-event-hyphenation': ['error', 'never', { ignore: [] }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-multiple-template-root': 'off', // Vue 3 can use multiple root
    '@typescript-eslint/no-inferrable-types': 'off',
    'require-await': 'off', // Conflict with service defineNuxtPlugin of Nuxt
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'arrow-parens': 'off', // Agree use brace in arrow function (e.g: arr.find((item) => item.id))
    'antfu/top-level-function': 'off', // disable auto fix normal function to arrow function
    'no-unsafe-optional-chaining': 'off', // Disable unsafe usage of optional chaining (e.g: exampleString || exampleObject?.locale?.defaultLocale)
    'eslint-comments/no-unlimited-disable': 'off', // Disable when write Regex (e.g: /(-?[\.\d]+)rem/g;)
    // 'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_', caughtErrors: 'none' }],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
};
