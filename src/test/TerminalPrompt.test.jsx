import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TerminalPrompt from '../components/TerminalPrompt';

describe('TerminalPrompt', () => {
  it('renders correctly', () => {
    render(<TerminalPrompt path="~/test" />);
    expect(screen.getByText('~/test')).toBeInTheDocument();
  });

  it('shows user on small screens and full prompt on large screens', () => {
    render(<TerminalPrompt />);
    const fullPrompt = screen.getByText('gustavo@portfolio');
    const shortPrompt = screen.getByText('user');
    
    expect(fullPrompt).toHaveClass('hidden', 'sm:inline');
    expect(shortPrompt).toHaveClass('sm:hidden');
  });
});
