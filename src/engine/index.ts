import { Engine, Scene } from "babylonjs";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { Exercise, makeAnimation } from "./animation";
import { makeCamera } from "./camera";
import { makeGround } from "./ground";
import { makeLights } from "./lights";
import { makeModel } from "./model";

export const useMusclues = (onClick: (meshName?: string) => void) => {
  const [scene, setScene] = useState<Scene>(null);
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const switchCameraRef = useRef<() => void>();
  const switchCamera = () => switchCameraRef.current?.();

  useEffect(() => {
    const { scene, exercises, switchCamera } = musclues();
    scene.activeCamera.storeState();

    switchCameraRef.current = switchCamera;
    setScene(scene);
    setAllExercises(exercises);
  }, []);

  useEffect(() => {
    if (!scene) return;

    scene.onPointerPick = (_, pick) => {
      if (pick.hit) {
        onClick(pick.pickedMesh.name);
      }
    };
  }, [scene, onClick]);

  const resetModel = () => {
    const stop = allExercises.find((e) => e.name === "Stop");
    const rest = allExercises.find((e) => e.name === "Rest");
    stop?.thing();
    setTimeout(() => {
      rest?.thing();
    }, 999);
  };

  return {
    allExercises,
    resetModel,
    switchCamera
  };
};

const musclues = () => {
  const canvas = document.getElementsByTagName("canvas")[0];

  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });

  const scene = new Scene(engine);
  // scene.debugLayer.show();

  const model = makeModel(scene);
  const exercises = makeAnimation(model);
  const { primaryCamera, secondaryCamera, switchCamera } = makeCamera({
    scene,
    canvas,
  });
  makeLights(scene, model.origin);
  makeGround(scene);

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });

  return {
    scene,
    exercises,
    switchCamera,
  };
};
