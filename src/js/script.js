import * as b from "babylonjs";

const canvas = document.getElementsByTagName("canvas")[0];

const engine = new b.Engine(canvas, true, {
  preserveDrawingBuffer: true,
  stencil: true,
});

const foot_height = 1;
const lower_leg_height = 6;
const upper_leg_height = 6;
const torso_height = 10;
const torso_width = 6;
const neck_height = 0.5;
const head_height = 4;
const upper_arm_height = 4;
const lower_arm_height = 4;
const hand_height = 1;

const padding = 0.5;

const sum = (arr) => arr.reduce((a, b) => a + b, 0);
const totalHeight = sum([
  foot_height,
  lower_leg_height,
  upper_leg_height,
  torso_height,
  neck_height,
  head_height,
]);

const origin_height =
  foot_height + lower_leg_height + upper_leg_height + padding * 3;

// <Init>
const mats = {};
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
  scene.debugLayer.show();

  mats.transparent = makeTransparentMaterial(scene);
  mats.origin = makeOriginMaterial(scene);

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

  const { dude } = makeDude(scene);
  camera.lockTarget = dude;
  shadow_generator_light_spot.addShadowCaster(dude);
  console.log("dude: ", dude);

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

function makeTransparentMaterial(scene) {
  const mat = new b.StandardMaterial("mat_transparent", scene);
  // mat.alpha = 0.5

  return mat;
}

function makeOriginMaterial(scene) {
  const mat = new b.StandardMaterial("mat_origin", scene);
  mat.diffuseColor = b.Color3.Red();
  mat.alpha = 0;

  return mat;
}

