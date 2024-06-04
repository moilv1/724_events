import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";
import { fireEvent } from '@testing-library/react';

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("Slider", () => {
  it("pauses and resumes slider when spacebar is pressed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    // Vérifie que le slider commence à jouer
    const initialTitle = await screen.findByText("World economic forum");

    // Simule la pression de la barre d'espace pour mettre en pause le slider
    fireEvent.keyDown(window, { key: " ", code: "Space" });

    // Vérifie que le slider est en pause
    const pausedTitle = await screen.findByText("World economic forum");
    expect(pausedTitle).toEqual(initialTitle);

    // Simule à nouveau la pression de la barre d'espace pour reprendre le slider
    fireEvent.keyDown(window, { key: " ", code: "Space" });

    // Vérifie que le slider a repris la lecture
    await screen.findByText("World Gaming Day");
    await screen.findByText("World Farming Day");
  });
});