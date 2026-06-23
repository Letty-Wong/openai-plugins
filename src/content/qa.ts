import type { QAItem } from "@/presentation/core/state-types";

export const qaItems: readonly QAItem[] = [
  {
    id: "qa-1",
    question: "员工基础不高，能用吗？",
    screenAnswer: ["能", "但不要从自由发挥开始"],
    structureTags: ["给场景", "给资料", "给模板", "给边界"],
    speakerNotes: ["普通岗位可以从纪要、销售初稿、常见问题和社交素材等简单场景开始。"],
    relatedSceneIds: ["scene-06", "scene-07", "scene-18"]
  },
  {
    id: "qa-2",
    question: "资料很乱，可以开始吗？",
    screenAnswer: ["可以", "先从一个产品开始"],
    structureTags: ["一套问答", "一个销售场景", "一个负责人"],
    speakerNotes: ["如果完全没有可用资料、负责人也不参与，应先做诊断和资料准备。"],
    relatedSceneIds: ["scene-09", "scene-10", "scene-19"]
  },
  {
    id: "qa-3",
    question: "用 AI 会不会泄露资料？",
    screenAnswer: ["有风险", "所以不能乱用"],
    structureTags: ["资料分级", "必要脱敏", "工具白名单"],
    speakerNotes: ["公开资料可以作为低风险起点，敏感资料要脱敏，高敏资料原则上不直接进入未经确认的工具。"],
    relatedSceneIds: ["scene-16", "scene-17"]
  },
  {
    id: "qa-4",
    question: "3 天能改造全公司吗？",
    screenAnswer: ["不能", "也不该这样承诺"],
    structureTags: ["3 天只做一件事", "跑出第一个样板"],
    speakerNotes: ["完整落地还需要资料持续完善、员工训练、流程固化、安全审核和效果复盘。"],
    relatedSceneIds: ["scene-20"]
  },
  {
    id: "qa-5",
    question: "只做视频，不做资料库可以吗？",
    screenAnswer: ["可以从视频切入", "但不能脱离资料"],
    structureTags: ["产品事实", "客户问题", "使用场景", "销售目标"],
    speakerNotes: ["至少准备一个轻量资料包，否则脚本可能好看但不准确。"],
    relatedSceneIds: ["scene-10", "scene-13"]
  },
  {
    id: "qa-6",
    question: "已经有人在用 AI，还需要吗？",
    screenAnswer: ["更要判断", "个人使用还是企业接入"],
    structureTags: ["资料", "模板", "审核", "边界", "流程"],
    speakerNotes: ["只有资料、模板、审核、安全边界和部门流程被接入，才会形成企业能力。"],
    relatedSceneIds: ["scene-08", "scene-21"]
  }
];
