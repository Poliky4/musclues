import { Engine } from "babylonjs";
import { createScene } from "./scene";

export const musclues = () => {
  const canvas = document.getElementsByTagName("canvas")[0];

  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });

  const scene = createScene(engine, canvas);
  // scene.debugLayer.show();

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });
};
