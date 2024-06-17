import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import prettierConfig from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";


export default [
    {
        languageOptions: {
            globals: globals.browser
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.jsx", "**/*.tsx", "**/*.js", "**/*.ts"],
        languageOptions: {parserOptions: {ecmaFeatures: {jsx: true}}}
    },
    pluginReactConfig,
    prettierConfig,
    {
        settings: {
          react: {
              version: "detect",
          }
        },
        plugins: {
            prettier: pluginPrettier
        },
        rules: {
            "prettier/prettier": "error",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn"
        }
    }
];