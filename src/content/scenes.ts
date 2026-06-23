import type { BeatId, SceneId, SceneSpec, ScreenCopy } from "@/presentation/core/state-types";

type SceneSeed = {
  readonly sceneNumber: number;
  readonly chapter: string;
  readonly title: string;
  readonly support: string;
  readonly finalLine: string;
  readonly beatCount: number;
};

const sceneSeeds: readonly SceneSeed[] = [
  { sceneNumber: 1, chapter: "第一章·做出判断", title: "AI 效率红利", support: "从第一个真实业务场景接入", finalLine: "现在，要不要接入？", beatCount: 3 },
  { sceneNumber: 2, chapter: "第一章·做出判断", title: "经营判断", support: "不是工具清单，不是未来想象", finalLine: "现在，要不要低成本接入？", beatCount: 4 },
  { sceneNumber: 3, chapter: "第一章·做出判断", title: "每一轮浪潮，都在重排效率", support: "客户习惯 / 获客方式 / 表达速度 / 经验复用", finalLine: "先被拉开的，是人效差距", beatCount: 7 },
  { sceneNumber: 4, chapter: "第一章·做出判断", title: "现在入场是红利，观望以后是补课", support: "低成本验证", finalLine: "差距不是突然出现，而是每天一点点累积", beatCount: 7 },
  { sceneNumber: 5, chapter: "第二章·老板的四本账", title: "AI 的价值，看四本账", support: "开源 / 节流 / 提效 / 沉淀", finalLine: "先讲开源", beatCount: 4 },
  { sceneNumber: 6, chapter: "第二章·老板的四本账", title: "开源", support: "扩大表达、触达与响应", finalLine: "扩大机会面，不等于承诺成交", beatCount: 6 },
  { sceneNumber: 7, chapter: "第二章·老板的四本账", title: "节流 / 提效", support: "减少重复，缩短路径", finalLine: "人不消失，工作重心改变", beatCount: 8 },
  { sceneNumber: 8, chapter: "第二章·老板的四本账", title: "沉淀为能力", support: "个人会用 ≠ 企业接入", finalLine: "先跑一个真实样板", beatCount: 7 },
  { sceneNumber: 9, chapter: "第三章·真实产品与业务生成", title: "一个真实产品", support: "从一份真实资料开始", finalLine: "同一份资料，能变成什么？", beatCount: 5 },
  { sceneNumber: 10, chapter: "第三章·真实产品与业务生成", title: "一份真实资料", support: "AI 先读事实，再组织表达", finalLine: "选择一个真实参数", beatCount: 6 },
  { sceneNumber: 11, chapter: "第三章·真实产品与业务生成", title: "参数不等于卖点", support: "翻译事实，不创造事实", finalLine: "从参数，到客户利益", beatCount: 6 },
  { sceneNumber: 12, chapter: "第三章·真实产品与业务生成", title: "卖点开始工作", support: "朋友圈 / 海报 / 跟进话术", finalLine: "同一来源，不同表达", beatCount: 6 },
  { sceneNumber: 13, chapter: "第三章·真实产品与业务生成", title: "先有脚本，再组织拍摄", support: "每个镜头都有业务目的", finalLine: "45 秒，先把逻辑排清楚", beatCount: 8 },
  { sceneNumber: 14, chapter: "第三章·真实产品与业务生成", title: "同一份资料，多种输出", support: "AI 可以起草，不能替企业确认事实", finalLine: "未知字段：待人工确认", beatCount: 7 },
  { sceneNumber: 15, chapter: "第三章·真实产品与业务生成", title: "一个资料包，多部门复用", support: "市场 / 销售 / 视频 / 外贸 / 客服", finalLine: "快，还不够", beatCount: 8 },
  { sceneNumber: 16, chapter: "第四章·安全不是刹车，而是边界", title: "AI 不是不能用，是不能乱用", support: "安全、可控、有边界", finalLine: "资料 / 工具 / 内容 / 权限", beatCount: 6 },
  { sceneNumber: 17, chapter: "第四章·安全不是刹车，而是边界", title: "资料 / 工具", support: "哪些能用，哪些要脱敏，哪些不能进入", finalLine: "先分级，再接入", beatCount: 9 },
  { sceneNumber: 18, chapter: "第四章·安全不是刹车，而是边界", title: "内容 / 权限", support: "生成可以快，发布和执行必须确认", finalLine: "边界是为了放心用", beatCount: 9 },
  { sceneNumber: 19, chapter: "第五章·找到第一个场景", title: "第一个场景，从哪里开始？", support: "重复最多 / 资料最散 / 最缺模板 / 30 天可验证", finalLine: "先选一个最值得验证的场景", beatCount: 9 },
  { sceneNumber: 20, chapter: "第六章·从样板到能力", title: "从样板到能力", support: "今天 / 30 分钟 / 3 天 / 3 个月", finalLine: "先判断，再验证，再固化", beatCount: 10 },
  { sceneNumber: 21, chapter: "第六章·从样板到能力", title: "先跑出第一个样板", support: "不用先全公司改造", finalLine: "一个真实场景，先跑通", beatCount: 9 }
];

export const toSceneId = (sceneNumber: number): SceneId =>
  `scene-${String(sceneNumber).padStart(2, "0")}` as SceneId;

export const toBeatId = (sceneNumber: number, beatNumber: number): BeatId =>
  `${String(sceneNumber).padStart(2, "0")}.${beatNumber}` as BeatId;

const toScreenCopy = (seed: SceneSeed): ScreenCopy => ({
  title: seed.title,
  support: seed.support,
  finalLine: seed.finalLine,
  status: "APPROVED"
});

export const scenes: readonly SceneSpec[] = sceneSeeds.map((seed) => ({
  id: toSceneId(seed.sceneNumber),
  sceneNumber: seed.sceneNumber,
  chapter: seed.chapter,
  title: seed.title,
  screenCopy: toScreenCopy(seed),
  beatIds: Array.from({ length: seed.beatCount }, (_, index) =>
    toBeatId(seed.sceneNumber, index + 1)
  )
}));

export const sceneById = new Map(scenes.map((scene) => [scene.id, scene]));
