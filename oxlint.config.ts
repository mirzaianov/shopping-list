import { defineConfig } from 'oxlint';
import core from 'ultracite/oxlint/core';
import next from 'ultracite/oxlint/next';
import react from 'ultracite/oxlint/react';

export default defineConfig({
  extends: [core, react, next],
  ignorePatterns: core.ignorePatterns,
  jsPlugins: ['./oxlint-plugin.mjs'],
  settings: {
    react: {
      version: '19.2.7',
    },
  },
  rules: {
    'arrow-body-style': 'off',
    curly: 'off',
    'func-style': 'off',
    'import/consistent-type-specifier-style': 'off',
    'local/padding-line-between-statements': 'error',
    'no-nested-ternary': 'off',
    'prefer-destructuring': 'off',
    'react/hook-use-state': 'off',
    'require-await': 'off',
    'require-unicode-regexp': 'off',
    'sort-keys': 'off',
    'typescript/consistent-type-definitions': 'off',
    'unicorn/consistent-existence-index-check': 'off',
    'unicorn/no-useless-spread': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prefer-string-replace-all': 'off',
  },
});
