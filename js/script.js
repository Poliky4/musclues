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

const foot_height = 1
const lower_leg_height = 5
const upper_leg_height = 5
const torso_height = 8
const torso_width = 6
const neck_height = 1
const head_height = 4
const upper_arm_height = 4
const lower_arm_height = 4
const hand_height = 1

const padding = 0.5

const sum = arr => arr.reduce(
  (a, b) => a + b, 0)
const totalHeight = sum([
  foot_height,
  lower_leg_height,
  upper_leg_height,
  torso_height,
  neck_height,
  head_height
])

const createScene = function() {
  const scene = new b.Scene(engine)

  const mat_transparent =
    new b.StandardMaterial(
      "mat_transparent", scene)
  mat_transparent.alpha = 0.5

  const camera = new b.ArcRotateCamera(
    'camera',
    0, 0, 10,
    new b.Vector3(
      0, (totalHeight/3)*2, 0),
    scene
  )
  camera.setPosition(
    new b.Vector3(
      0, totalHeight/2, -40))
  camera.attachControl(canvas, true)

  const light = new b.HemisphericLight
  (
    "light1",
    new b.Vector3(0, 1, 0),
    scene
  )

  const torso = b.MeshBuilder.CreateBox(
    "torso",
    {
      height: torso_height,
      width: torso_width,
      depth: 2
    },
    scene
  )
  torso.material = mat_transparent
  torso.position.y = (
    2 +
    torso_height / 2 +
    foot_height +
    lower_leg_height +
    upper_leg_height
  )
  camera.lockTarget = torso

  const neck = b.MeshBuilder.CreateBox
  (
    "neck",
    {
      height: neck_height,
      width: 2,
      depth: 2
    },
    scene
  )
  neck.material = mat_transparent
  neck.parent = torso
  neck.position.y = (
    torso_height / 2
    + neck_height
  )

  const head = b.Mesh.CreateSphere(
    "head",
    16,
    head_height,
    scene,
    false, 
    BABYLON.Mesh.FRONTSIDE
  )
  head.material = mat_transparent
  head.parent = neck
  head.position.y = (
    head_height / 2
    + neck_height
  )

  const upper_leg_l = b.MeshBuilder.CreateBox(
    "upper_leg_l",
    {
      height: upper_leg_height,
      width: 2,
      depth: 2
    },
    scene
  )
  upper_leg_l.material = mat_transparent
  upper_leg_l.parent = torso
  upper_leg_l.position.x = (
    torso_width / 2
    - 1
  )
  upper_leg_l.position.y = -(
    torso_height
    - 1
    -upper_leg_height / 2
  )
  upper_leg_l.rotation.x = 45
  upper_leg_l.rotation.y = -45
  upper_leg_l.setPivotMatrix(
    b.Matrix.Translation(
      0,
      -upper_leg_height / 2,
      0,
    ),
    false
  )

  const lower_leg_l = b.MeshBuilder.CreateBox(
    "lower_leg_l",
    {
      height: lower_leg_height,
      width: 2,
      depth: 2
    },
    scene
  )
  lower_leg_l.material = mat_transparent
  lower_leg_l.parent = upper_leg_l
  lower_leg_l.position.y = -(
    upper_leg_height
    + 0.5
    - lower_leg_height / 2
  )
  lower_leg_l.rotation.x = -45
  lower_leg_l.setPivotMatrix(
    b.Matrix.Translation(
      0,
      -lower_leg_height / 2,
      0,
    ),
    false
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
  foot_l.material = mat_transparent
  foot_l.parent = lower_leg_l
  foot_l.position.z = -1.5
  foot_l.position.y = -(
    lower_leg_height / 2
    + 1
  )

  const upper_leg_r = b.MeshBuilder.CreateBox(
    "upper_leg_r",
    {
      height: upper_leg_height,
      width: 2,
      depth: 2
    },
    scene
  )
  upper_leg_r.material = mat_transparent
  upper_leg_r.parent = torso
  upper_leg_r.position.x = -(
    torso_width / 2
    - 1
  )
  upper_leg_r.position.y = -(
    torso_height
    - 1
    - upper_leg_height / 2
  )
  upper_leg_r.rotation.x = 45
  upper_leg_r.rotation.y = 45
  upper_leg_r.setPivotMatrix(
    b.Matrix.Translation(
      0,
      -upper_leg_height / 2,
      0,
    ),
    false
  )

  const lower_leg_r = b.MeshBuilder.CreateBox(
    "lower_leg_r",
    {
      height: lower_leg_height,
      width: 2,
      depth: 2
    },
    scene
  )
  lower_leg_r.material = mat_transparent
  lower_leg_r.parent = upper_leg_r
  lower_leg_r.position.y = -(
    upper_leg_height
    + 0.5
    - lower_leg_height / 2
  )
  lower_leg_r.rotation.x = -45
  lower_leg_r.setPivotMatrix(
    b.Matrix.Translation(
      0,
      -lower_leg_height / 2,
      0,
    ),
    false
  )

  const foot_r = b.MeshBuilder.CreateBox(
    "foot_r",
    {
      height: foot_height,
      width: 2,
      depth: 5,
    },
    scene
  ) 
  foot_r.material = mat_transparent
  foot_r.parent = lower_leg_r
  foot_r.position.z = -1.5
  foot_r.position.y = -(
    lower_leg_height / 2
    + 1
  )

  const upper_arm_l = b.MeshBuilder.CreateBox(
    "upper_arm_l",
    {
      height: 1.5,
      width: upper_arm_height, 
      depth: 1.5
    },
    scene
  )
  upper_arm_l.material = mat_transparent
  upper_arm_l.parent = torso
  upper_arm_l.position.y = (
    torso_height / 2
    - 0.75
  )
  upper_arm_l.position.x = (
    torso_width / 2
    + upper_arm_height / 2
    + 0.5
    - upper_arm_height / 2
  )
  upper_arm_l.rotation.y = 45
  upper_arm_l.setPivotMatrix(
    b.Matrix.Translation(
      upper_arm_height / 2,
      0,
      0,
    ),
    false
  )

  const lower_arm_l = b.MeshBuilder.CreateBox
  (
    "lower_arm_l",
    {
      height: 1.5,
      width: lower_arm_height,
      depth: 1.5
    },
    scene
  )
  lower_arm_l.material = mat_transparent
  lower_arm_l.parent = upper_arm_l
  lower_arm_l.position.x = (
    upper_arm_height
    + 0.5
    - lower_arm_height / 2
  )
  lower_arm_l.rotation.y = 45
  lower_arm_l.setPivotMatrix(
    b.Matrix.Translation(
      lower_arm_height / 2,
      0,
      0,
    ),
    false
  )

  const hand_l = b.MeshBuilder.CreateBox(
    "hand_l",
    {
      height: 1.5,
      width: hand_height,
      depth: 1.5
    },
    scene
  )
  hand_l.material = mat_transparent
  hand_l.parent = lower_arm_l
  hand_l.position.x = (
    lower_arm_height
    + 0.5
    - 1.5
  )

  const upper_arm_r = b.MeshBuilder.CreateBox(
    "upper_arm_r",
    {
      height: 1.5,
      width: upper_arm_height,
      depth: 1.5
    },
    scene
  )
  upper_arm_r.material = mat_transparent
  upper_arm_r.parent = torso
  upper_arm_r.position.y = (
    torso_height / 2
    - 0.75
  )
  upper_arm_r.position.x = -(
    torso_width / 2
    + 0.5
  )
  upper_arm_r.rotation.z = 45
  upper_arm_r.setPivotMatrix(
    b.Matrix.Translation(
      -upper_arm_height / 2,
      0,
      0,
    ),
    false
  )

  const lower_arm_r = b.MeshBuilder.CreateBox(
    "lower_arm_r",
    {
      height: 1.5,
      width: lower_arm_height,
      depth: 1.5
    },
    scene
  )
  lower_arm_r.material = mat_transparent
  lower_arm_r.parent = upper_arm_r
  lower_arm_r.position.x = -(
    upper_arm_height
    + 0.5
    - lower_arm_height / 2
  )
  lower_arm_r.rotation.z = 45
  lower_arm_r.setPivotMatrix(
    b.Matrix.Translation(
      -lower_arm_height / 2,
      0,
      0,
    ),
    false
  )

  const hand_r = b.MeshBuilder.CreateBox(
    "hand_r",
    {
      height: 1.5,
      width: hand_height,
      depth: 1.5
    },
    scene
  )
  hand_r.material = mat_transparent
  hand_r.parent = lower_arm_r
  hand_r.position.x = -(
    lower_arm_height
    + 0.5
    - 1.5
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

