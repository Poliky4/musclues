import { useState } from "preact/hooks";
import styled from "styled-components";
import { Canvas } from "../components/Canvas";
import { Exercises } from "../components/Exercises";
import { GlobalStyle } from "./globalStyle";
import { useMusclues } from "../engine";
import { Exercise } from "../engine/animation";
import "./normalize.css";

export const App = () => {
  const { allExercises } = useMusclues(onClick);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  function onClick(meshName: string) {
    setExercises(allExercises.filter((e) => e.bodyParts.includes(meshName)));
  }

  return (
    <StyledApp>
      <GlobalStyle />

      <Canvas />

      <Exercises exercises={exercises} />
    </StyledApp>
  );
};

const StyledApp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
