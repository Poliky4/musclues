import styled from "styled-components";
import { Canvas } from "../components/Canvas";
import { Exercises } from "../components/Exercises";
import { MuscluesContextProvider } from "./muscluesContext";
import { GlobalStyle } from "./globalStyle";
import "./normalize.css";

const StyledApp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const App = () => (
  <StyledApp>
    <GlobalStyle />

    <Canvas />

    <MuscluesContextProvider>
      <Exercises />
    </MuscluesContextProvider>
  </StyledApp>
);
