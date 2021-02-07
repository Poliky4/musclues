import * as b from "babylonjs";
import { totalHeight } from "./data";
import { makeMaterials } from "./materials";
import { makeModel } from "./model";

export const musclues = () => {
  const canvas = document.getElementsByTagName("canvas")[0];

  const engine = new b.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });

  // <Init>
  let mats = {};
  const scene = createScene();

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });
  // </Init>

  function createScene() {
    const scene = new b.Scene(engine);
    // scene.debugLayer.show();

    mats = makeMaterials(scene);

    const camera = new b.ArcRotateCamera(
      "camera",
      0,
      0,
      10,
      new b.Vector3(0, (totalHeight / 3) * 2, 0),
      scene
    );
    camera.setPosition(new b.Vector3(0, totalHeight / 2, -40));
    camera.attachControl(canvas, true);

    const light_hemispheric = new b.HemisphericLight(
      "light_hemispheric",
      new b.Vector3(0, 1, 0),
      scene
    );
    light_hemispheric.intensity = 0.2;
    var light_spot = new b.SpotLight(
      "light_spot",
      new b.Vector3(20, 40, -20),
      new b.Vector3(-4, -5, 4),
      Math.PI / 3,
      2,
      scene
    );
    const shadow_generator_light_spot = new b.ShadowGenerator(1024, light_spot);
    const light_spot_box = b.MeshBuilder.CreateBox(
      "light_spot_box",
      {
        height: 0.1,
        width: 0.1,
        depth: 0.1,
      },
      scene
    );
    light_spot_box.position = light_spot.position;

    const { model } = makeModel(scene, mats);
    camera.lockTarget = model;
    shadow_generator_light_spot.addShadowCaster(model);
    console.log("model: ", model);

    return scene;
  }
  const ground = b.MeshBuilder.CreateGround(
    "ground",
    {
      width: 150,
      height: 150,
    },
    scene
  );
  ground.receiveShadows = true;
};
