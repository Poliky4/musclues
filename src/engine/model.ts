import { Matrix, Mesh, MeshBuilder, Scene } from "babylonjs";
import { makeMaterials } from "./materials";
import { sum } from "./utils";

export interface Model {
  [key: string]: Mesh;
}

export const foot_height = 1;
export const lower_leg_height = 6;
export const upper_leg_height = 6;
export const torso_height = 10;
export const torso_width = 6;
export const neck_height = 0.5;
export const head_height = 4;
export const upper_arm_height = 4;
export const lower_arm_height = 4;
export const hand_height = 1;

export const padding = 0.5;

export const totalHeight = sum([
  foot_height,
  lower_leg_height,
  upper_leg_height,
  torso_height,
  neck_height,
  head_height,
]);

export const origin_height =
  foot_height + lower_leg_height + upper_leg_height + padding * 3;

export function makeModel(scene: Scene): Model {
  const mats = makeMaterials(scene);

  const origin = MeshBuilder.CreateBox(
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

  const torso = MeshBuilder.CreateBox(
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
  torso.setPivotMatrix(Matrix.Translation(0, torso_height / 2, 0), false);

  const neck = MeshBuilder.CreateBox(
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

  const head = Mesh.CreateSphere(
    "head",
    16,
    head_height,
    scene,
    false,
    Mesh.FRONTSIDE
  );
  head.material = mats.transparent;
  head.parent = neck;
  head.position.y = head_height / 2 + neck_height / 2;

  const upper_leg_l = MeshBuilder.CreateBox(
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
    Matrix.Translation(0, -upper_leg_height / 2, 0),
    false
  );

  const lower_leg_l = MeshBuilder.CreateBox(
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
    Matrix.Translation(0, -lower_leg_height / 2, 0),
    false
  );

  const foot_l = MeshBuilder.CreateBox(
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
    Matrix.Translation(
      0,
      0,
      -(5 / 2 - 1) // -1 = half leg thickness
    ),
    false
  );

  const upper_leg_r = MeshBuilder.CreateBox(
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
    Matrix.Translation(0, -upper_leg_height / 2, 0),
    false
  );

  const lower_leg_r = MeshBuilder.CreateBox(
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
    Matrix.Translation(0, -lower_leg_height / 2, 0),
    false
  );

  const foot_r = MeshBuilder.CreateBox(
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
    Matrix.Translation(
      0,
      0,
      -(5 / 2 - 1) // -1 = half leg thickness
    ),
    false
  );

  const upper_arm_l = MeshBuilder.CreateBox(
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
    Matrix.Translation(upper_arm_height / 2, 0, 0),
    false
  );

  const lower_arm_l = MeshBuilder.CreateBox(
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
    Matrix.Translation(lower_arm_height / 2, 0, 0),
    false
  );

  const hand_l = MeshBuilder.CreateBox(
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

  const upper_arm_r = MeshBuilder.CreateBox(
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
    Matrix.Translation(-upper_arm_height / 2, 0, 0),
    false
  );

  const lower_arm_r = MeshBuilder.CreateBox(
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
    Matrix.Translation(-lower_arm_height / 2, 0, 0),
    false
  );

  const hand_r = MeshBuilder.CreateBox(
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

  return {
    origin,
    torso,
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
}
