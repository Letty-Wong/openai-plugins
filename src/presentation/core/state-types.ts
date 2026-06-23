export type SceneId =
  | "scene-01"
  | "scene-02"
  | "scene-03"
  | "scene-04"
  | "scene-05"
  | "scene-06"
  | "scene-07"
  | "scene-08"
  | "scene-09"
  | "scene-10"
  | "scene-11"
  | "scene-12"
  | "scene-13"
  | "scene-14"
  | "scene-15"
  | "scene-16"
  | "scene-17"
  | "scene-18"
  | "scene-19"
  | "scene-20"
  | "scene-21";

export type BeatId = `${number}.${number}`;

export type ContentStatus =
  | "VERIFIED"
  | "APPROVED"
  | "PLACEHOLDER"
  | "DO_NOT_USE";

export type TransitionPreset =
  | "ring-portal"
  | "persistent-object"
  | "shared-container"
  | "directional-cut"
  | "text-product-occlusion"
  | "static-reconcile";

export type ScreenCopy = {
  readonly title: string;
  readonly support?: string;
  readonly finalLine?: string;
  readonly status: ContentStatus;
};

export type SceneSpec = {
  readonly id: SceneId;
  readonly sceneNumber: number;
  readonly chapter: string;
  readonly title: string;
  readonly screenCopy: ScreenCopy;
  readonly beatIds: readonly BeatId[];
};

export type BeatSpec = {
  readonly id: BeatId;
  readonly sceneId: SceneId;
  readonly order: number;
  readonly label: string;
  readonly speakerCue: string;
  readonly screenCopy: ScreenCopy;
  readonly targetStateId: string;
  readonly transitionPreset: TransitionPreset;
  readonly reducedMotionStateId: string;
};

export type ObjectVisibilityState = "active" | "dimmed" | "hidden";

export type PresentationTargetState = {
  readonly id: string;
  readonly sceneId: SceneId;
  readonly beatId: BeatId;
  readonly reducedMotion: boolean;
  readonly objects: {
    readonly integrationRing: ObjectVisibilityState;
    readonly productStage: ObjectVisibilityState;
    readonly sourcePacket: ObjectVisibilityState;
    readonly contentShell: ObjectVisibilityState;
    readonly safetyBoundary: ObjectVisibilityState;
    readonly qrDock: ObjectVisibilityState;
  };
};

export type ResolvedBeatState = {
  readonly scene: SceneSpec;
  readonly beat: BeatSpec;
  readonly targetState: PresentationTargetState;
  readonly audienceScreenCopy: ScreenCopy | null;
};

export type QAItem = {
  readonly id: `qa-${1 | 2 | 3 | 4 | 5 | 6}`;
  readonly question: string;
  readonly screenAnswer: readonly string[];
  readonly structureTags: readonly string[];
  readonly speakerNotes: readonly string[];
  readonly relatedSceneIds: readonly SceneId[];
};

export type CTAConfig = {
  readonly status: "PLACEHOLDER" | "CONFIGURED";
  readonly label: string;
  readonly shortLink?: string;
  readonly qrAssetPath?: string;
};
