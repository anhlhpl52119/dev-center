module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern:
        // type(scope): TICKET-123: commit subject
        // eslint-disable-next-line
        /^(\w*)(?:\((.*)\))?:(?:\s(\s*[A-Z]+\-[0-9]+\s*):)?\s(.*)$/,
      headerCorrespondence: ['type', 'scope', 'ticket', 'subject']
    }
  },
  rules: {
    'zl-subject-not-starts-with-space': [2, 'always'],
    'zl-ticket-not-starts-with-space': [2, 'always'],
    'zl-ticket-not-ends-with-space': [2, 'always'],
    'header-max-length': [2, 'always', 100],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'hotfix', 'chore', 'refactor', 'revert', 'test', 'style']
    ],
    'scope-enum': [
      2,
      'always',
      [
        'auth',
        'assets',
        'components',
        'composables',
        'configs',
        'layouts',
        'locales',
        'middlewares',
        'modules',
        'pages',
        'plugins',
        'server',
        'services',
        'shared',
        'store'
      ]
    ],
    'subject-empty': [2, 'never']
  },
  plugins: [
    {
      rules: {
        'zl-subject-not-starts-with-space': (args) => {
          const subject = args.subject ?? '';
          return [
            subject.trimStart().length === subject.length,
            'Your subject should not start with empty space'
          ];
        },
        'zl-ticket-not-starts-with-space': (args) => {
          const ticket = args.ticket ?? '';
          return [
            ticket.trimStart().length === ticket.length,
            'Your ticket should not start with empty space'
          ];
        },
        'zl-ticket-not-ends-with-space': (args) => {
          const ticket = args.ticket ?? '';
          return [
            ticket.trimEnd().length === ticket.length,
            'Your ticket should not end with empty space'
          ];
        }
      }
    }
  ]
};
