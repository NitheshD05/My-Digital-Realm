// @ts-ignore
import hackerScript from "./scripts/hackerEffects.inline"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

const HackerEffects: QuartzComponent = () => {
  // Renders nothing visible — effects are driven purely by JS and CSS
  return <div id="hacker-effects-mount" style="display:none" aria-hidden="true" />
}

HackerEffects.afterDOMLoaded = hackerScript

export default (() => HackerEffects) satisfies QuartzComponentConstructor
