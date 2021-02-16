import { useState } from "preact/hooks";
import { getCurrentUrl, Route, Router } from "preact-router";
import styled from "styled-components";
import { Canvas } from "../components/Canvas";
import { GlobalStyle } from "./globalStyle";
import { useMusclues } from "../engine";
import { Exercise } from "../engine/animation";
import { Home } from "../views/Home";
import { Explore } from "../views/Explore";
import { Workouts } from "../views/Workouts";
import { HomeLink } from "../components/HomeLink";
import "./normalize.css";

export const App = () => {
  const { allExercises, resetCamera } = useMusclues(onClick);
  const [exercises, setExercises] = useState<Exercise[]>([]); // move to context?

  function onClick(meshName: string) {
    setExercises(allExercises.filter((e) => e.bodyParts.includes(meshName)));
  }

  const previousPath = getCurrentUrl();
  const onRouteChange = () => {
    const currentPath = getCurrentUrl();
    if (currentPath !== previousPath) {
      resetCamera();
    }
  };

  return (
    <StyledApp>
      <GlobalStyle />
      <Canvas />

      <Router onChange={onRouteChange}>
        <Route path="/explore" component={Explore} exercises={exercises} />
        <Route path="/workouts" component={Workouts} />
        <Route path="/" component={Home} />
      </Router>

      <HomeLink />
    </StyledApp>
  );
};

const StyledApp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
