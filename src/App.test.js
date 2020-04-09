import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('The empty booklist', () => {
  it('should show a prompt text', () => {
    const { getByText } = render(<App />); 
    const prompt = getByText('Start Adding Books to Your List!');
    expect(prompt).toBeInTheDocument();
  });

  it('should have two inputs and a submit button', () => {
    const { getByText, getByPlaceholderText } = render(<App />); 
    const titlePlaceholder = getByPlaceholderText('title');
    const authorPlaceholder = getByPlaceholderText('author');
    const addButton = getByText('Add to List!');
    expect(titlePlaceholder).toBeInTheDocument();
    expect(authorPlaceholder).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it('should show an error message if no title is entered', () => {
    const { getByText } = render(<App />); 
    fireEvent.click(getByText('Add to List!'));
    expect(getByText('Entry must include a title.')).toBeInTheDocument()
  });

  it('should update the book list', () => {
    const { getByText, getByPlaceholderText } = render(<App />); 
    fireEvent.input(getByPlaceholderText('title'), {target: {value: 'Persuasion'}})
    fireEvent.input(getByPlaceholderText('author'), {target: {value: 'Jane Austen'}})
    fireEvent.click(getByText('Add to List!'));
    expect(getByText('Persuasion by Jane Austen')).toBeInTheDocument()
  });

  it('should remove a book from the list', () => {
    const { getByText, getByPlaceholderText, getByTestId, queryByText, queryAllByRole } = render(<App />); 
    //Book 1
    fireEvent.input(getByPlaceholderText('title'), {target: {value: 'Persuasion'}});
    fireEvent.input(getByPlaceholderText('author'), {target: {value: 'Jane Austen'}});
    fireEvent.click(getByText('Add to List!'));
    //Book 2
    fireEvent.input(getByPlaceholderText('title'), {target: {value: 'Bel Canto'}});
    fireEvent.input(getByPlaceholderText('author'), {target: {value: 'Ann Patchett'}});
    fireEvent.click(getByText('Add to List!'));
    //Book 3
    fireEvent.input(getByPlaceholderText('title'), {target: {value: 'Ender\'s Game'}});
    fireEvent.input(getByPlaceholderText('author'), {target: {value: 'Orson Scott Card'}});
    fireEvent.click(getByText('Add to List!'));
                         
    expect(queryAllByRole('listitem')).toHaveLength(3);
    expect(getByText('Bel Canto by Ann Patchett')).toBeInTheDocument();
    fireEvent.click(getByTestId('remove-Bel Canto'));
    expect(queryByText('Bel Canto by Ann Patchett')).toBeNull();
  });

  it('should edit the author of a book on the list', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<App />); 
    fireEvent.input(getByPlaceholderText('title'), {target: {value: 'Persuasion'}});
    fireEvent.input(getByPlaceholderText('author'), {target: {value: 'Jane Austen'}});
    fireEvent.click(getByText('Add to List!'));
    
    expect(getByText('Persuasion by Jane Austen')).toBeInTheDocument();
    fireEvent.click(getByTestId('edit-Persuasion'));
    expect(getByPlaceholderText('edit-author')).toBeInTheDocument();
    fireEvent.input(getByPlaceholderText('edit-author'), {target: {value: 'A lady'}});
    fireEvent.click(getByText('Submit Change'));
    expect(getByText('Persuasion by A lady')).toBeInTheDocument();
  })
})
