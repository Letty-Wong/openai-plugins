import type { ContentStatus } from "@/presentation/core/state-types";

export type BoundaryModuleId = "data" | "tool" | "content" | "permission";

export type BoundaryModule = {
  readonly id: BoundaryModuleId;
  readonly label: string;
  readonly rule: string;
};

export type OutputCardPrototype = {
  readonly id: string;
  readonly label: string;
  readonly sourceId: string;
  readonly reviewStatus: "DRAFT" | "APPROVED" | "BLOCKED";
  readonly contentStatus: ContentStatus;
};

export type ScenarioCandidate = {
  readonly id: string;
  readonly label: string;
  readonly conditions: readonly string[];
};

export type MilestonePrototype = {
  readonly id: "today" | "thirty-min" | "three-days" | "three-months";
  readonly label: string;
  readonly result: string;
};

export const boundaryModules: readonly BoundaryModule[] = [
  { id: "data", label: "资料", rule: "先分级" },
  { id: "tool", label: "工具", rule: "先准入" },
  { id: "content", label: "内容", rule: "先审核" },
  { id: "permission", label: "权限", rule: "先确认" }
];

export const outputCards: readonly OutputCardPrototype[] = [
  {
    id: "output-sales-copy",
    label: "销售话术初稿",
    sourceId: "F-01",
    reviewStatus: "APPROVED",
    contentStatus: "PLACEHOLDER"
  },
  {
    id: "output-video-script",
    label: "视频分镜初稿",
    sourceId: "F-03",
    reviewStatus: "DRAFT",
    contentStatus: "PLACEHOLDER"
  },
  {
    id: "output-unknown-claim",
    label: "未确认承诺",
    sourceId: "DEMO-ONLY",
    reviewStatus: "BLOCKED",
    contentStatus: "DO_NOT_USE"
  }
];

export const humanReviewNode = {
  id: "human-review-node",
  label: "人工审核",
  status: "REQUIRED"
} as const;

export const actionConfirmGate = {
  id: "action-confirm-gate",
  label: "负责人确认",
  executionAuthorized: false
} as const;

export const scenarioCandidates: readonly ScenarioCandidate[] = [
  { id: "sales-script", label: "销售话术", conditions: ["资料条件", "负责人条件", "审核条件"] },
  { id: "content-video", label: "内容 / 视频", conditions: ["资料条件", "模板条件"] },
  { id: "trade-reply", label: "外贸回复", conditions: ["字段条件", "审核条件"] },
  { id: "service-faq", label: "客服问答", conditions: ["问题库", "售后边界"] },
  { id: "meeting-sop", label: "会议 / SOP", conditions: ["流程资料", "负责人"] },
  { id: "safety-rule", label: "安全规范", conditions: ["边界缺口", "准入规则"] }
];

export const selectedScenario = {
  id: "selected-sales-script",
  label: "产品资料 -> 销售话术",
  status: "EXAMPLE_ONLY" as const
};

export const actionMilestones: readonly MilestonePrototype[] = [
  { id: "today", label: "TODAY", result: "看清趋势" },
  { id: "thirty-min", label: "30 MIN", result: "判断场景" },
  { id: "three-days", label: "3 DAYS", result: "做出样板" },
  { id: "three-months", label: "3 MONTHS", result: "形成能力" }
];

export const ctaPlaceholder = {
  id: "cta-placeholder-main",
  label: "企业 AI 场景自测",
  action: "申请 30 分钟诊断",
  secondary: "符合条件可申请 3 天体验课",
  status: "PLACEHOLDER" as const,
  shortLinkLabel: "短链 / 报名编号待确认"
};
