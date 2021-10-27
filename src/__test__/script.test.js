import { getByLabelText, getByText } from '@testing-library/dom';
import fs from 'fs';
import path from 'path';

import logic from '../script';

jest.dontMock('fs');

beforeEach(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'));
  document.documentElement.innerHTML = html.toString();
  logic();
});

test('clicking on a piece of the board the first time sets an O', () => {
  const container = document;
  const firstPiece = getByLabelText(container, 'piece 1');
  firstPiece.click();
  const circle = getByLabelText(container, 'circle');
  expect(firstPiece).toContainElement(circle);
});

test('clicking on a piece of the board the second time sets an X', () => {
  const container = document;
  const firstPiece = getByLabelText(container, 'piece 1');
  const secondPiece = getByLabelText(container, 'piece 2');
  firstPiece.click();
  const circle = getByLabelText(container, 'circle');
  expect(firstPiece).toContainElement(circle);
  secondPiece.click();
  const cross = getByLabelText(container, 'cross');
  expect(secondPiece).toContainElement(cross);
});

test('clicking new game button clears board', () => {
  const container = document;
  const newGame = getByText(container, /new game/i);
  const firstPiece = getByLabelText(container, 'piece 1');
  firstPiece.click();
  const circle = getByLabelText(container, 'circle');
  expect(firstPiece).toContainElement(circle);
  newGame.click();
  expect(firstPiece).not.toContainElement(circle);
})

test('getting a diagonal is a win', async () => {
  const container = document;
  const piece1 = getByLabelText(container, 'piece 1');
  const piece2 = getByLabelText(container, 'piece 2');
  const piece3 = getByLabelText(container, 'piece 3');
  const piece5 = getByLabelText(container, 'piece 5');
  const piece9 = getByLabelText(container, 'piece 9');
  piece1.click();
  piece2.click();
  piece5.click();
  piece3.click();
  piece9.click();
  expect(getByLabelText(container, 'piece 1')).toHaveClass('won');
  expect(getByLabelText(container, 'piece 5')).toHaveClass('won');
  expect(getByLabelText(container, 'piece 9')).toHaveClass('won');
});

test('getting a column is a win', async () => {
  const container = document;
  const piece1 = getByLabelText(container, 'piece 1');
  const piece2 = getByLabelText(container, 'piece 2');
  const piece3 = getByLabelText(container, 'piece 3');
  const piece4 = getByLabelText(container, 'piece 4');
  const piece7 = getByLabelText(container, 'piece 7');
  piece1.click();
  piece2.click();
  piece4.click();
  piece3.click();
  piece7.click();
  expect(getByLabelText(container, 'piece 1')).toHaveClass('won');
  expect(getByLabelText(container, 'piece 4')).toHaveClass('won');
  expect(getByLabelText(container, 'piece 7')).toHaveClass('won');
});

test('getting a row is a win', async () => {
  const container = document;
  const piece1 = getByLabelText(container, 'piece 1');
  const piece2 = getByLabelText(container, 'piece 2');
  const piece3 = getByLabelText(container, 'piece 3');
  const piece4 = getByLabelText(container, 'piece 4');
  const piece7 = getByLabelText(container, 'piece 7');
  piece1.click();
  piece4.click();
  piece2.click();
  piece7.click();
  piece3.click();
  expect(getByLabelText(container, 'piece 1')).toHaveClass('won');
  expect(getByLabelText(container, 'piece 2')).toHaveClass('won');
  expect(getByLabelText(container, 'piece 3')).toHaveClass('won');
});
