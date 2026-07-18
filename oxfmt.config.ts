import { defineConfig } from 'oxfmt';
import ultracite from 'ultracite/oxfmt';

export default defineConfig({
  ...ultracite,
  printWidth: 100,
  proseWrap: 'preserve',
  singleQuote: true,
  sortImports: false,
  trailingComma: 'all',
});
