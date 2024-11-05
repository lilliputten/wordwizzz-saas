/** @type {import('prettier').Config} */
module.exports = {
  bracketSpacing: true,
  endOfLine: 'lf',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 100,
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<BUILTIN_MODULES>', // Node.js built-in modules
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/env(.*)$',
    '^@/types/(.*)$',
    '^@/config/(.*)$',
    '^@/lib/(.*)$',
    '^@/hooks/(.*)$',
    '^@/components/ui/(.*)$',
    '^@/components/(.*)$',
    '^@/styles/(.*)$',
    '^@/app/(.*)$',
    '^@/',
    '',
    '^[./]',
    '',
    '^[./].*.(css|less|scss)$',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  plugins: [
    // @see https://www.npmjs.com/package/@ianvs/prettier-plugin-sort-imports#options
    '@ianvs/prettier-plugin-sort-imports',
    // 'prettier-plugin-organize-imports' ?
    'prettier-plugin-tailwindcss',
  ],
};
