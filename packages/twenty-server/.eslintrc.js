module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'unused-imports', '@stylistic'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'src/core/@generated/**'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'func-style':['error', 'declaration', { 'allowArrowFunctions': true }],
    'no-restricted-imports': [
      'error',
      {
        'patterns': [
          {
            'group': ['**../'],
            'message': 'Relative imports are not allowed.',
          },
        ],
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'type',
          'parent',
          'sibling',
          'object',
          'index',
        ],
        pathGroups: [
          {
            pattern: '@nestjs/**',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '**/interfaces/**',
            group: 'type',
            position: 'before',
          },
          {
            pattern: 'src/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: './*',
            group: 'sibling',
            position: 'before',
          },
        ],
        distinctGroup: true,
        warnOnUnassignedImports: true,
        pathGroupsExcludedImportTypes: ['@nestjs/**'],
      },
    ],
    'import/no-duplicates': ["error", {"considerQueryString": true}],
    'unused-imports/no-unused-imports': 'warn',
    "@typescript-eslint/consistent-type-imports": ["error", { "prefer": "no-type-imports" }],
    "@stylistic/linebreak-style": ["error", "unix"],
    "@stylistic/lines-between-class-members": ["error", { "enforce": [
        { blankLine: "always", prev: "method", next: "method" }
      ]}],
    "@stylistic/padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
      { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
      { blankLine: "always", prev: "*", next: ["interface", "type"] }
    ]
  },
};
