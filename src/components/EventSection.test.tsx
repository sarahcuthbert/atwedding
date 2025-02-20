import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EventSection } from './EventSection.tsx';

test('displays title and children', () => {
    render(
        <EventSection sectionTitle="event section title">
            Section body
        </EventSection>
    );

    expect(screen.getByText('event section title')).toBeDefined();
    expect(screen.getByText('Section body')).toBeDefined();
});
