import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('Add recipe button toggles visibility of a form on the page ', () => {

  render(<App />);
  // `queryBy...` methods will return null if the element is not found:
  const recipeForm = screen.queryByText("Instructions:");

  // `getBy...` methods will "throw" an error if the element is not found:
  // const recipeForm = screen.getByText("Instructions:");

  expect(recipeForm).toBeNull();
  userEvent.click(screen.getByText("Add Recipe"));

  expect(screen.getByLabelText("Instructions:")).toBeInTheDocument();
});

test('typing in the recipe name makes the recipe name appear in the input', async () => {
  render(<App />);

  const recipeName = 'No pockets';
  userEvent.click(screen.getByText("Add Recipe"));
  await userEvent.type(screen.getByLabelText('Recipe name:'), recipeName);

  expect(screen.getByLabelText('Recipe name:').value).toEqual(recipeName);
})

const setup = () => {
  const app = render(<App />);

  userEvent.click(app.getByText('Add Recipe'));

  const submitButton = app.getByRole('button')
  const instructionsInput = app.getByLabelText('Instructions:')
  const nameInput = app.getByLabelText('Recipe name:')

  return {
    instructionsInput,
    nameInput,
    submitButton
  }
}

test('typing in the recipe instructions makes the instructions appear in the form', async () => {
  const {instructionsInput, nameInput, submitButton} = setup();
  const recipeName = "Lean Pockets"
  const recipeInstructions = "kinda hard to write instructions without knowing what I'm cooking"

  await userEvent.type(instructionsInput, recipeInstructions)
  await userEvent.type(nameInput, recipeName)
  userEvent.click(submitButton);

  expect(screen.getByRole('listitem')).toBeInTheDocument();
  expect(screen.getByText(recipeName)).toBeInTheDocument();
})