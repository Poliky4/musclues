import { Scene, StandardMaterial, Color3, Material } from "babylonjs";

interface Mats {
  [key: string]: Material;
}

let mats: Mats;
export const makeMaterials = (scene: Scene) => {
  if (!mats) {
    mats = {
      transparent: makeTransparentMaterial(scene),
      origin: makeOriginMaterial(scene),
    };
  }

  return mats;
};

function makeTransparentMaterial(scene: Scene) {
  const mat = new StandardMaterial("mat_transparent", scene);
  // mat.alpha = 0.5

  return mat;
}

function makeOriginMaterial(scene: Scene) {
  const mat = new StandardMaterial("mat_origin", scene);
  mat.diffuseColor = Color3.Red();
  mat.alpha = 0;

  return mat;
}
