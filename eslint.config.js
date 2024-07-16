import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals["shared-node-browser"] } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-console": "error",
    },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      globals: globals["commonjs"],
    },
    rules: {
      "@typescript-eslint/no-var-requires": "off",
    },
  },
];