function makeDude(scene) {
  const origin = b.MeshBuilder.CreateBox(
    "origin",
    {
      height: 0.01,
      width: 0.01,
      depth: 0.01,
    },
    scene
  );
  origin.material = mats.origin;
  origin.position.y = origin_height;

  const torso = b.MeshBuilder.CreateBox(
    "torso",
    {
      height: torso_height,
      width: torso_width,
      depth: 2,
    },
    scene
  );
  torso.parent = origin;
  torso.material = mats.transparent;
  torso.setPivotMatrix(b.Matrix.Translation(0, torso_height / 2, 0), false);

  const neck = b.MeshBuilder.CreateBox(
    "neck",
    {
      height: neck_height,
      width: 1,
      depth: 1,
    },
    scene
  );
  neck.material = mats.transparent;
  neck.parent = torso;
  neck.position.y = torso_height / 2 + neck_height / 2;

  const head = b.Mesh.CreateSphere(
    "head",
    16,
    head_height,
    scene,
    false,
    b.Mesh.FRONTSIDE
  );
  head.material = mats.transparent;
  head.parent = neck;
  head.position.y = head_height / 2 + neck_height / 2;

  const upper_leg_l = b.MeshBuilder.CreateBox(
    "upper_leg_l",
    {
      height: upper_leg_height,
      width: 2,
      depth: 2,
    },
    scene
  );
  upper_leg_l.material = mats.transparent;
  upper_leg_l.parent = origin;
  upper_leg_l.position.x = torso_width / 2 - 1;
  upper_leg_l.position.y = -padding;
  upper_leg_l.setPivotMatrix(
    b.Matrix.Translation(0, -upper_leg_height / 2, 0),
    false
  );

  const lower_leg_l = b.MeshBuilder.CreateBox(
    "lower_leg_l",
    {
      height: lower_leg_height,
      width: 2,
      depth: 2,
    },
    scene
  );
  lower_leg_l.material = mats.transparent;
  lower_leg_l.parent = upper_leg_l;
  lower_leg_l.position.y = -(upper_leg_height + 0.5 - lower_leg_height / 2);
  lower_leg_l.setPivotMatrix(
    b.Matrix.Translation(0, -lower_leg_height / 2, 0),
    false
  );

  const foot_l = b.MeshBuilder.CreateBox(
    "foot_l",
    {
      height: foot_height,
      width: 2,
      depth: 5,
    },
    scene
  );
  foot_l.material = mats.transparent;
  foot_l.parent = lower_leg_l;
  foot_l.position.y = -(lower_leg_height / 2 + 1);
  foot_l.setPivotMatrix(
    b.Matrix.Translation(
      0,
      0,
      -(5 / 2 - 1) // -1 = half leg thickness
    ),
    false
  );

  const upper_leg_r = b.MeshBuilder.CreateBox(
    "upper_leg_r",
    {
      height: upper_leg_height,
      width: 2,
      depth: 2,
    },
    scene
  );
  upper_leg_r.material = mats.transparent;
  upper_leg_r.parent = origin;
  upper_leg_r.position.x = -(torso_width / 2 - 1);
  upper_leg_r.position.y = -padding;
  upper_leg_r.setPivotMatrix(
    b.Matrix.Translation(0, -upper_leg_height / 2, 0),
    false
  );

  const lower_leg_r = b.MeshBuilder.CreateBox(
    "lower_leg_r",
    {
      height: lower_leg_height,
      width: 2,
      depth: 2,
    },
    scene
  );
  lower_leg_r.material = mats.transparent;
  lower_leg_r.parent = upper_leg_r;
  lower_leg_r.position.y = -(upper_leg_height + 0.5 - lower_leg_height / 2);
  lower_leg_r.setPivotMatrix(
    b.Matrix.Translation(0, -lower_leg_height / 2, 0),
    false
  );

  const foot_r = b.MeshBuilder.CreateBox(
    "foot_r",
    {
      height: foot_height,
      width: 2,
      depth: 5,
    },
    scene
  );
  foot_r.material = mats.transparent;
  foot_r.parent = lower_leg_r;
  foot_r.position.y = -(lower_leg_height / 2 + 1);
  foot_r.setPivotMatrix(
    b.Matrix.Translation(
      0,
      0,
      -(5 / 2 - 1) // -1 = half leg thickness
    ),
    false
  );

  const upper_arm_l = b.MeshBuilder.CreateBox(
    "upper_arm_l",
    {
      height: 1.5,
      width: upper_arm_height,
      depth: 1.5,
    },
    scene
  );
  upper_arm_l.material = mats.transparent;
  upper_arm_l.parent = torso;
  upper_arm_l.position.y = torso_height / 2 - 0.75;
  upper_arm_l.position.x =
    torso_width / 2 + upper_arm_height / 2 + 0.5 - upper_arm_height / 2;
  upper_arm_l.setPivotMatrix(
    b.Matrix.Translation(upper_arm_height / 2, 0, 0),
    false
  );

  const lower_arm_l = b.MeshBuilder.CreateBox(
    "lower_arm_l",
    {
      height: 1.5,
      width: lower_arm_height,
      depth: 1.5,
    },
    scene
  );
  lower_arm_l.material = mats.transparent;
  lower_arm_l.parent = upper_arm_l;
  lower_arm_l.position.x = upper_arm_height + 0.5 - lower_arm_height / 2;
  lower_arm_l.setPivotMatrix(
    b.Matrix.Translation(lower_arm_height / 2, 0, 0),
    false
  );

  const hand_l = b.MeshBuilder.CreateBox(
    "hand_l",
    {
      height: 1.5,
      width: hand_height,
      depth: 1.5,
    },
    scene
  );
  hand_l.material = mats.transparent;
  hand_l.parent = lower_arm_l;
  hand_l.position.x = lower_arm_height + 0.5 - 1.5;

  const upper_arm_r = b.MeshBuilder.CreateBox(
    "upper_arm_r",
    {
      height: 1.5,
      width: upper_arm_height,
      depth: 1.5,
    },
    scene
  );
  upper_arm_r.material = mats.transparent;
  upper_arm_r.parent = torso;
  upper_arm_r.position.y = torso_height / 2 - 0.75;
  upper_arm_r.position.x = -(torso_width / 2 + 0.5);
  upper_arm_r.setPivotMatrix(
    b.Matrix.Translation(-upper_arm_height / 2, 0, 0),
    false
  );

  const lower_arm_r = b.MeshBuilder.CreateBox(
    "lower_arm_r",
    {
      height: 1.5,
      width: lower_arm_height,
      depth: 1.5,
    },
    scene
  );
  lower_arm_r.material = mats.transparent;
  lower_arm_r.parent = upper_arm_r;
  lower_arm_r.position.x = -(upper_arm_height + 0.5 - lower_arm_height / 2);
  lower_arm_r.setPivotMatrix(
    b.Matrix.Translation(-lower_arm_height / 2, 0, 0),
    false
  );

  const hand_r = b.MeshBuilder.CreateBox(
    "hand_r",
    {
      height: 1.5,
      width: hand_height,
      depth: 1.5,
    },
    scene
  );
  hand_r.material = mats.transparent;
  hand_r.parent = lower_arm_r;
  hand_r.position.x = -(lower_arm_height + 0.5 - 1.5);

  const meshMap = {
    torso: torso,
    shoulder_l: upper_arm_l,
    elbow_l: lower_arm_l,
    shoulder_r: upper_arm_r,
    elbow_r: lower_arm_r,
    hip_r: upper_leg_r,
    knee_r: lower_leg_r,
    foot_r,
    hip_l: upper_leg_l,
    knee_l: lower_leg_l,
    foot_l,
  };

  const rotateMesh = (meshName, rotation) => {
    if (!meshMap[meshName]) return console.warn("Unknown mesh:", meshName);
    rotate(meshMap[meshName], rotation);
    return meshMap[meshName].rotation;
  };
  window.rotateMesh = rotateMesh;
  const setRotationMesh = (meshName, rotation) => {
    if (!meshMap[meshName]) return console.warn("Unknown mesh:", meshName);
    setRotation(meshMap[meshName], rotation);
  };
  window.setRotationMesh = setRotationMesh;

  const FPS = 30;
  const animationDurationMs = 600;
  const frames = (FPS / 1000) * animationDurationMs;
  const frameDuration = animationDurationMs / frames;
  const playAnimation = (to, from) => {
    if (!from) from = getCurrentPose();

    const steps = getSteps(from, to, frames);
    playSteps(steps, frames, frameDuration);
  };
  function applyPose(pose) {
    Object.entries(pose).forEach(([name, rotation]) => {
      switch (name) {
        case "height": {
          origin.position.y = rotation.y;
          break;
        }
        default: {
          setRotationMesh(name, rotation);
          break;
        }
      }
    });
  }
  function playSteps(steps, frames, frameDuration) {
    let i = 0;
    const intervalId = setInterval(() => {
      applyPose(steps[i++]);
      if (i === frames) clearInterval(intervalId);
    }, frameDuration);
  }
  function getSteps(from, to, frames) {
    return Array(frames)
      .fill()
      .map((_, i) => {
        const step = {};

        Object.entries(to).forEach(([name, rotation]) => {
          step[name] = {
            x: getStep(from[name].x, rotation.x, i + 1) ?? from[name].x,
            y: getStep(from[name].y, rotation.y, i + 1) ?? from[name].y,
            z: getStep(from[name].z, rotation.z, i + 1) ?? from[name].z,
          };
        });

        return step;
      });
  }
  function getStep(from, to, i) {
    const difference = (to ?? 0) - from;
    const increment = (difference / frames) * i;
    return from + increment;
  }

  function getCurrentPose() {
    return {
      height: { y: origin.position.y },
      torso: getMeshRotation(torso),
      shoulder_l: getMeshRotation(upper_arm_l),
      elbow_l: getMeshRotation(lower_arm_l),
      shoulder_r: getMeshRotation(upper_arm_r),
      elbow_r: getMeshRotation(lower_arm_r),
      hip_r: getMeshRotation(upper_leg_r),
      knee_r: getMeshRotation(lower_leg_r),
      foot_r: getMeshRotation(foot_r),
      hip_l: getMeshRotation(upper_leg_l),
      knee_l: getMeshRotation(lower_leg_l),
      foot_l: getMeshRotation(foot_l),
    };
  }
  function getMeshRotation(mesh) {
    const { x, y, z } = mesh.rotation;
    return { x, y, z };
  }

  const poses = makePoses();
  applyPose(poses.rest);
  repeatReverse(poses.wave_end, poses.wave_start);
  // applyPose(poses.squat_end)
  // repeatReverse(poses.squat_end, poses.squat_start)
  // repeatReverse(poses.pushup_start, poses.pushup_end)

  function repeatReverse(start, end, duration = animationDurationMs) {
    let flip = true;
    setInterval(() => {
      if (flip) playAnimation(start);
      else playAnimation(end);
      flip = !flip;
    }, duration);
  }

  return {
    dude: origin,
    applyPose,
    playAnimation,
  };
}

