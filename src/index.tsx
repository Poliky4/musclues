import { render } from "preact";
import styled from "styled-components";
import { useEffect } from "preact/hooks";
import { musclues } from "./engine";
import { Exercises } from "./components/Exercises";
import { GlobalStyle } from "./globalStyle";
import { Canvas } from "./components/Canvas";

const StyledApp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const App = () => {
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

render(<App />, document.body);
