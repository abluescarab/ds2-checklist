/**
 * @file ESLint config file.
 */

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

const glob = (jOrT) => `**/*.?(c|m)${jOrT}s?(x)`;

/** @type {import('eslint').Linter.Config[]} */
export default [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: [glob("@(j|t)")],
    },
    {
        languageOptions: { globals: globals.browser },
    },
];
