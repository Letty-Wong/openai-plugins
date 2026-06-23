import type { ContentStatus } from "@/presentation/core/state-types";

export type ProductRenderState = "silhouette" | "warm" | "neutral";

export type ProductFactPrototype = {
  readonly id: string;
  readonly label: string;
  readonly anchorId: "valveCore" | "railMid" | "nozzleDetail" | "productCenter";
  readonly sourceId: string;
  readonly status: ContentStatus;
};

export type ProductClaimPrototype = {
  readonly id: string;
  readonly factId: string;
  readonly benefit: string;
  readonly sceneTags: readonly string[];
  readonly status: ContentStatus;
};

export const productPrototype = {
  id: "shower-h1-placeholder",
  label: "恒温淋浴花洒套装",
  modelStatus: "PLACEHOLDER" as const,
  anchors: {
    productCenter: { x: 0.5, y: 0.53 },
    valveCore: { x: 0.5, y: 0.56 },
    railMid: { x: 0.5, y: 0.36 },
    nozzleDetail: { x: 0.44, y: 0.16 }
  }
};

export const productFacts: readonly ProductFactPrototype[] = [
  {
    id: "fact-thermostatic-water",
    label: "恒温出水",
    anchorId: "valveCore",
    sourceId: "F-01",
    status: "PLACEHOLDER"
  },
  {
    id: "fact-anti-scald",
    label: "防烫设计",
    anchorId: "valveCore",
    sourceId: "F-02",
    status: "PLACEHOLDER"
  },
  {
    id: "fact-silicone-nozzle",
    label: "硅胶出水嘴",
    anchorId: "nozzleDetail",
    sourceId: "F-03",
    status: "PLACEHOLDER"
  },
  {
    id: "fact-body-material",
    label: "主体材质待确认",
    anchorId: "productCenter",
    sourceId: "F-04",
    status: "PLACEHOLDER"
  }
];

export const productClaims: readonly ProductClaimPrototype[] = [
  {
    id: "claim-stable-temperature",
    factId: "fact-thermostatic-water",
    benefit: "减少水温忽冷忽热",
    sceneTags: ["家庭", "酒店"],
    status: "PLACEHOLDER"
  },
  {
    id: "claim-safer-use",
    factId: "fact-anti-scald",
    benefit: "使用更安心",
    sceneTags: ["家庭", "养老"],
    status: "PLACEHOLDER"
  },
  {
    id: "claim-easier-cleaning",
    factId: "fact-silicone-nozzle",
    benefit: "日常清洁更方便",
    sceneTags: ["酒店", "高频使用"],
    status: "PLACEHOLDER"
  },
  {
    id: "claim-material-confidence",
    factId: "fact-body-material",
    benefit: "材质表达待确认",
    sceneTags: ["家装", "工程"],
    status: "PLACEHOLDER"
  }
];
