const serverActions = {
  meta: {
    type: "problem",
    docs: {
      description:
        'Enforce the use of `"use server";` declaration in `_actions.ts` files',
    },
    fixable: "code",
  },

  create(context) {
    return {
      Program(node) {
        const filename = context.getFilename();

        if (filename.endsWith("/_actions.ts")) {
          const sourceCode = context.getSourceCode();
          const firstLine = sourceCode.tokensAndComments[0];

          if (
            firstLine.type !== "String" ||
            firstLine.value !== '"use server"' ||
            firstLine.range[0] !== 0
          ) {
            context.report({
              node,
              message:
                'Missing `"use server";` declaration at the top of this `_actions.ts` file.',
            });
          }
        }
      },
    };
  },
};

module.exports = {
  rules: {
    "server-actions": serverActions,
  },
};
