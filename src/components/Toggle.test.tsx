import React from "react";
import Toggle from "./Toggle";
import { render, screen, fireEvent } from "@testing-library/react";

test("setStatus lors de la création de la ville", () => {
    const activate = jest.fn();
    render(<Toggle setStatus={activate} />);
    const activeBtn = screen.getByTestId("activate-btn");
    fireEvent.click(activeBtn);
    expect(activate.mock.lastCall).toBeTruthy;
    const unactiveBtn = screen.getByTestId("desactivate-btn");
    fireEvent.click(unactiveBtn);
    expect(activate.mock.lastCall).toBeFalsy;
})

test("check status par défaut sur false", () => {
    const activate = jest.fn();
    render(<Toggle setStatus={activate} />);
    const unactiveBtn = screen.getByTestId("desactivate-btn");
    fireEvent.click(unactiveBtn);
    expect(activate.mock.lastCall).toBeTruthy;
})
