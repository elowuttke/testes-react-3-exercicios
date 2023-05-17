import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { bulbasaurMock } from "./bulbasaurMock";
import Pokecard from "../components/Pokecard";
import userEvent from "@testing-library/user-event";

jest.mock("axios");

const axiosResponseMock = {
  data: bulbasaurMock,
};

const urlMock = "mock-link";
const openModalMock = jest.fn();

describe("testes do componente Pokecard", () => {
  beforeEach(() => {
    axios.mockReset();
  });

  test("deve renderizar o Pokecard", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock);

    render(<Pokecard url={urlMock} openModal={openModalMock} />);

    //screen.debug();

    await waitFor(() => {});

    //screen.debug();

    //screen.logTestingPlaygroundURL();
  });

  test("deve renderizar os dados do Pokecard", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock);

    render(<Pokecard url={urlMock} openModal={openModalMock} />);

    //screen.debug();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /bulbasaur/i,
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("img", {
          name: /bulbasaur/i,
        })
      ).toBeInTheDocument();
      expect(screen.getByText(/grass/i)).toBeInTheDocument();
      expect(screen.getByText(/poison/i));
    });

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    //screen.debug();
  });

  test("deve disparar a função que habilita o modal quando o user clicar no card", async () => {
    const user = userEvent.setup();

    axios.get.mockResolvedValueOnce(axiosResponseMock);

    render(<Pokecard url={urlMock} openModal={openModalMock} />);

    await waitFor(() => {});

    //screen.logTestingPlaygroundURL();
    const bulbasaurCard = screen.getByRole("article");

    await user.click(bulbasaurCard);
    await user.click(bulbasaurCard);
    await user.click(bulbasaurCard);
    await user.click(bulbasaurCard);

    //Checa se a função foi chamada
    expect(openModalMock).toBeCalled();
    expect(openModalMock).toHaveBeenCalled();

    //Garante que foi chamada 4x
    expect(openModalMock).toBeCalledTimes(4);
    expect(openModalMock).toHaveBeenCalledTimes(4);

    expect(openModalMock).toBeCalledWith(axiosResponseMock.data);
    expect(openModalMock).toHaveReturned();
  });
});
