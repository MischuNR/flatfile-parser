import nx from "@nx/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import stylistic from "@stylistic/eslint-plugin";

export default [
    ...nx.configs["flat/base"],
    ...nx.configs["flat/typescript"],
    ...nx.configs["flat/javascript"],
    {
        ignores: [
            "**/dist",
            "**/out-tsc"
        ]
    },
    {
        files: [
            "**/*.ts",
            "**/*.tsx",
            "**/*.js",
            "**/*.jsx"
        ],
        rules: {
            "@nx/enforce-module-boundaries": [
                "error",
                {
                    enforceBuildableLibDependency: true,
                    allow: [
                        "^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$"
                    ],
                    depConstraints: [
                        {
                            sourceTag: "*",
                            onlyDependOnLibsWithTags: [
                                "*"
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        files: ["**/*.ts"],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        },
        plugins: {
            "unused-imports": unusedImports,
            "@stylistic": stylistic
        },
        rules: {
            "@typescript-eslint/explicit-member-accessibility": [
                "error",
                { accessibility: "explicit", overrides: { constructors: "no-public" } }
            ],
            "@typescript-eslint/prefer-readonly": "error",
            "@stylistic/quotes": [
                "error",
                "single",
                { avoidEscape: true, allowTemplateLiterals: "avoidEscape" }
            ],
            "@stylistic/semi": ["error", "always"],
            "curly": ["error", "all"],
            "@typescript-eslint/no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }]
        }
    }
];