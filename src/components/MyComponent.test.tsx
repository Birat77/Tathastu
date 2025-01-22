import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import {NewComponent as MyComponent} from './index';

const mockData = [
  { id: 1, name: 'Ant' },
  { id: 2, name: 'Bee' },
  { id: 3, name: 'Cat' },
  { id: 4, name: 'Dog' },
  { id: 5, name: 'Elephant' },
];

describe('MyComponent', () => {
  it('renders correctly with data', () => {
    render(<MyComponent data={mockData} />);
    expect(screen.getByText('Ant')).toBeTruthy();
    expect(screen.getByText('Bee')).toBeTruthy();
    expect(screen.getByText('Cat')).toBeTruthy();
  });

  it('renders correctly without data', () => {
    render(<MyComponent data={[]} />);
    expect(screen.getByText('Type something to search...')).toBeTruthy();
  });

  it('filters items based on search term', () => {
    render(<MyComponent data={mockData} />);
    const searchInput = screen.getByPlaceholderText('Search your animal...');
    fireEvent.changeText(searchInput, 'Bee');
    expect(screen.getByText('Bee')).toBeTruthy();
    expect(screen.queryByText('Ant')).toBeNull();
    expect(screen.queryByText('Cat')).toBeNull();
  });

  it('clears the search input', () => {
    render(<MyComponent data={mockData} />);

    const searchInput = screen.getByPlaceholderText('Search your animal...');
    fireEvent.changeText(searchInput, 'Bee');
    const clearButton = screen.getByText('Clear');
    fireEvent.press(clearButton);
    expect(searchInput.props.value).toBe('');
    expect(screen.getByText('Ant')).toBeTruthy();
  });

  it('toggles item selection', () => {
    render(<MyComponent data={mockData} />);

    const antItem = screen.getByText('Ant');
    fireEvent.press(antItem);
    expect(screen.getByTestId('item-status-1')).toHaveTextContent('Selected');

    fireEvent.press(antItem);
    expect(screen.getByTestId('item-status-1')).toHaveTextContent('Not selected');
  });

  it('shows loading indicator while searching', () => {
    render(<MyComponent data={mockData} />);
    const searchInput = screen.getByPlaceholderText('Search your animal...');
    fireEvent.changeText(searchInput, 'Bee');
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('shows "No results found" when no items match the search term', () => {
    render(<MyComponent data={mockData} />);
    const searchInput = screen.getByPlaceholderText('Search your animal...');
    fireEvent.changeText(searchInput, 'Zebra');
    expect(screen.getByText('No results found')).toBeTruthy();
  });
});
