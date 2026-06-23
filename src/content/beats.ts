import { sceneById, scenes, toBeatId, toSceneId } from "@/content/scenes";
import type {
  BeatSpec,
  SceneId,
  TransitionPreset
} from "@/presentation/core/state-types";

const beatLabelsByScene: readonly (readonly string[])[] = [
  ["点亮入口", "标题进入空间", "抛出经营问题"],
  ["工具墙进入", "概念墙进入", "清场，只留判断", "两个带走的判断"],
  ["电商", "短视频", "直播", "跨境", "AI", "改变的不是工具", "人效差距"],
  ["分路，但差距尚小", "一个小场景先跑", "补资料", "补流程与认知", "补样板", "补效率差距", "低成本验证，不是全面改造"],
  ["经营圆盘接管画面", "四本账被命名", "四种经营变化预演", "选择开源"],
  ["一份业务源点", "表达能力向外展开", "建立更多触达端", "响应从单向变双向", "价值边界", "重复劳动开始显形"],
  ["重复劳动被看见", "每次都从空白开始", "节流：重复路径收拢", "生成的是初稿", "人工审核仍在主路径上", "提效：工作路径缩短", "人的工作重心改变", "好结果不离开系统"],
  ["企业经验散落在不同位置", "个人经验只能完成一次", "好结果开始沉淀", "个人会用，不等于企业接入", "AI native 被解释成一套循环", "从“大系统”收敛到第一个场景", "为真实产品让出舞台"],
  ["真实产品被照亮", "产品身份被命名", "四类资料围绕产品", "从产品转向资料", "提出转换问题"],
  ["从产品照进入技术照", "四个资料章节打开", "产品局部拆解", "事实与部件连接", "客户问题进入资料包", "选择一个参数"],
  ["事实进入转换孔径", "客户利益从另一侧出现", "第二组：防烫设计", "第三组：硅胶出水嘴", "第四组：铜主体或实际主体材质", "形成一份利益母版"],
  ["利益母版进入内容容器", "变成社交内容", "社交卡变成海报", "海报分裂为销售条件分支", "同一来源，不同表达", "选择海报进入视频"],
  ["海报扩张为媒体工作台", "建立 45 秒时间轴", "00—05 秒：痛点钩子", "05—15 秒：恒温控制", "15—25 秒：家庭使用场景", "25—35 秒：易清洁细节", "35—45 秒：产品收束", "从分镜转向多种岗位输出"],
  ["外贸询盘进入", "已知事实进入回复初稿", "未知字段被阻止", "切换客服 FAQ", "切换销售异议处理", "三类输出并列", "准备部门重排"],
  ["产品与资料包回到中心", "市场轨道", "销售轨道", "视频、外贸与客服轨道", "所有输出回看同一来源", "效率开始加速", "全部冻结", "四个问题出现"],
  ["生成世界失去环境光", "接入环打开近黑空间", "边界包围业务对象", "四个问题变成四个入口", "主判断形成", "为四条红线准备舞台"],
  ["资料入口展开为三级门", "公开资料直接进入", "敏感字段先脱敏", "高敏资料被阻断", "资料边界形成", "工具入口接管画面", "白名单工具通过准入", "未知来源工具被阻断", "前两条红线完成"],
  ["内容入口展开为审核路径", "需要核对的字段被看见", "错误承诺被阻止", "人工核对与批准", "内容模块停靠，权限入口激活", "生成与执行分开", "明确确认后才执行", "四条边界形成完整操作回路", "安全边界准备变成诊断雷达"],
  ["安全边界展开为诊断雷达", "四个判断方向被命名", "候选场景进入雷达外圈", "示例一：产品资料到销售话术", "其他起点快速通过", "锁定“第一个场景”", "现场自测入口展开", "从自测回到行动判断", "扫描环从缺口展开为路线"],
  ["接入环完全展开为行动路线", "TODAY：看清趋势", "30 MIN：判断场景", "3 DAYS 总目标：做出第一个样板", "DAY 1：资料与安全边界初版", "DAY 2：业务样板", "DAY 3：流程、审核与 30 天行动表", "明确 3 天边界", "3 MONTHS：样板进入能力循环", "全路线收束"],
  ["路线开始重新闭合", "第一个样板填补缺口", "企业能力回路完成", "回收判断一：现在入场是红利", "回收判断二：个人会用不等于企业接入", "回收判断三：先跑一个真实场景", "CTA 与二维码展开", "进入稳定终幕", "Q&A 入口预备"]
];

const transitionForScene = (sceneNumber: number): TransitionPreset => {
  if ([1, 9, 21].includes(sceneNumber)) return "text-product-occlusion";
  if (sceneNumber >= 9 && sceneNumber <= 16) return "persistent-object";
  if ([12, 13, 14].includes(sceneNumber)) return "shared-container";
  if ([6, 7, 8, 17, 18, 20].includes(sceneNumber)) return "directional-cut";
  if ([3, 4, 5, 16, 19].includes(sceneNumber)) return "ring-portal";
  return "static-reconcile";
};

export const beats: readonly BeatSpec[] = beatLabelsByScene.flatMap(
  (labels, sceneIndex) => {
    const sceneNumber = sceneIndex + 1;
    const sceneId = toSceneId(sceneNumber);
    const scene = sceneById.get(sceneId);

    if (!scene) {
      throw new Error(`Missing scene for ${sceneId}`);
    }

    return labels.map((label, beatIndex): BeatSpec => {
      const beatId = toBeatId(sceneNumber, beatIndex + 1);

      return {
        id: beatId,
        sceneId,
        order: beatsOrder(sceneNumber, beatIndex),
        label,
        speakerCue: label,
        screenCopy: scene.screenCopy,
        targetStateId: `target:${sceneId}:${beatId}`,
        transitionPreset: transitionForScene(sceneNumber),
        reducedMotionStateId: `reduced:${sceneId}:${beatId}`
      };
    });
  }
);

function beatsOrder(sceneNumber: number, beatIndex: number) {
  const previousCount = scenes
    .filter((scene) => scene.sceneNumber < sceneNumber)
    .reduce((total, scene) => total + scene.beatIds.length, 0);

  return previousCount + beatIndex + 1;
}

export const beatById = new Map(beats.map((beat) => [beat.id, beat]));

export const beatsBySceneId = new Map<SceneId, readonly BeatSpec[]>(
  scenes.map((scene) => [
    scene.id,
    beats.filter((beat) => beat.sceneId === scene.id)
  ])
);
