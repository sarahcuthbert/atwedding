import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Schedule } from './Schedule.tsx';

test('displays title, icon and time passed in', () => {
    render(<Schedule />);

    expect(
        screen.getByRole('heading', { name: 'Schedule of Events' })
    ).toBeDefined();
    expect(screen.getAllByRole('listitem')).toHaveLength(7);
});
