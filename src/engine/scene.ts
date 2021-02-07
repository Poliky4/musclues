import { Engine, Scene } from "babylonjs";
import { makeCamera } from "./camera";
import { makeGround } from "./ground";
import { makeLights } from "./lights";
import { makeModel } from "./model";

export function createScene(engine: Engine, canvas: HTMLCanvasElement) {
  const scene = new Scene(engine);

  const { model } = makeModel(scene);
  makeCamera(scene, canvas, model);
  makeLights(scene, model);
  makeGround(scene);

  return scene;
}
