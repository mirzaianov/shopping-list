import assert from 'node:assert/strict';
import test from 'node:test';

import { paddingLineBetweenStatementsRule } from './oxlint-plugin.mjs';

const reportCount = (source, statements) => {
  const reports = [];
  const visitor = paddingLineBetweenStatementsRule.create({
    report: (report) => reports.push(report),
    sourceCode: { text: source },
  });

  visitor.Program({ body: statements });

  return reports.length;
};

const statement = (source, text, type, kind) => {
  const start = source.indexOf(text);

  return {
    kind,
    range: [start, start + text.length],
    type,
  };
};

test('enforces padding after variable declaration groups', () => {
  const missingPadding = 'const first = 1;\nlet second = 2;\nvar third = 3;\nreturn third;';
  const validPadding = 'const value = 1;\n\nreturn value;';
  const commentWithoutPadding = 'const value = 1;\n// explanation\nreturn value;';
  const blockCommentWithoutPadding = 'const value = 1;\n/* explanation\n\n */\nreturn value;';
  const terminalDeclaration = 'const value = 1;';
  const crlfPadding = 'const value = 1;\r\n\r\nreturn value;';

  assert.equal(
    reportCount(missingPadding, [
      statement(missingPadding, 'const first = 1;', 'VariableDeclaration', 'const'),
      statement(missingPadding, 'let second = 2;', 'VariableDeclaration', 'let'),
      statement(missingPadding, 'var third = 3;', 'VariableDeclaration', 'var'),
      statement(missingPadding, 'return third;', 'ReturnStatement'),
    ]),
    1,
  );
  assert.equal(
    reportCount(blockCommentWithoutPadding, [
      statement(blockCommentWithoutPadding, 'const value = 1;', 'VariableDeclaration', 'const'),
      statement(blockCommentWithoutPadding, 'return value;', 'ReturnStatement'),
    ]),
    1,
  );
  assert.equal(
    reportCount(validPadding, [
      statement(validPadding, 'const value = 1;', 'VariableDeclaration', 'const'),
      statement(validPadding, 'return value;', 'ReturnStatement'),
    ]),
    0,
  );
  assert.equal(
    reportCount(commentWithoutPadding, [
      statement(commentWithoutPadding, 'const value = 1;', 'VariableDeclaration', 'const'),
      statement(commentWithoutPadding, 'return value;', 'ReturnStatement'),
    ]),
    1,
  );
  assert.equal(
    reportCount(terminalDeclaration, [
      statement(terminalDeclaration, 'const value = 1;', 'VariableDeclaration', 'const'),
    ]),
    0,
  );
  assert.equal(
    reportCount(crlfPadding, [
      statement(crlfPadding, 'const value = 1;', 'VariableDeclaration', 'const'),
      statement(crlfPadding, 'return value;', 'ReturnStatement'),
    ]),
    0,
  );
});
