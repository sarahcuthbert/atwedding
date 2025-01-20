import {expect, test} from 'vitest'
import {render, screen} from "@testing-library/react";
import {Home} from "./Home.tsx";


test('displays title', () => {
    render(<Home/>)

    expect(screen.getByRole("heading", {name: "Home"})).toBeDefined();
})
