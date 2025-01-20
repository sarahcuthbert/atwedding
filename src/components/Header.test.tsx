import {expect, test} from 'vitest'
import {render, screen} from "@testing-library/react";
import {Header} from "./Header.tsx";
import { MemoryRouter} from "react-router-dom";
import {userEvent} from "@testing-library/user-event";

test('displays title and tabs', () => {
    render(<MemoryRouter>
        <Header/>
    </MemoryRouter>)

    expect(screen.getByText("Amy & Tristan")).toBeDefined();
    expect(screen.getByRole("tab", {name: "Home"})).toBeDefined();
    expect(screen.getByRole("tab", {name: "Event Details"})).toBeDefined();
    expect(screen.getByRole("tab", {name: "Schedule"})).toBeDefined();
    expect(screen.getByRole("tab", {name: "RSVP"})).toBeDefined();
    expect(screen.getByRole("tab", {name: "FAQ"})).toBeDefined();
})

test('selects tab when clicked', async () => {
    render(<MemoryRouter>
        <Header/>
    </MemoryRouter>)

    expect(screen.getByRole("tab", {name: "Event Details"}).ariaSelected).toBe('false');
    expect(screen.getByRole("tab", {name: "Home"}).ariaSelected).toBe('true');

    await userEvent.click(screen.getByRole("tab", {name: "Event Details"}))
    expect(screen.getByRole("tab", {name: "Event Details"}).ariaSelected).toBe('true');
    expect(screen.getByRole("tab", {name: "Home"}).ariaSelected).toBe('false');
})

test('loads tab from path', async () => {
    render(<MemoryRouter initialEntries={["/faq"]}>
        <Header/>
    </MemoryRouter>)

    expect(screen.getByRole("tab", {name: "FAQ"}).ariaSelected).toBe('true');
    expect(screen.getByRole("tab", {name: "Home"}).ariaSelected).toBe('false');
})