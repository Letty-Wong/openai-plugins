import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-28R resets the project contract toward presenter-led spatial continuity", () => {
  const agents = readFileSync("AGENTS.md", "utf8");

  assert.match(agents, /Presenter Mode is the primary mode/);
  assert.match(agents, /not scroll-position driven/);
  assert.match(agents, /must never map `scrollY` to Scene or Beat indexes/);
  assert.match(agents, /Scene and Beat are state\/cue data, not full-page scroll sections/);
  assert.match(agents, /Scene 01-08 vertical down/);
  assert.match(agents, /Scene 08-09[\s\S]*horizontal product journey/);
  assert.match(agents, /Scene 15-16[\s\S]*Z axis/);
  assert.match(agents, /Scene 20-21[\s\S]*Z axis/);
  assert.match(agents, /Do not use vertical upward travel as a macro route/);
  assert.match(agents, /Only three major spatial transitions are allowed/);
  assert.match(agents, /`IntegrationRing` is the global continuity actor/);
  assert.match(agents, /`ArtifactSystem`/);
  assert.match(agents, /Stop strengthening the page-chain scroll layers/);
});

test("WP-28R removes scroll position as a Beat-state authority", () => {
  const shellSource = readFileSync("src/presentation/core/PresentationShell.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(shellSource, /data-navigation-mode="presenter-cue-and-wheel"/);
  assert.match(shellSource, /addEventListener\("wheel", handleWheel, \{ passive: false \}\)/);
  assert.match(shellSource, /nextBeat\(current\) : previousBeat\(current\)/);
  assert.doesNotMatch(shellSource, /addEventListener\("scroll"/);
  assert.doesNotMatch(shellSource, /window\.scrollY/);
  assert.doesNotMatch(shellSource, /window\.scrollTo/);
  assert.doesNotMatch(shellSource, /rawIndex/);
  assert.doesNotMatch(shellSource, /targetBeat/);
  assert.doesNotMatch(shellSource, /native-scroll-driver/);
  assert.doesNotMatch(shellSource, /native-scroll-beat/);
  assert.doesNotMatch(presentationCss, /\.native-scroll-driver/);
  assert.doesNotMatch(presentationCss, /\.native-scroll-beat/);
});
