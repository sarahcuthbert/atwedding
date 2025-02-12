import {expect, test} from 'vitest'
import {render, screen} from "@testing-library/react";
import {Footer} from "./Footer.tsx";

test('displays footer image and text', () => {
    render(<Footer/>)

    expect(screen.getByText("Made by the Maid of Honour")).toBeDefined();
    expect(screen.getByAltText("logo")).toBeDefined();
})