const declarationKinds = new Set(['const', 'let', 'var']);
const blankLinePattern = /\r?\n[^\S\r\n]*\r?\n/u;
const blockCommentPattern = /\/\*[\s\S]*?\*\//gu;

const isVariableDeclaration = (statement) =>
  statement.type === 'VariableDeclaration' && declarationKinds.has(statement.kind);

const hasBlankLine = (source) =>
  blankLinePattern.test(
    source.replace(blockCommentPattern, (comment) => comment.replaceAll(/\r?\n/gu, '$&x')),
  );

const checkStatements = (context, statements) => {
  for (let index = 0; index < statements.length - 1; index += 1) {
    const previous = statements[index];
    const next = statements[index + 1];
    const previousIsVariable = isVariableDeclaration(previous);
    const nextIsVariable = isVariableDeclaration(next);
    const nextIsReturn = next.type === 'ReturnStatement';

    if (previousIsVariable === nextIsVariable && !nextIsReturn) {
      continue;
    }

    const between = context.sourceCode.text.slice(previous.range[1], next.range[0]);

    if (!hasBlankLine(between)) {
      let messageId = previousIsVariable ? 'expectedBlankLineAfter' : 'expectedBlankLineBefore';

      if (nextIsReturn) {
        messageId = 'expectedBlankLineBeforeReturn';
      }

      context.report({
        messageId,
        node: next,
      });
    }
  }
};

export const paddingLineBetweenStatementsRule = {
  create(context) {
    const checkBody = (node) => checkStatements(context, node.body);

    return {
      BlockStatement: checkBody,
      Program: checkBody,
      StaticBlock: checkBody,
      SwitchCase: (node) => checkStatements(context, node.consequent),
    };
  },
  meta: {
    docs: {
      description: 'Require blank lines around variable declaration groups and before returns',
    },
    messages: {
      expectedBlankLineAfter: 'Expected blank line after variable declarations.',
      expectedBlankLineBefore: 'Expected blank line before variable declarations.',
      expectedBlankLineBeforeReturn: 'Expected blank line before return statement.',
    },
    schema: [],
    type: 'layout',
  },
};

export default {
  meta: {
    name: 'local',
  },
  rules: {
    'padding-line-between-statements': paddingLineBetweenStatementsRule,
  },
};
