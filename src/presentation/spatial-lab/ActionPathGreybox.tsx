export function ActionPathGreybox() {
  return (
    <section className="spatial-lab-action-path-geometry" data-actor-geometry="action-path">
      <span className="action-path-kicker">行动路径</span>
      <svg aria-hidden="true" viewBox="0 0 360 168">
        <path className="spatial-lab-action-path-line" d="M28 128 C88 48 156 124 224 70 S318 42 338 26" />
        <circle className="spatial-lab-action-path-node" cx="28" cy="128" r="8" />
        <circle className="spatial-lab-action-path-node signal" cx="128" cy="74" r="9" />
        <circle className="spatial-lab-action-path-node signal" cx="224" cy="70" r="11" />
        <circle className="spatial-lab-action-path-node" cx="338" cy="26" r="8" />
      </svg>
      <div className="action-path-labels" aria-hidden="true">
        <span>今天</span>
        <span>30 分钟</span>
        <span>3 天</span>
        <span>3 个月</span>
      </div>
    </section>
  );
}
