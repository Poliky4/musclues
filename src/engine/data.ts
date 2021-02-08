import { origin_height } from "./model";
import { Vector } from "./types";

export interface Pose {
  [key: string]: Vector;
}

export interface Poses {
  [key: string]: Pose;
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
export const poses: Poses = {
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
