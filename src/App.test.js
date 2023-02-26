import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import emojiList from "./emojiList.json";
import App from "./App";

describe("Emoji Search Tests", () => {
  let header, emoji, input;
  let filterList;

  beforeEach(() => {
    render(<App />);
  });

  /* Baslik testi */
  test("header test", () => {
    header = screen.getByText(/Emoji Search/i);
    expect(header).toBeInTheDocument;
    const images = screen.getAllByRole("img");
    expect(images[0]);
    expect(images[1]);
  });

  /* Emoji listesi testi */
  test("emoji list control", () => {
    emoji = emojiList.slice(0, 19);

    emoji.map((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument;
    });
  });

  /* Emoji listesi filtreleme testi */
  test("emoji list filter", () => {
    input = screen.getByRole("textbox"); // input'a ulaşalım
    const filter = "smile cat";
    filterList = emojiList.filter(
      (it) =>
        it.keywords.toLowerCase().match(filter) ||
        it.title.toLowerCase().match(filter)
    );
    fireEvent.change(input, { target: { value: filter } });
    expect(screen.getAllByText(/cat/i)).toHaveLength(2);
  });

  /* Emoji listesindeki emojiye tıklama testi */
  test("after click emoji", async () => {
    const click = screen.getByText("100");
    expect(
      click.parentElement.getAttribute("data-clipboard-text").length
    ).toBeGreaterThan(0);
    console.log(click.parentElement.getAttribute("data-clipboard-text"));
    expect(click.parentElement.getAttribute("data-clipboard-text")).toMatch(
      "💯"
    );
  });
});
