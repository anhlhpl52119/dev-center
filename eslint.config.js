import antfu from '@antfu/eslint-config';

export default antfu({
  typescript: true,
  formatters: {
    css: true,
    markdown: false,
  },
  vue: {
    overrides: {
      'vue/attribute-hyphenation': ['error', 'never'],
      'vue/v-on-event-hyphenation': ['error', 'never'],
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: { max: 2 },
          multiline: { max: 1 },
        },
      ],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
        },
      ],
    },
  },
  stylistic: {
    overrides: {
      'style/quote-props': ['error', 'as-needed'],
    },
    semi: true,
    quotes: 'single',
  },
  rules: {
    'no-console': 'warn',
    'unused-imports/no-unused-vars': 'warn',
    'node/prefer-global/process': 'off',
  },
});
