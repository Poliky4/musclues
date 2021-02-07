import { Engine, Scene } from "babylonjs";
import { makeCamera } from "./camera";
import { makeGround } from "./ground";
import { makeLights } from "./lights";
import { makeModel } from "./model";

export const musclues = () => {
  const canvas = document.getElementsByTagName("canvas")[0];

  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });

  const scene = new Scene(engine);
  // scene.debugLayer.show();

  const { model, exercises } = makeModel(scene);
  makeCamera(scene, canvas, model);
  makeLights(scene, model);
  makeGround(scene);

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });

  return {
    exercises,
  };
};
