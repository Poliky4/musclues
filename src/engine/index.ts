import { Engine, Scene } from "babylonjs";
import { useEffect, useState } from "preact/hooks";
import { Exercise, makeAnimation } from "./animation";
import { makeCamera } from "./camera";
import { makeGround } from "./ground";
import { makeLights } from "./lights";
import { makeModel } from "./model";

export const useMusclues = (onClick: (meshName?: string) => void) => {
  const [scene, setScene] = useState<Scene>(null);
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const { scene, exercises } = musclues();

    setScene(scene);
    setAllExercises(exercises);
  }, []);

  useEffect(() => {
    if (!scene) return;

    scene.onPointerPick = (e, pick) => {
      if (pick.hit) {
        onClick(pick.pickedMesh.name);
      }
    };
  }, [onClick]);

  return {
    allExercises,
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
  makeCamera(scene, canvas);
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
  };
};
