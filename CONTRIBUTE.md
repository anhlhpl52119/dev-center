# CONTRIBUTE

## Eslint config

This is custom config for import sort, you can change in **.eslintrc.cjs**

```bash
  rules: {
    'simple-import-sort/imports': [
      2,
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Node.js builtins prefixed with `node:`.
          ['^node:'],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ['^'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.'],
        ],
      },
    ],
  }

  // You can also give detailed sorting like this: Sort priority is given in the order of groups.
```

**Contribute by: @seonyoung**
