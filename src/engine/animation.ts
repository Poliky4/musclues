import { poses } from "./data";
import { Model } from "./model";
import { setRotation } from "./utils";

export function makeAnimation(model: Model) {
  const setRotationMesh = (meshName, rotation) => {
    if (!model[meshName]) return console.warn("Unknown mesh:", meshName);
    setRotation(model[meshName], rotation);
  };

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
          model.origin.position.y = rotation.y;
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

  return [
    {
      name: "Rest",
      thing: () => applyPose(poses.rest),
    },
    {
      name: "Wave",
      thing: () => repeatReverse(poses.wave_end, poses.wave_start),
    },
  ];
}
