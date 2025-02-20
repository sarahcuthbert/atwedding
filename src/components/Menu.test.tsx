import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Menu } from './Menu.tsx';

test('displays headings', () => {
    render(<Menu />);

    expect(screen.getByRole('heading', { name: 'Starters' })).toBeDefined();
    expect(screen.getByRole('heading', { name: 'Mains' })).toBeDefined();
});
