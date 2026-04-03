// @ts-ignore
import hackerScript from "./scripts/hackerEffects.inline"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

const HackerEffects: QuartzComponent = () => {
  return <div id="hacker-effects-mount" style="display:none" aria-hidden="true" />
}

HackerEffects.afterDOMLoaded = hackerScript

export default (() => HackerEffects) satisfies QuartzComponentConstructor
