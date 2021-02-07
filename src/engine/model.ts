import * as b from "babylonjs";
import {
  foot_height,
  hand_height,
  head_height,
  lower_arm_height,
  lower_leg_height,
  neck_height,
  origin_height,
  padding,
  poses,
  torso_height,
  torso_width,
  upper_arm_height,
  upper_leg_height,
} from "./data";
import { makeMaterials } from "./materials";
import { rotate, setRotation } from "./utils";

export function makeModel(scene) {
  const mats = makeMaterials(scene);

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

  applyPose(poses.rest);
  // repeatReverse(poses.wave_end, poses.wave_start);
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
    model: origin,
    applyPose,
    playAnimation,
  };
}
