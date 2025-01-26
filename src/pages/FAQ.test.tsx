import {expect, test} from 'vitest'
import {render, screen} from "@testing-library/react";
import {FAQ} from "./FAQ.tsx";


test('displays title and FAQ options', () => {
    render(<FAQ/>)

    expect(screen.getByRole("heading", {name: "Frequently Asked Questions"})).toBeDefined();
    expect(screen.getAllByRole("heading", {name: "What should I wear?"})).toBeDefined();
    expect(screen.getAllByRole("heading")).toHaveLength(4);
})
