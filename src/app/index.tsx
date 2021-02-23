import { useEffect, useRef, useState } from "preact/hooks";
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
  const { allExercises, resetModel, switchCamera } = useMusclues(onClick);
  const [exercises, setExercises] = useState<Exercise[]>([]); // move to context?
  const previousPathRef = useRef(getCurrentUrl());

  function onClick(meshName: string) {
    setExercises(allExercises.filter((e) => e.bodyParts.includes(meshName)));
  }

  const onRouteChange = () => {
    const previousPath = previousPathRef.current;
    const currentPath = getCurrentUrl();
    previousPathRef.current = currentPath;

    if (currentPath !== previousPath) {
      resetModel();

      if (currentPath === "/explore" || previousPath === "/explore") {
        switchCamera();
      }
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
