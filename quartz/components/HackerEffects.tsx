// @ts-ignore
import hackerScript from "./scripts/hackerEffects.inline"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

const HackerEffects: QuartzComponent = () => {
  // cursor-dot and cursor-ring are rendered server-side so micromorph
  // sees them in every page's HTML and never removes them during SPA nav.
  // CSS keeps them display:none by default; JS enables them on pointer devices.
  return (
    <>
      <div id="hacker-effects-mount" style="display:none" aria-hidden="true" />
      <div id="cursor-dot" aria-hidden="true" />
      <div id="cursor-ring" aria-hidden="true" />
    </>
  )
}

HackerEffects.afterDOMLoaded = hackerScript

export default (() => HackerEffects) satisfies QuartzComponentConstructor
