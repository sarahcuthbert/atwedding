import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Home } from './Home.tsx';

test('displays home page headings', () => {
    render(<Home />);

    expect(screen.getAllByRole('heading')).toHaveLength(9);
});
