import { beats } from "@/content/beats";
import { sceneById } from "@/content/scenes";

type SpeakerNote = {
  readonly beatId: string;
  readonly note: string;
  readonly status: "APPROVED";
};

const sceneNoteGuides = new Map<number, string>([
  [1, "开场只做判断，不讲工具教程；把听众带到“现在是否值得接入”的问题上。"],
  [2, "把工具清单和概念想象清掉，强调今天要带走的是经营判断。"],
  [3, "用电商、短视频、直播、跨境的类比说明每一轮浪潮都会先拉开人效差距。"],
  [4, "强调现在低成本验证，比以后补课更便宜；不要承诺全面改造。"],
  [5, "用四本账建立老板视角：开源、节流、提效、沉淀能力。"],
  [6, "开源不是保证成交，而是扩大表达、触达和响应机会面。"],
  [7, "讲清楚 AI 先减少低价值重复劳动，人仍负责审核、判断、优化和确认。"],
  [8, "把个人会用和企业接入分开：资料、场景、模板、审核和负责人要进入系统。"],
  [9, "进入虚拟花洒演示产品：它用于说明资料如何生成业务素材，不代表真实可售商品。"],
  [10, "先读事实再组织表达：功能、材质、场景和客户问题都必须来自资料。"],
  [11, "把参数翻译成客户利益，但不能创造事实或补未确认参数。"],
  [12, "展示同一份利益母版如何生成朋友圈、海报和跟进话术。"],
  [13, "视频先有脚本再拍摄：45 秒分镜来自痛点、卖点、场景和咨询动作。"],
  [14, "外贸、客服、销售都可起草；MOQ、价格、质保、交期必须待人工确认。"],
  [15, "强调多部门复用同一资料包；效率很快，但企业落地不能只看生成速度。"],
  [16, "从生成速度切到安全边界：资料、工具、内容、权限是四个入口。"],
  [17, "资料先分级，工具先准入；公开资料、脱敏资料和高敏资料要分开。"],
  [18, "AI 生成内容可以快，但发布、报价、承诺和自动执行必须人工确认。"],
  [19, "不要先问哪个工具火，先用重复最多、资料最散、最缺模板、30 天可验证来选场景。"],
  [20, "把行动拆成今天、30 分钟、3 天、3 个月；先做样板，再形成能力。"],
  [21, "收束三句话：现在入场是红利，个人会用不等于企业接入，先跑一个真实场景。"]
]);

function buildSpeakerNote(beatId: string): SpeakerNote {
  const beat = beats.find((item) => item.id === beatId);

  if (!beat) {
    return {
      beatId,
      note: "未找到对应 Beat；请回到当前章节主线讲述，不补充未确认事实。",
      status: "APPROVED"
    };
  }

  const scene = sceneById.get(beat.sceneId);
  const guide = scene ? sceneNoteGuides.get(scene.sceneNumber) : undefined;
  const screenTitle = scene?.screenCopy.title ?? "当前主屏";
  const screenSupport = scene?.screenCopy.support ?? "";

  return {
    beatId: beat.id,
    note: [
      `讲师提示：${beat.label}。`,
      guide ?? "围绕当前主屏讲一个清晰判断，不展开未确认业务事实。",
      `主屏承载：“${screenTitle}”${screenSupport ? `，辅助信息：“${screenSupport}”` : ""}。`,
      "只讲已给出的演示资料；真实产品图、二维码、价格、MOQ、质保和交期仍需人工确认。"
    ].join(""),
    status: "APPROVED"
  };
}

export const speakerNotesByBeatId = new Map(
  beats.map((beat) => [
    beat.id,
    buildSpeakerNote(beat.id)
  ])
);
