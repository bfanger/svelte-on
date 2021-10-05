import { render, fireEvent } from "@testing-library/svelte";
import { tick } from "svelte";
import SvelteOn from "../lib/SvelteOn.svelte";
import Button from "./components/Button.svelte";

describe("SvelteOn", () => {
  it("should pass props to wrapped component", async () => {
    const { getByTestId, component } = render(SvelteOn, {
      label: "Click me",
      component: Button,
      on: {},
    });
    const el = getByTestId("button");
    expect(el.tagName).toBe("BUTTON");
    expect(el.textContent?.trim()).toBe("Click me");
    component.$set({ label: "New label" });
    await tick();
    expect(el.textContent?.trim()).toBe("New label");
  });

  it("should trigger handlers based on events", async () => {
    const listeners = {
      click: jest.fn(),
    };
    const { getByTestId, component } = render(SvelteOn, {
      component: Button,
      on: listeners,
    });
    fireEvent(getByTestId("button"), new MouseEvent("click"));
    expect(listeners.click).toBeCalledTimes(1);
    component.$set({ on: {} });
    await tick(); // it takes a tick before prop updates are processed
    fireEvent(getByTestId("button"), new MouseEvent("click"));
    expect(listeners.click).toBeCalledTimes(1);
  });
});
