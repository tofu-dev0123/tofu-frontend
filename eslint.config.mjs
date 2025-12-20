import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  // Prettier を ESLint に統合
  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  // ESLint と Prettier の競合ルールを無効化
  prettierConfig,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
