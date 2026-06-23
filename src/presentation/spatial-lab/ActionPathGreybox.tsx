export function ActionPathGreybox() {
  return (
    <svg
      aria-hidden="true"
      className="spatial-lab-action-path-geometry"
      data-actor-geometry="action-path"
      viewBox="0 0 320 150"
    >
      <path className="spatial-lab-action-path-line" d="M24 112 C82 42 144 116 204 62 S282 38 296 24" />
      <circle className="spatial-lab-action-path-node" cx="24" cy="112" r="8" />
      <circle className="spatial-lab-action-path-node signal" cx="204" cy="62" r="10" />
      <circle className="spatial-lab-action-path-node" cx="296" cy="24" r="8" />
    </svg>
  );
}
