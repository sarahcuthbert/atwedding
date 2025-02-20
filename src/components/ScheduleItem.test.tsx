import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScheduleItem } from './ScheduleItem.tsx';

test('displays title, icon and time passed in', () => {
    render(
        <ScheduleItem itemTitle="Event1" icon={<h6>Icon</h6>} time="16:00" />
    );

    expect(screen.getByText('Event1')).toBeDefined();
    expect(screen.getByText('16:00')).toBeDefined();
    expect(screen.getByText('Icon')).toBeDefined();
});
