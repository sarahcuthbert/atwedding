import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EventDetails } from './EventDetails.tsx';

test('displays title, icon and time passed in', () => {
    render(<EventDetails />);

    expect(
        screen.getByRole('heading', { name: 'Event Details' })
    ).toBeDefined();
    expect(screen.getByRole('heading', { name: 'The Venue' })).toBeDefined();
    expect(screen.getByRole('heading', { name: 'Dress Code' })).toBeDefined();
    expect(
        screen.getByRole('heading', { name: 'Places to Stay' })
    ).toBeDefined();
    expect(screen.getByRole('heading', { name: 'Taxis' })).toBeDefined();
});
