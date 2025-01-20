import {expect, test} from 'vitest'
import {render, screen} from "@testing-library/react";
import {RSVP} from "./RSVP.tsx";


test('displays title', () => {
    render(<RSVP/>)

    expect(screen.getByRole("heading", {name: "RSVP"})).toBeDefined();
})
