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

export type ProductDemoMaterialMode =
  | "source"
  | "benefit"
  | "poster"
  | "storyboard"
  | "email-faq"
  | "department-output"
  | "review"
  | "route"
  | "placeholder";

export type ProductDemoMaterial = {
  readonly kicker: string;
  readonly title: string;
  readonly rows: readonly string[];
  readonly hero?: string;
  readonly storyboard?: readonly string[];
  readonly mailLines?: readonly string[];
  readonly departmentSlots?: readonly string[];
  readonly status: ContentStatus;
};

export const productPrototype = {
  id: "shower-h1-placeholder",
  label: "恒温淋浴花洒套装",
  modelStatus: "PLACEHOLDER" as const,
  demoContentStatus: "APPROVED" as const,
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
    status: "APPROVED"
  },
  {
    id: "fact-anti-scald",
    label: "防烫设计",
    anchorId: "valveCore",
    sourceId: "F-02",
    status: "APPROVED"
  },
  {
    id: "fact-water-saving",
    label: "节水卖点",
    anchorId: "productCenter",
    sourceId: "F-03",
    status: "APPROVED"
  },
  {
    id: "fact-silicone-nozzle",
    label: "硅胶出水嘴",
    anchorId: "nozzleDetail",
    sourceId: "F-04",
    status: "APPROVED"
  },
  {
    id: "fact-copper-body",
    label: "铜主体",
    anchorId: "productCenter",
    sourceId: "F-05",
    status: "APPROVED"
  },
  {
    id: "fact-stainless-rail",
    label: "不锈钢升降杆",
    anchorId: "railMid",
    sourceId: "F-06",
    status: "APPROVED"
  }
];

export const productClaims: readonly ProductClaimPrototype[] = [
  {
    id: "claim-stable-temperature",
    factId: "fact-thermostatic-water",
    benefit: "减少水温忽冷忽热，淋浴体验更稳定",
    sceneTags: ["家庭浴室", "酒店客房"],
    status: "APPROVED"
  },
  {
    id: "claim-safer-use",
    factId: "fact-anti-scald",
    benefit: "老人小孩使用更安心",
    sceneTags: ["家庭", "公寓"],
    status: "APPROVED"
  },
  {
    id: "claim-water-saving",
    factId: "fact-water-saving",
    benefit: "可作为节水卖点表达，具体比例不写死",
    sceneTags: ["工程项目", "酒店"],
    status: "APPROVED"
  },
  {
    id: "claim-easier-cleaning",
    factId: "fact-silicone-nozzle",
    benefit: "出水嘴易清洁，减少堵塞顾虑",
    sceneTags: ["酒店", "高频使用"],
    status: "APPROVED"
  },
  {
    id: "claim-material-confidence",
    factId: "fact-copper-body",
    benefit: "材质表达更耐用、专业、可信",
    sceneTags: ["家装", "工程"],
    status: "APPROVED"
  }
];

export const productDemoMaterials: Readonly<Record<ProductDemoMaterialMode, ProductDemoMaterial>> = {
  source: {
    kicker: "资料",
    title: "恒温花洒资料",
    rows: ["恒温出水 / 防烫 / 节水", "铜主体 / 不锈钢升降杆", "家庭 / 酒店 / 公寓 / 工程"],
    status: "APPROVED"
  },
  benefit: {
    kicker: "转译",
    title: "事实变利益",
    rows: ["水温稳定 → 淋浴更安心", "防烫设计 → 老人小孩友好", "硅胶出水嘴 → 清洁更省心"],
    hero: "只改表达，不改事实",
    status: "APPROVED"
  },
  poster: {
    kicker: "海报",
    title: "稳定水温",
    rows: ["让每一次淋浴更安心", "恒温 / 防烫 / 易清洁", "家庭与酒店浴室都适合"],
    hero: "稳定水温，让每一次淋浴更安心。",
    status: "APPROVED"
  },
  storyboard: {
    kicker: "视频",
    title: "45 秒分镜",
    rows: ["痛点 → 恒温控制", "家人使用 → 清洁细节", "产品整体 → 咨询引导"],
    storyboard: ["00-05 忽冷忽热", "05-15 恒温控制", "15-25 家人使用", "25-35 硅胶清洁", "35-45 安装咨询"],
    status: "APPROVED"
  },
  "email-faq": {
    kicker: "外贸",
    title: "邮件 / FAQ",
    rows: ["先回答场景问题", "再列资料清单", "商业字段等待确认"],
    mailLines: ["MOQ / 价格：待业务确认", "质保 / 交期：待业务确认", "不承诺未确认认证"],
    status: "APPROVED"
  },
  "department-output": {
    kicker: "复用",
    title: "五个部门输出",
    rows: ["同一份资料", "分发到不同团队", "人工审核后使用"],
    departmentSlots: ["市场 海报", "销售 话术", "视频 分镜", "外贸 邮件", "客服 FAQ"],
    status: "APPROVED"
  },
  review: {
    kicker: "审核",
    title: "人工确认",
    rows: ["事实是否准确", "承诺是否越界", "语气是否可用"],
    status: "APPROVED"
  },
  route: {
    kicker: "行动",
    title: "样板路径",
    rows: ["资料清单", "场景诊断", "样板计划"],
    status: "APPROVED"
  },
  placeholder: {
    kicker: "待确认",
    title: "真实素材待接入",
    rows: ["产品图", "二维码", "真实业务字段"],
    status: "PLACEHOLDER"
  }
};
