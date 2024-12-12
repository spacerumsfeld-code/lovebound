import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    ignores: ["**/sst-env.d.ts", "**/api.client.ts", "**/async.ts", "**/stripe.ts", "**/_internals"],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { rules: { "@typescript-eslint/no-duplicate-enum-values": "off", "no-case-declarations": "off" } },
]; 