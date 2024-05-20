import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import ButtonClearFilter from '../../../src/components/atoms/ButtonClearFilter';

const mockListener = vi.fn();

/**
 * test scenario for ButtonClearFilter Component
 *
 * - ButtonClearFilter Component
 *   - renders correctly with the provided class and text
 *   - calls the listener function when clicked
 */
describe('ButtonClearFilter Component', () => {
  it('renders correctly with the provided class and text', () => {
    // arrange
    render(<ButtonClearFilter listener={mockListener} />);
    const buttonElement = screen.getByRole('button', {name: /clear filter/i});

    // assert
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
        'text-xs px-3 py-2 bg-tertiary border border-orange-500 text-nowrap rounded-lg',
    );
    expect(buttonElement).toHaveTextContent('Clear filter');
  });

  it('calls the listener function when clicked', () => {
    // arrange
    render(<ButtonClearFilter listener={mockListener} />);
    const buttonElement = screen.getByRole('button', {name: /clear filter/i});

    // action
    fireEvent.click(buttonElement);

    // assert
    expect(mockListener).toHaveBeenCalledTimes(1);
  });
});
