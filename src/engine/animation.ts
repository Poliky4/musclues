import { Mesh } from "babylonjs";
import { Pose, poses } from "./data";
import { Model } from "./model";
import { Vector } from "./types";
import { setRotation } from "./utils";

export interface Exercise {
  name: string;
  thing: () => void;
  bodyParts: string[];
}

const FPS = 30;
const animationDurationMs = 600;
const frames = (FPS / 1000) * animationDurationMs;
const frameDuration = animationDurationMs / frames;

export function makeAnimation(model: Model): Exercise[] {
  applyPose(model, poses.rest);
  // repeatReverse(model, poses.wave_end, poses.wave_start);
  // applyPose(model, poses.squat_end)
  // repeatReverse(model, poses.squat_end, poses.squat_start)
  // repeatReverse(model, poses.pushup_start, poses.pushup_end)

  return [
    {
      name: "Rest",
      thing: () => playAnimation(model, poses.rest),
      bodyParts: [
        "torso",
        "shoulder_l",
        "elbow_l",
        "shoulder_r",
        "elbow_r",
        "hip_r",
        "knee_r",
        "hip_l",
        "knee_l",
      ],
    },
    {
      name: "Stop",
      thing: stopAnimation,
      bodyParts: [
        "torso",
        "shoulder_l",
        "elbow_l",
        "shoulder_r",
        "elbow_r",
        "hip_r",
        "knee_r",
        "hip_l",
        "knee_l",
      ],
    },
    {
      name: "Wave",
      thing: () => repeatReverse(model, poses.wave_end, poses.wave_start),
      bodyParts: ["shoulder_l", "elbow_l"],
    },
    {
      name: "Squat",
      thing: () => repeatReverse(model, poses.squat_start, poses.squat_end),
      bodyParts: ["torso", "hip_r", "hip_l"],
    },
    {
      name: "Push up",
      thing: () => repeatReverse(model, poses.pushup_start, poses.pushup_end),
      bodyParts: ["torso", "shoulder_l", "shoulder_r"],
    },
  ];
}

const setRotationMesh = (model: Model, meshName: string, rotation: Vector) => {
  if (!model[meshName]) return console.warn("Unknown mesh:", meshName);
  setRotation(model[meshName], rotation);
};

const playAnimation = (model: Model, to: Pose, from?: Pose) => {
  if (!from) from = getCurrentPose(model);

  const steps = getSteps(from, to, frames);
  playSteps(model, steps, frames, frameDuration);
};

function applyPose(model: Model, pose: Pose) {
  Object.entries(pose).forEach(([name, rotation]) => {
    switch (name) {
      case "height": {
        model.origin.position.y = rotation.y;
        break;
      }
      default: {
        setRotationMesh(model, name, rotation);
        break;
      }
    }
  });
}

function playSteps(
  model: Model,
  steps: Pose[],
  frames: number,
  frameDuration: number
) {
  let i = 0;
  const intervalId = setInterval(() => {
    applyPose(model, steps[i++]);
    if (i === frames) clearInterval(intervalId);
  }, frameDuration);
}

function getSteps(from: Pose, to: Pose, frames: number) {
  return Array(frames)
    .fill(null)
    .map((_, i) => {
      const step: Pose = {};

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

function getStep(from: number, to: number, i: number) {
  const difference = (to ?? 0) - from;
  const increment = (difference / frames) * i;
  return from + increment;
}

function getCurrentPose(model: Model) {
  return {
    height: { y: model.origin.position.y },
    torso: getMeshRotation(model.torso),
    shoulder_l: getMeshRotation(model.shoulder_l),
    elbow_l: getMeshRotation(model.elbow_l),
    shoulder_r: getMeshRotation(model.shoulder_r),
    elbow_r: getMeshRotation(model.elbow_r),
    hip_r: getMeshRotation(model.hip_r),
    knee_r: getMeshRotation(model.knee_r),
    foot_r: getMeshRotation(model.foot_r),
    hip_l: getMeshRotation(model.hip_l),
    knee_l: getMeshRotation(model.knee_l),
    foot_l: getMeshRotation(model.foot_l),
  };
}

function getMeshRotation(mesh: Mesh) {
  const { x, y, z } = mesh.rotation;
  return { x, y, z };
}

let animationId: string | undefined;
function repeatReverse(
  model: Model,
  start: Pose,
  end: Pose,
  duration = animationDurationMs
) {
  let flip = true;
  animationId = setInterval(() => {
    if (flip) playAnimation(model, start);
    else playAnimation(model, end);
    flip = !flip;
  }, duration);
}

function stopAnimation() {
  if (animationId) {
    clearInterval(animationId);
    animationId = undefined;
  }
}
