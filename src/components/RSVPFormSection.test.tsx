import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RSVPFormSection } from './RSVPFormSection.tsx';
import { userEvent } from '@testing-library/user-event';

test('displays rsvp form for invitee with input', () => {
    const invitee = {
        firstName: 'John',
        lastName: 'Smith',
        email: 'test@email.com'
    };
    render(
        <RSVPFormSection
            invitee={invitee}
            index={0}
            attending={true}
            setAttending={vi.fn()}
            dietary={''}
            setDietary={vi.fn()}
            other={''}
            setOther={vi.fn()}
        />
    );

    expect(
        screen.getByRole('heading', { name: 'RSVP details for John Smith' })
    ).toBeDefined();
    expect(
        screen.getByRole('radiogroup', { name: 'Attending?' })
    ).toBeDefined();
    expect(
        screen.getByRole('textbox', { name: 'Preferences and Allergens' })
    ).toBeDefined();
    expect(screen.getByRole('textbox', { name: 'Other' })).toBeDefined();
});

test('calls set methods on input change', async () => {
    const invitee = {
        firstName: 'John',
        lastName: 'Smith',
        email: 'test@email.com'
    };
    const mockSetAttending = vi.fn();
    const mockSetDietary = vi.fn();
    const mockSetOther = vi.fn();
    render(
        <RSVPFormSection
            invitee={invitee}
            index={0}
            attending={true}
            setAttending={mockSetAttending}
            dietary={''}
            setDietary={mockSetDietary}
            other={''}
            setOther={mockSetOther}
        />
    );

    await userEvent.click(screen.getByRole('radio', { name: 'No' }));
    expect(mockSetAttending).toHaveBeenCalledWith(false, 0);

    await userEvent.type(
        screen.getByRole('textbox', { name: 'Preferences and Allergens' }),
        'veg'
    );
    expect(mockSetDietary).toHaveBeenCalledWith('v', 0);
    expect(mockSetDietary).toHaveBeenCalledWith('e', 0);
    expect(mockSetDietary).toHaveBeenCalledWith('g', 0);

    await userEvent.type(screen.getByRole('textbox', { name: 'Other' }), 's');
    expect(mockSetOther).toHaveBeenCalledWith('s', 0);
});
