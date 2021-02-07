import {
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Scene,
  ShadowGenerator,
  SpotLight,
  Vector3,
} from "babylonjs";

export const makeLights = (scene: Scene, model: Mesh) => {
  const light_hemispheric = new HemisphericLight(
    "light_hemispheric",
    new Vector3(0, 1, 0),
    scene
  );
  light_hemispheric.intensity = 0.2;

  var light_spot = new SpotLight(
    "light_spot",
    new Vector3(20, 40, -20),
    new Vector3(-4, -5, 4),
    Math.PI / 3,
    2,
    scene
  );

  const shadow_generator_light_spot = new ShadowGenerator(1024, light_spot);
  shadow_generator_light_spot.addShadowCaster(model);

  const light_spot_box = MeshBuilder.CreateBox(
    "light_spot_box",
    {
      height: 0.1,
      width: 0.1,
      depth: 0.1,
    },
    scene
  );
  light_spot_box.position = light_spot.position;
};
