import { MeshBuilder, Scene } from "babylonjs";

export const makeGround = (scene: Scene) => {
  const ground = MeshBuilder.CreateGround(
    "ground",
    {
      width: 150,
      height: 150,
    },
    scene
  );
  ground.receiveShadows = true;
};
