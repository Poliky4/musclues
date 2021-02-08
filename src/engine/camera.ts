import { ArcRotateCamera, Mesh, Scene, Vector3 } from "babylonjs";
import { totalHeight } from "./model";

export const makeCamera = (
  scene: Scene,
  canvas: HTMLCanvasElement,
  model: Mesh
) => {
  const camera = new ArcRotateCamera(
    "camera",
    0,
    0,
    10,
    new Vector3(0, (totalHeight / 3) * 2, 0),
    scene
  );
  camera.setPosition(new Vector3(0, totalHeight / 2, -40));
  camera.attachControl(canvas, true);
  camera.lockTarget = model;

  return camera;
};
