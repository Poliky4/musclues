const b = BABYLON

const canvas = document.getElementsByTagName("canvas")[0]

const engine = new b.Engine(
  canvas,
  true,
  {
    preserveDrawingBuffer: true,
    stencil: true
  }
)

const foot_height = 2
const lower_leg_height = 5
const upper_leg_height = 5
const torso_height = 8
const neck_height = 1
const head_height = 4
const upper_arm_height = 4
const lower_arm_height = 4
const hand_height = 1

const createScene = function() {
  const scene = new b.Scene(engine)
  
  const camera = new b.FreeCamera(
    'camera1',
    new b.Vector3(0, 30, -30),
    //new b.Vector3(50, 15, -25),
    scene
  )
  camera.setTarget(new b.Vector3(0, 12, 0))
  camera.attachControl(canvas, false)

  const light = new b.HemisphericLight(
    "light1",
    new b.Vector3(0, 1, 0),
    scene
  )

  const foot_l = b.MeshBuilder.CreateBox(
    "foot_l",
    {
      height: foot_height,
      width: 2,
      depth: 5,
    },
    scene
  ) 
  foot_l.position.y = 1
  foot_l.position.z = -1.5

  const lower_leg_l = b.MeshBuilder.CreateBox(
    "lower_leg_l",
    {
      height: lower_leg_height,
      width: 2,
      depth: 2
    },
    scene
  )
  lower_leg_l.position.y = 2.5 + foot_height

  const upper_leg_l = b.MeshBuilder.CreateBox(
    "upper_leg_l",
    {
      height: upper_leg_height,
      width: 2,
      depth: 2
    },
    scene
  )
  upper_leg_l.position.y =
    3 + foot_height + lower_leg_height

  const foot_r = b.MeshBuilder.CreateBox(
    "foot_r",
    {
      height: foot_height,
      width: 2,
      depth: 5,
    },
    scene
  ) 
  foot_r.position.x = -3
  foot_r.position.y = 1
  foot_r.position.z = -1.5

  const lower_leg_r = b.MeshBuilder.CreateBox(
    "lower_leg_r",
    {
      height: lower_leg_height,
      width: 2,
      depth: 2
    },
    scene
  )
  lower_leg_r.position.x = -3
  lower_leg_r.position.y = 2.5 + foot_height

  const upper_leg_r = b.MeshBuilder.CreateBox(
    "upper_leg_r",
    {
      height: upper_leg_height,
      width: 2,
      depth: 2
    },
    scene
  )
  upper_leg_r.position.x = -3
  upper_leg_r.position.y =
    3 + foot_height + lower_leg_height

  const torso = b.MeshBuilder.CreateBox(
    "torso",
    {
      height: torso_height,
      width: 5,
      depth: 2
    },
    scene
  )
  torso.position.x = -1.5
  torso.position.y = (
    5.5 +
    foot_height +
    lower_leg_height +
    upper_leg_height
  )

  const neck = b.MeshBuilder.CreateBox(
    "neck",
    {
      height: neck_height,
      width: 2,
      depth: 2
    },
    scene
  )
  neck.position.x = -1.5
  neck.position.y = (
    2.5 +
    foot_height +
    lower_leg_height +
    upper_leg_height +
    torso_height
  )

  const head = b.Mesh.CreateSphere(
    "head",
    16,
    head_height,
    scene,
    false, 
    BABYLON.Mesh.FRONTSIDE
  )
  head.position.x = -1.5
  head.position.y = (
    3.5 +
    foot_height +
    lower_leg_height +
    upper_leg_height +
    torso_height +
    neck_height
  )

  const upper_arm_l = b.MeshBuilder.CreateBox(
    "upper_arm_l",
    {
      height: upper_arm_height,
      width: 1.5,
      depth: 1.5
    },
    scene
  )
  upper_arm_l.position.x = 2
  upper_arm_l.position.y = (
    3.5 +
    foot_height +
    lower_leg_height +
    upper_leg_height +
    torso_height -
    upper_arm_height
  )

  const lower_arm_l = b.MeshBuilder.CreateBox(
    "lower_arm_l",
    {
      height: lower_arm_height,
      width: 1.5,
      depth: 1.5
    },
    scene
  )
  lower_arm_l.position.x = 2
  lower_arm_l.position.y = (
    3 +
    foot_height +
    lower_leg_height +
    upper_leg_height +
    torso_height -
    upper_arm_height -
    lower_arm_height
  )

  const hand_l = b.MeshBuilder.CreateBox(
    "hand_l",
    {
      height: hand_height,
      width: 1.5,
      depth: 1.5
    },
    scene
  )
  hand_l.position.x = 2
  hand_l.position.y = (
    1 +
    foot_height +
    lower_leg_height +
    upper_leg_height +
    torso_height -
    upper_arm_height -
    lower_arm_height -
    hand_height
  )

  const upper_arm_r = b.MeshBuilder.CreateBox(
    "upper_arm_r",
    {
      height: upper_arm_height,
      width: 1.5,
      depth: 1.5
    },
    scene
  )
  upper_arm_r.position.x = -5
  upper_arm_r.position.y = (
    3.5 +
    foot_height +
    lower_leg_height +
    upper_leg_height +
    torso_height -
    upper_arm_height
  )

  const lower_arm_r = b.MeshBuilder.CreateBox(
    "lower_arm_r",
    {
      height: lower_arm_height,
      width: 1.5,
      depth: 1.5
    },
    scene
  )
  lower_arm_r.position.x = -5
  lower_arm_r.position.y = (
    3 +
    foot_height +
    lower_leg_height +
    upper_leg_height +
    torso_height -
    upper_arm_height -
    lower_arm_height
  )

  const hand_r = b.MeshBuilder.CreateBox(
    "hand_r",
    {
      height: hand_height,
      width: 1.5,
      depth: 1.5
    },
    scene
  )
  hand_r.position.x = -5
  hand_r.position.y = (
    1 +
    foot_height +
    lower_leg_height +
    upper_leg_height +
    torso_height -
    upper_arm_height -
    lower_arm_height -
    hand_height
  )

  return scene
}

const scene = createScene()
engine.runRenderLoop(() => {
  scene.render()
})

window.addEventListener("resize", () => {
  engine.resize()
})

