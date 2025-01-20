import {expect, test} from 'vitest'
import {render, screen} from "@testing-library/react";
import {FAQ} from "./FAQ.tsx";


test('displays title', () => {
    render(<FAQ/>)

    expect(screen.getByRole("heading", {name: "FAQ"})).toBeDefined();
})
