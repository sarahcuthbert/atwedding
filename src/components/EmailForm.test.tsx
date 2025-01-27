import {expect, describe, test, vi} from 'vitest'
import {render, screen} from "@testing-library/react";
import {EmailForm} from './EmailForm';
import {userEvent} from "@testing-library/user-event";

describe('EmailForm', () => {
    test('should display email input', () => {
        render(<EmailForm onSubmitEmail={vi.fn()}/>);

        expect(screen.getByRole('heading', {name: 'Please enter your email address'})).toBeDefined();
        expect(screen.getByPlaceholderText('Email')).toBeDefined();
        expect(screen.getByRole('button').textContent).toBe("Continue");
    })

    test('should call on submit email with valid email address', async () => {
        const mockSubmitEmail = vi.fn();
        const mockEmail = 'test@email.com';
        render(<EmailForm onSubmitEmail={mockSubmitEmail}/>);

        await userEvent.type(screen.getByPlaceholderText('Email'), mockEmail);
        expect(screen.getByRole('textbox')).toHaveProperty("value", mockEmail);

        await userEvent.click(screen.getByRole('button'));
        expect(mockSubmitEmail).toHaveBeenCalledWith(mockEmail);
    })

    test('should not call on submit email when no email address submitted and show validation', async () => {
        const mockSubmitEmail = vi.fn();
        render(<EmailForm onSubmitEmail={mockSubmitEmail}/>);

        expect(screen.getByRole('textbox')).toHaveProperty("value", '');

        await userEvent.click(screen.getByRole('button'));
        expect(mockSubmitEmail).not.toHaveBeenCalled();
        expect(screen.getByRole('textbox').ariaInvalid).toBe('true');
        expect(screen.getByText('Please enter a valid email.')).toBeDefined();
    })

    test('should display error when onSubmitEmail returns false', async () => {
        const mockSubmitEmail = vi.fn().mockImplementation(() => false);
        const mockEmail = 'test@email.com';
        render(<EmailForm onSubmitEmail={mockSubmitEmail}/>);

        expect(screen.queryByText('Error retrieving invitee details. Please try again!')).toBeNull();

        await userEvent.type(screen.getByPlaceholderText('Email'), mockEmail);
        await userEvent.click(screen.getByRole('button'));

        expect(screen.getByText('Error retrieving invitee details. Please try again!')).toBeDefined();
    })
})