export function setRotation(mesh, rotation) {
  mesh.rotation.x = rotation.x ?? mesh.rotation.x;
  mesh.rotation.y = rotation.y ?? mesh.rotation.y;
  mesh.rotation.z = rotation.z ?? mesh.rotation.z;
}

export function rotate(mesh, rotation) {
  mesh.rotation.x += rotation.x ?? 0;
  mesh.rotation.y += rotation.y ?? 0;
  mesh.rotation.z += rotation.z ?? 0;
}

export function setPosition(mesh, position) {
  mesh.position.x = position.x ?? mesh.position.x;
  mesh.position.y = position.y ?? mesh.position.y;
  mesh.position.z = position.z ?? mesh.position.z;
}

export function position(mesh, position) {
  mesh.position.x += position.x ?? 0;
  mesh.position.y += position.y ?? 0;
  mesh.position.z += position.z ?? 0;
}

/**
 * height: { y: y pos for origin }
 * torso { x: forward/back, y: rot, z: left/right }
 * shoulder { x: rot, y: forward/back , z: up/down}
 * elbow { y }
 * hip { x: forward/back, y: rot, z: left/right }
 * knee { x }
 * foot { x }
 */
function makePoses() {
  return {
    zero: {
      height: { y: origin_height },
      torso: { x: 0, y: 0, z: 0 },
      shoulder_l: { x: 0, y: 0, z: 0 },
      elbow_l: { y: 0 },
      shoulder_r: { x: 0, y: 0, z: 0 },
      elbow_r: { y: 0 },
      hip_l: { x: 0, y: 0, z: 0 },
      knee_l: { x: 0 },
      hip_r: { x: 0, y: 0, z: 0 },
      knee_r: { x: 0 },
    },
    rest: {
      height: { y: origin_height },
      shoulder_l: { x: -0.2, y: 0.4, z: -1.55 },
      elbow_l: { y: 0.4 },
      shoulder_r: { x: -0.2, y: -0.4, z: 1.55 },
      elbow_r: { y: -0.4 },
      hip_l: { x: 0.1, y: -0.2 },
      knee_l: { x: -0.1 },
      hip_r: { x: 0.1, y: 0.2 },
      knee_r: { x: -0.1 },
    },
    wave_start: {
      height: { y: origin_height },
      shoulder_l: { x: 2.4, y: -1.4, z: -1.55 },
      elbow_l: { y: 0 },
      shoulder_r: { x: -0.2, y: -0.4, z: 1.55 },
      elbow_r: { y: -0.4 },
      hip_l: { x: 0.1, y: -0.2 },
      knee_l: { x: -0.1 },
      hip_r: { x: 0.1, y: 0.2 },
      knee_r: { x: -0.1 },
    },
    wave_end: {
      height: { y: origin_height },
      shoulder_l: { x: 3, y: -1.4, z: -1.55 },
      elbow_l: { y: 1 },
      shoulder_r: { x: -0.2, y: -0.4, z: 1.55 },
      elbow_r: { y: -0.4 },
      hip_l: { x: 0.1, y: -0.2 },
      knee_l: { x: -0.1 },
      hip_r: { x: 0.1, y: 0.2 },
      knee_r: { x: -0.1 },
    },
    pushup_start: {
      height: { y: origin_height },
      torso: { x: -1.55 },
      shoulder_l: { x: -1.2, y: 0.2, z: -1.6 },
      elbow_l: { y: 2.7 },
      shoulder_r: { x: -1.2, y: -0.2, z: 1.6 },
      elbow_r: { y: -2.7 },
      hip_l: { x: -1.55 },
      knee_l: { x: 0 },
      hip_r: { x: -1.55 },
      knee_r: { x: 0 },
    },
    pushup_end: {
      height: { y: origin_height },
      torso: { x: -1.55 },
      shoulder_l: { x: 1.6, y: 0, z: -1.6 },
      elbow_l: { y: 0 },
      shoulder_r: { x: 1.6, y: 0, z: 1.6 },
      elbow_r: { y: 0 },
      hip_l: { x: -1.55 },
      knee_l: { x: 0 },
      hip_r: { x: -1.55 },
      knee_r: { x: 0 },
    },
    squat_start: {
      height: { y: origin_height },
      torso: { x: 0, y: 0, z: 0 },
      shoulder_l: { x: -0.4, y: 0.6, z: -1.4 },
      elbow_l: { y: 1.3 },
      shoulder_r: { x: -0.4, y: -0.6, z: 1.4 },
      elbow_r: { y: -1.3 },
      hip_l: { x: 0.1, y: -0.2 },
      knee_l: { x: -0.1 },
      foot_l: { x: 0 },
      hip_r: { x: 0.1, y: 0.2 },
      knee_r: { x: -0.1 },
      foot_r: { x: 0 },
    },
    squat_end: {
      height: { y: 5 },
      torso: { x: -0.1, y: 0, z: 0 },
      shoulder_l: { x: -0.4, y: 0.6, z: -1.4 },
      elbow_l: { y: 1.3 },
      shoulder_r: { x: -0.4, y: -0.6, z: 1.4 },
      elbow_r: { y: -1.3 },
      hip_l: { x: 1.7, y: -0.2 },
      knee_l: { x: -2.5 },
      foot_l: { x: 0.8 },
      hip_r: { x: 1.7, y: 0.2 },
      knee_r: { x: -2.5 },
      foot_r: { x: 0.8 },
    },
  };
}
