import {expect, test, describe} from 'vitest'
import {render, screen} from "@testing-library/react";
import {QuestionAndAnswer} from "./QuestionAndAnswer.tsx";

describe('QuestionAndAnswer', () => {
    test('displays question and answer', async () => {
        render(<QuestionAndAnswer question="A question" answer="An answer" name="name"/>)

        expect(screen.getByRole("heading", {name: "A question"})).toBeDefined();
        expect(screen.getByText("An answer")).toBeDefined();
    })

})