import styled from "styled-components";
import { useEffect } from "preact/hooks";
import { musclues } from "../engine";
import { Exercises } from "../components/Exercises";
import { Canvas } from "../components/Canvas";
import { GlobalStyle } from "./globalStyle";
import "./normalize.css";

const StyledApp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const App = () => {
  useEffect(() => {
    musclues();
  }, []);

  return (
    <StyledApp>
      <GlobalStyle />
      <Canvas />
      <Exercises />
    </StyledApp>
  );
};
