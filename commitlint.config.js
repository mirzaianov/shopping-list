const taskCodePattern = /^[A-Z]+-\d+$/;

const localRules = {
  'task-code-scope': ({ scope }, when = 'always') => {
    const passes = !scope || taskCodePattern.test(scope);
    const valid = when === 'never' ? !passes : passes;

    return [
      valid,
      'scope must be empty or an uppercase task code like ABC-123',
    ];
  },
  'subject-starts-uppercase': ({ subject }, when = 'always') => {
    const passes = !subject || /^[A-Z]/.test(subject);
    const valid = when === 'never' ? !passes : passes;

    return [valid, 'subject must start with an uppercase letter'];
  },
};

const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: localRules,
    },
  ],
  rules: {
    'header-max-length': [2, 'always', 50],
    'subject-case': [0],
    'subject-full-stop': [2, 'never', '.'],
    'subject-starts-uppercase': [2, 'always'],
    'task-code-scope': [2, 'always'],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'docs', 'chore', 'test'],
    ],
  },
};

export default commitlintConfig;
