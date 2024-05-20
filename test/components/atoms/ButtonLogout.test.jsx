import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, vi, expect} from 'vitest';
import ButtonLogout from '../../../src/components/atoms/ButtonLogout';

/**
 * test scenario for ButtonLogout Component
 *
 * - ButtonLogout Component
 *   - should render the button with correct text and icon
 *   - should call the listener function when button is clicked
 */
describe('ButtonLogout Component', () => {
  it('should render the button with correct text and icon', () => {
    const mockListener = vi.fn();

    render(<ButtonLogout listener={mockListener} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
        'absolute px-9 py-2 bg-tertiary text-orange-500 top-16 right-4 rounded-md sm:right-8 lg:right-16 xl:right-20 2xl:right-24 -z-0',
    );
    expect(button).toBeInTheDocument();

    const icon = screen.getByTestId('logout-icon');
    expect(icon).toBeInTheDocument();

    const text = screen.getByText('Logout');
    expect(text).toBeInTheDocument();
  });

  it('should call the listener function when button is clicked', () => {
    const mockListener = vi.fn();

    render(<ButtonLogout listener={mockListener} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockListener).toHaveBeenCalledTimes(1);
  });
});
