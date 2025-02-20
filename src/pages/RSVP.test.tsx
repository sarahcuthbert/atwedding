import { expect, describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RSVP } from './RSVP.tsx';
import { userEvent } from '@testing-library/user-event';

describe('RSVPForm', () => {
    test('displays email form if no invitees', () => {
        render(<RSVP />);

        expect(
            screen.getByRole('heading', {
                name: 'Please enter your email address'
            })
        ).toBeDefined();
        expect(screen.getByRole('button').textContent).toBe('Continue');
    });

    test('displays rsvp form if onSubmitForm returns invitees', async () => {
        const invitee = {
            firstName: 'John',
            lastName: 'Smith',
            email: 'test@email.com'
        };
        // @ts-ignore
        const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
            json: () => Promise.resolve({ invitees: [invitee] })
        });

        render(<RSVP />);

        expect(
            screen.getByRole('heading', {
                name: 'Please enter your email address'
            })
        ).toBeDefined();
        await userEvent.type(screen.getByRole('textbox'), invitee.email);
        await userEvent.click(screen.getByRole('button'));

        expect(fetchSpy).toHaveBeenCalledWith(
            `api/invitees?email=${invitee.email}`
        );
        expect(
            await screen.findByRole('heading', {
                name: 'RSVP details for John Smith'
            })
        ).toBeDefined();
        expect(
            screen.queryByRole('heading', {
                name: 'Please enter your email address'
            })
        ).toBeNull();
    });

    test('displays rsvp form success if onSubmitRSVP succeeds', async () => {
        const invitee = {
            firstName: 'John',
            lastName: 'Smith',
            email: 'test@email.com'
        };
        // @ts-ignore
        vi.spyOn(global, 'fetch').mockResolvedValue({
            json: () => Promise.resolve({ invitees: [invitee] })
        });

        render(<RSVP />);

        await userEvent.type(screen.getByRole('textbox'), invitee.email);
        await userEvent.click(screen.getByRole('button'));
        expect(
            await screen.findByRole('heading', {
                name: 'RSVP details for John Smith'
            })
        ).toBeDefined();

        // @ts-ignore
        const fetchPostSpy = vi.spyOn(global, 'fetch').mockResolvedValue(true);

        await userEvent.click(screen.getByRole('button'));

        expect(fetchPostSpy).toHaveBeenCalledWith('api/rsvp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                responses: [
                    {
                        firstName: invitee.firstName,
                        lastName: invitee.lastName,
                        email: invitee.email,
                        attending: true,
                        dietary: '',
                        other: ''
                    }
                ]
            })
        });
        expect(screen.getByText('RSVP successfully recorded!')).toBeDefined();
    });
});
