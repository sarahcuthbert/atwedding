import {expect, describe, test, vi} from 'vitest'
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {RSVPForm} from "./RSVPForm.tsx";

describe('RSVPForm', () => {
    test('should display rsvp for single invitee', () => {
        const invitee = {firstName: "John", lastName: "Smith", email: "test@email.com"}

        render(<RSVPForm invitees={[invitee]} onSubmitRSVP={vi.fn()}/>);

        expect(screen.getByRole("heading", {name: "RSVP details for John Smith"})).toBeDefined();
        expect(screen.getByRole('button').textContent).toBe("Submit");
    })

    test('should display multiple rsvp for multiple invitee', () => {
        const invitee = {firstName: "John", lastName: "Smith", email: "test@email.com"}
        const invitee2 = {firstName: "Mary", lastName: "Smith", email: "test@email.com"}

        render(<RSVPForm invitees={[invitee, invitee2]} onSubmitRSVP={vi.fn()}/>);

        expect(screen.getByRole("heading", {name: "RSVP details for John Smith"})).toBeDefined();
        expect(screen.getByRole("heading", {name: "RSVP details for Mary Smith"})).toBeDefined();
    })

    test('should call on submit rsvp on submit', async () => {
        const mockSubmitRSVP = vi.fn();
        const invitee = {firstName: "John", lastName: "Smith", email: "test@email.com"}
        render(<RSVPForm invitees={[invitee]} onSubmitRSVP={mockSubmitRSVP}/>);

        await userEvent.click(screen.getByRole('button'));
        expect(mockSubmitRSVP).toHaveBeenCalledWith([{
            firstName: invitee.firstName,
            lastName: invitee.lastName,
            email: invitee.email,
            attending: true,
            dietary: '',
            other:''
        }]);
    })

    test('should hide form and show success on successful submit', async () => {
        const mockSubmitRSVP = vi.fn().mockImplementation(()=> true);
        const invitee = {firstName: "John", lastName: "Smith", email: "test@email.com"}
        render(<RSVPForm invitees={[invitee]} onSubmitRSVP={mockSubmitRSVP}/>);

        await userEvent.click(screen.getByRole('button'));

        expect(screen.getByText('RSVP successfully recorded!')).toBeDefined();
        expect(screen.queryByRole("heading", {name: "RSVP details for John Smith"})).toBeNull();
        expect(screen.queryByRole("button")).toBeNull();
    })

    test('should show form and error on failed submit', async () => {
        const mockSubmitRSVP = vi.fn().mockImplementation(()=> false);
        const invitee = {firstName: "John", lastName: "Smith", email: "test@email.com"}
        render(<RSVPForm invitees={[invitee]} onSubmitRSVP={mockSubmitRSVP}/>);

        await userEvent.click(screen.getByRole('button'));

        expect(screen.getByText('Error submitting RSVP. Please try again!')).toBeDefined();
        expect(screen.getByRole("heading", {name: "RSVP details for John Smith"})).toBeDefined();
    })
})
