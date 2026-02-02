module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    // ⚠ Formatting via prettier
    'prettier/prettier': 'warn',
    'no-empty': ['error', { allowEmptyCatch: true }],
    // ✅ React comfort rules (disable annoying warnings)
    'react/prop-types': 'off', // Kalau gak pakai PropTypes
    'react/react-in-jsx-scope': 'off', // React 17+ gak perlu import React
    'no-unused-vars': 'off', // Matikan warning variabel tak terpakai
    'no-console': 'off', // Boleh pakai console.log saat dev
    'react/jsx-key': 'warn', // Biar ada pengingat tapi gak error keras
    'react-hooks/exhaustive-deps': 'warn',

    // ⚡ Hanya peringatan ringan
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
