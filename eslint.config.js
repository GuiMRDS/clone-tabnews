import js from "@eslint/js";
import globals from "globals";
import nextPlugin from "@next/eslint-plugin-next";
import jestPlugin from "eslint-plugin-jest";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: ["node_modules/**", ".next/**", "coverage/**"],
  },

  js.configs.recommended,

  // CommonJS files
  {
    files: [
      "infra/migrations/**/*.js",
      "infra/scripts/**/*.js",
      "jest.config.js",
      "commitlint.config.js",
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",

      globals: {
        ...globals.node,
      },
    },
  },

  // ESM / Next.js files
  {
    files: ["**/*.js"],

    ignores: [
      "infra/migrations/**/*.js",
      "infra/scripts/**/*.js",
      "jest.config.js",
      "commitlint.config.js",
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        ...globals.node,
        ...globals.browser,
        fetch: "readonly",
      },
    },
  },

  // Jest
  {
    files: ["**/*.test.js", "**/*.spec.js"],

    plugins: {
      jest: jestPlugin,
    },

    languageOptions: {
      globals: {
        ...globals.jest,
        fetch: "readonly",
      },
    },

    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },

  // Next.js
  {
    plugins: {
      "@next/next": nextPlugin,
    },

    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  prettier,
];
