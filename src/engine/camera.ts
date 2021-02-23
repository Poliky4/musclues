import { ArcRotateCamera, Camera, Scene, Vector3 } from "babylonjs";
import { totalHeight } from "./model";

interface Props {
  scene: Scene;
  canvas: HTMLCanvasElement;
}

export const makeCamera = ({ scene, canvas }: Props) => {
  const primaryCamera = makePrimaryCamera({ scene, canvas });
  const secondaryCamera = makeSecondaryCamera({ scene, canvas });

  scene.activeCamera = secondaryCamera;

  const switchCamera = (camera?: Camera) => {
    if (camera) {
      scene.activeCamera = camera;
    } else if (scene.activeCamera === primaryCamera) {
      scene.activeCamera = secondaryCamera;
    } else {
      scene.activeCamera = primaryCamera;
    }
  };

  return { primaryCamera, secondaryCamera, switchCamera };
};

function makePrimaryCamera({ scene, canvas }: Props) {
  const camera = new ArcRotateCamera(
    "camera",
    0,
    0,
    10,
    new Vector3(0, (totalHeight / 3) * 2, 0),
    scene
  );
  camera.setPosition(new Vector3(0, totalHeight / 2, -60));
  camera.attachControl(canvas, true);

  return camera;
}

function makeSecondaryCamera({ scene }: Props) {
  const camera = new ArcRotateCamera(
    "camera",
    0,
    0,
    10,
    new Vector3(0, (totalHeight / 3) * 2, 0),
    scene
  );
  camera.setPosition(new Vector3(0, totalHeight / 2, -60));
  camera.useAutoRotationBehavior = true;

  return camera;
}
