import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Layout } from './Layout.tsx';

test('displays Header, content and footer', () => {
    render(
        <MemoryRouter>
            <Layout>Children</Layout>
        </MemoryRouter>
    );

    expect(screen.getByText('Amy & Tristan')).toBeDefined();
    expect(screen.getByText('Children')).toBeDefined();
    expect(screen.getByText('Made by the Maid of Honour')).toBeDefined();
});
