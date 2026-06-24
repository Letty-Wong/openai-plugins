export const domTreeText = [
  "main.spatial-lab-root[data-spatial-lab-version=V4]",
  "├─ section.spatial-lab-viewport[data-owner=ScreenViewport]",
  "│  └─ div.spatial-lab-world-camera[data-owner=WorldCamera]",
  "│     └─ div.spatial-lab-world-space[data-owner=WorldSpace]",
  "│        ├─ div.spatial-lab-world-atmosphere[data-owner=WorldSpace]",
  "│        ├─ div.spatial-lab-persistent-actors[data-owner=PersistentActors]",
  "│        │  └─ div.spatial-lab-actor[data-stage-actor-id][data-target-pose-id]",
  "│        ├─ div.spatial-lab-artifact-system[data-owner=ArtifactSystem]",
  "│        │  └─ div.spatial-lab-artifact[data-artifact-id]",
  "│        └─ div.spatial-lab-world-typography[data-owner=WorldTypography]",
  "├─ aside.spatial-lab-screen-copy[data-owner=ScreenCopyLayer]",
  "├─ nav.spatial-lab-lab-controls[data-owner=PresenterControls]",
  "└─ div.spatial-lab-pose-runtime[data-owner=PoseTransitionRuntime]"
].join("\n");

export const ownershipRows = [
  {
    layer: "ScreenViewport",
    mustNotOwn: "camera transforms, actor pose, artifact pose",
    owns: "viewport bounds, perspective CSS variable storage, current beat id, route phase, transition id"
  },
  {
    layer: "WorldCamera",
    mustNotOwn: "actor lifecycle, actor role, artifact identity",
    owns: "camera DOM layer and camera transform CSS variable storage"
  },
  {
    layer: "WorldSpace",
    mustNotOwn: "camera pose, actor lifecycle, presenter state",
    owns: "single coordinate plane, atmosphere marker, world-space containment"
  },
  {
    layer: "PersistentActors",
    mustNotOwn: "camera transform, viewport state, artifact ids",
    owns: "stable actor DOM ids, actor pose CSS variable storage, lifecycle phase, role, target pose attributes"
  },
  {
    layer: "ArtifactSystem",
    mustNotOwn: "actor ids, camera transform, screen copy",
    owns: "stable artifact ids, artifact pose CSS variable storage, artifact mode, artifact target pose attributes"
  },
  {
    layer: "ScreenCopyLayer",
    mustNotOwn: "world actor pose, camera transform, artifact layout",
    owns: "readable semantic support copy outside camera motion"
  },
  {
    layer: "PoseTransitionRuntime",
    mustNotOwn: "DOM creation, content text, actor identity",
    owns: "only post-seed writes to perspective, camera, actor, and artifact pose CSS variables"
  }
] as const;
