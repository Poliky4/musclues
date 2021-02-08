import { Mesh } from "babylonjs";
import { Vector } from "./types";

export function setRotation(mesh: Mesh, rotation: Vector) {
  mesh.rotation.x = rotation.x ?? mesh.rotation.x;
  mesh.rotation.y = rotation.y ?? mesh.rotation.y;
  mesh.rotation.z = rotation.z ?? mesh.rotation.z;
}

export function rotate(mesh: Mesh, rotation: Vector) {
  mesh.rotation.x += rotation.x ?? 0;
  mesh.rotation.y += rotation.y ?? 0;
  mesh.rotation.z += rotation.z ?? 0;
}

export function setPosition(mesh: Mesh, position: Vector) {
  mesh.position.x = position.x ?? mesh.position.x;
  mesh.position.y = position.y ?? mesh.position.y;
  mesh.position.z = position.z ?? mesh.position.z;
}

export function position(mesh: Mesh, position: Vector) {
  mesh.position.x += position.x ?? 0;
  mesh.position.y += position.y ?? 0;
  mesh.position.z += position.z ?? 0;
}

export const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
