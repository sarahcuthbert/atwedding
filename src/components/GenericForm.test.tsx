import {describe, expect, test, vi} from 'vitest'
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {GenericForm} from "./GenericForm.tsx";
import {RequestState} from "../model/RequestState.ts";

describe('Generic Form', () => {

    test('should call on submit when button pressed', async () => {
        const mockOnSubmit = vi.fn();
        render(<GenericForm onSubmitForm={mockOnSubmit} errorAlertText="Error Text" buttonText="Submit"
                            requestState={RequestState.NOT_SENT} mainFormBody={<>Form body</>}/>);

        await userEvent.click(screen.getByRole('button'));
        expect(mockOnSubmit).toHaveBeenCalled();
    })

    test('should show form content', () => {
        render(<GenericForm onSubmitForm={vi.fn()} errorAlertText="Error Text" buttonText="Submit"
                            requestState={RequestState.NOT_SENT} mainFormBody={<p>Form body</p>}/>);

        expect(screen.getByText('Form body')).toBeDefined();
        expect(screen.queryByRole('alert')).toBeNull();
    })

    test('should show error on error request state', () => {
        render(<GenericForm onSubmitForm={vi.fn()} errorAlertText="Error Text" buttonText="Submit"
                            requestState={RequestState.ERROR} mainFormBody={<>Form body</>}/>);

        expect(screen.getByText('Error Text')).toBeDefined();
    })

    test('should show loading bar on sending request state', () => {
        render(<GenericForm onSubmitForm={vi.fn()} errorAlertText="Error Text" buttonText="Submit"
                            requestState={RequestState.SENDING} mainFormBody={<>Form body</>}/>);

        expect(screen.getByRole('progressbar')).toBeDefined();
    })

    test('should show success message on success ', () => {
        render(<GenericForm onSubmitForm={vi.fn()} errorAlertText="Error Text" buttonText="Submit"
                            requestState={RequestState.SUCCESS} mainFormBody={<>Form body</>} successAlertText="success message"/>);

        expect(screen.getByText('success message')).toBeDefined();
    })
})
