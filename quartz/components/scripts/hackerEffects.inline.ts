// ═══════════════════════════════════════════════════════════════
// CYBER REALM — Interactive Hacker Effects
// NitheshD05 | Penetration Tester | Security Researcher
// ═══════════════════════════════════════════════════════════════

// ── Matrix Rain Canvas ──────────────────────────────────────────
function initMatrixRain() {
  // Remove existing canvas if any (SPA nav safety)
  const existing = document.getElementById("matrix-rain")
  if (existing) return

  const canvas = document.createElement("canvas")
  canvas.id = "matrix-rain"
  document.body.prepend(canvas)

  const ctx = canvas.getContext("2d")!

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener("resize", resize)

  const chars =
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEF<>{}[]|/\\!@#$%^&*ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷｻｳｽﾊﾋｸ"
  const fontSize = 13
  let columns = Math.floor(canvas.width / fontSize)
  let drops: number[] = Array(columns).fill(1).map(() => Math.random() * -100)

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < drops.length; i++) {
      // Leading char is brighter
      const isHead = drops[i] > 0 && Math.random() > 0.8
      ctx.fillStyle = isHead ? "#ffffff" : "#00ff41"
      ctx.shadowBlur = isHead ? 8 : 3
      ctx.shadowColor = "#00ff41"
      ctx.font = `${fontSize}px "IBM Plex Mono", monospace`

      const char = chars[Math.floor(Math.random() * chars.length)]
      ctx.fillText(char, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }

  const matrixInterval = setInterval(draw, 45)
  // Store interval id for cleanup
  ;(canvas as any)._matrixInterval = matrixInterval
}

// ── Boot Sequence Overlay ────────────────────────────────────────
function initBootSequence() {
  if (sessionStorage.getItem("cyberRealm_booted")) return
  sessionStorage.setItem("cyberRealm_booted", "1")

  const overlay = document.createElement("div")
  overlay.id = "boot-sequence"

  const ascii = `
   ██████╗██╗   ██╗██████╗ ███████╗██████╗     ██████╗ ███████╗ █████╗ ██╗     ███╗   ███╗
  ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗    ██╔══██╗██╔════╝██╔══██╗██║     ████╗ ████║
  ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝    ██████╔╝█████╗  ███████║██║     ██╔████╔██║
  ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗    ██╔══██╗██╔══╝  ██╔══██║██║     ██║╚██╔╝██║
  ╚██████╗   ██║   ██████╔╝███████╗██║  ██║    ██║  ██║███████╗██║  ██║███████╗██║ ╚═╝ ██║
   ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝`

  overlay.innerHTML = `
    <div class="boot-content">
      <pre class="boot-ascii">${ascii}</pre>
      <pre class="boot-text"></pre>
      <div class="boot-bar-wrap"><div class="boot-bar"></div></div>
    </div>
  `
  document.body.appendChild(overlay)

  const lines = [
    "[INIT] Booting Cyber Realm OS v4.2.3...",
    "[SYS]  Loading kernel modules................ OK",
    "[NET]  Establishing encrypted tunnel......... OK",
    "[SEC]  Bypassing perimeter defenses.......... OK",
    "[DB]   Mounting HTB writeups database........ OK",
    "[TLS]  Generating session certificates....... OK",
    "[EXP]  Loading exploit frameworks............ OK",
    "[RECON]Calibrating reconnaissance tools...... OK",
    "[PRIV] Elevating privileges.................. OK",
    "",
    "[INFO] OPERATOR : NitheshD05",
    "[INFO] RANK     : Top 400 globally on HackTheBox",
    "[INFO] CERT     : MSc Information Security",
    "",
    "[OK]   ACCESS GRANTED. WELCOME TO THE CYBER REALM.",
  ]

  const pre = overlay.querySelector(".boot-text") as HTMLPreElement
  const bar = overlay.querySelector(".boot-bar") as HTMLDivElement
  let lineIndex = 0
  let charIndex = 0
  let text = ""

  function typeChar() {
    if (lineIndex >= lines.length) {
      bar.style.width = "100%"
      setTimeout(() => {
        overlay.style.opacity = "0"
        overlay.style.transition = "opacity 0.8s ease"
        setTimeout(() => overlay.remove(), 800)
      }, 600)
      return
    }

    const line = lines[lineIndex]
    const progress = Math.floor((lineIndex / lines.length) * 95)
    bar.style.width = `${progress}%`

    if (charIndex < line.length) {
      text += line[charIndex]
      charIndex++
      pre.textContent = text + "█"
      setTimeout(typeChar, Math.random() * 15 + 5)
    } else {
      text += "\n"
      lineIndex++
      charIndex = 0
      pre.textContent = text + "█"
      const delay = line === "" ? 50 : Math.random() * 60 + 30
      setTimeout(typeChar, delay)
    }
  }

  setTimeout(typeChar, 400)
}

// ── Glitch Title Effect ─────────────────────────────────────────
function initGlitchTitle() {
  const title = document.querySelector(".page-title a") as HTMLElement
  if (!title) return

  const originalText = title.textContent || ""
  if (!title.dataset.text) title.dataset.text = originalText
  const glitchChars = "!<>-_\\/[]{}—=+*^?#@$%&|01アイウエカキ"

  let glitchTimer: ReturnType<typeof setInterval> | null = null

  const doGlitch = () => {
    let iterations = 0
    const scramble = setInterval(() => {
      title.textContent = originalText
        .split("")
        .map((char, index) => {
          if (char === " ") return " "
          if (index < Math.floor(iterations)) return originalText[index]
          return glitchChars[Math.floor(Math.random() * glitchChars.length)]
        })
        .join("")

      iterations += 1 / 2
      if (iterations >= originalText.length) {
        clearInterval(scramble)
        title.textContent = originalText
      }
    }, 25)
  }

  // Trigger glitch periodically
  glitchTimer = setInterval(() => {
    if (Math.random() > 0.6) doGlitch()
  }, 3000)

  // Also glitch on hover
  title.addEventListener("mouseenter", doGlitch)

  // Cleanup on nav
  document.addEventListener(
    "nav",
    () => {
      if (glitchTimer) clearInterval(glitchTimer)
    },
    { once: true },
  )
}

// ── Article Title Scramble ───────────────────────────────────────
function initScrambleTitle() {
  const h1 = document.querySelector("h1.article-title") as HTMLElement
  if (!h1) return

  const originalText = h1.textContent || ""
  const chars = "01アイウエカキABCDEF!@#$%><{}[]"
  let frame = 0

  const interval = setInterval(() => {
    h1.textContent = originalText
      .split("")
      .map((char, index) => {
        if (char === " ") return " "
        if (index < frame / 2) return originalText[index]
        return chars[Math.floor(Math.random() * chars.length)]
      })
      .join("")

    frame++
    if (frame / 2 >= originalText.length) {
      clearInterval(interval)
      h1.textContent = originalText
    }
  }, 28)
}

// ── Cursor Trail ────────────────────────────────────────────────
function initCursorTrail() {
  if (document.getElementById("cursor-dot")) return

  const dot = document.createElement("div")
  dot.id = "cursor-dot"
  document.body.appendChild(dot)

  const ring = document.createElement("div")
  ring.id = "cursor-ring"
  document.body.appendChild(ring)

  let mouseX = 0,
    mouseY = 0
  let ringX = 0,
    ringY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    dot.style.left = `${mouseX}px`
    dot.style.top = `${mouseY}px`
  })

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12
    ringY += (mouseY - ringY) * 0.12
    ring.style.left = `${ringX}px`
    ring.style.top = `${ringY}px`
    requestAnimationFrame(animateRing)
  }
  animateRing()

  // Expand ring on link hover
  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("expanded"))
    el.addEventListener("mouseleave", () => ring.classList.remove("expanded"))
  })
}

// ── Typing Placeholder for Search ───────────────────────────────
function initSearchPlaceholder() {
  const searchInput = document.querySelector("#search-bar") as HTMLInputElement
  if (!searchInput) return

  const phrases = [
    "$ nmap -sV -sC target",
    "$ gobuster dir -u target -w wordlist",
    "$ hydra -l admin -P rockyou.txt target",
    "$ searchsploit apache 2.4",
    "$ find / -perm -4000 2>/dev/null",
    "$ grep -r 'password' .",
    "$ msfconsole -q",
    "Search notes...",
  ]

  let phraseIndex = 0
  let charIdx = 0
  let deleting = false
  let paused = false

  function animatePlaceholder() {
    if (document.activeElement === searchInput) {
      setTimeout(animatePlaceholder, 200)
      return
    }

    const current = phrases[phraseIndex]

    if (paused) {
      paused = false
      deleting = true
      setTimeout(animatePlaceholder, 1200)
      return
    }

    if (!deleting) {
      searchInput.placeholder = current.slice(0, charIdx + 1)
      charIdx++
      if (charIdx === current.length) {
        paused = true
        setTimeout(animatePlaceholder, 80)
        return
      }
      setTimeout(animatePlaceholder, 60)
    } else {
      searchInput.placeholder = current.slice(0, charIdx - 1)
      charIdx--
      if (charIdx === 0) {
        deleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
      }
      setTimeout(animatePlaceholder, 30)
    }
  }

  animatePlaceholder()
}

// ── Hacker Tooltip on Cyber Keywords ────────────────────────────
function initKeywordBadges() {
  const toolBadges: Record<string, string> = {
    Nmap: "Network Scanner",
    nmap: "Network Scanner",
    Metasploit: "Exploit Framework",
    Hydra: "Password Brute-forcer",
    Gobuster: "Directory Fuzzer",
    ffuf: "Web Fuzzer",
    SQLMap: "SQL Injection Tool",
    Burp: "Web Proxy",
    Mimikatz: "Credential Dumper",
    Hashcat: "Hash Cracker",
    "John the Ripper": "Hash Cracker",
    Impacket: "Network Protocol Toolkit",
    BloodHound: "AD Recon Tool",
    Ligolo: "Tunneling Tool",
    Chisel: "TCP Tunneling Tool",
  }

  const articleBody = document.querySelector(".popover-hint") as HTMLElement
  if (!articleBody) return

  Object.entries(toolBadges).forEach(([tool, desc]) => {
    const walker = document.createTreeWalker(articleBody, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    let node: Node | null
    while ((node = walker.nextNode())) {
      if ((node as Text).textContent?.includes(tool)) {
        nodes.push(node as Text)
      }
    }

    nodes.forEach((textNode) => {
      const parent = textNode.parentNode
      if (!parent || parent.nodeName === "CODE" || parent.nodeName === "PRE") return

      const text = textNode.textContent || ""
      const idx = text.indexOf(tool)
      if (idx === -1) return

      const before = document.createTextNode(text.slice(0, idx))
      const span = document.createElement("span")
      span.className = "tool-badge"
      span.textContent = tool
      span.title = desc
      span.setAttribute("data-tool", desc)
      const after = document.createTextNode(text.slice(idx + tool.length))

      parent.insertBefore(before, textNode)
      parent.insertBefore(span, textNode)
      parent.insertBefore(after, textNode)
      parent.removeChild(textNode)
    })
  })
}

// ── Status Bar ──────────────────────────────────────────────────
function initStatusBar() {
  if (document.getElementById("cyber-statusbar")) return

  const bar = document.createElement("div")
  bar.id = "cyber-statusbar"

  const now = new Date()
  const timeStr = now.toTimeString().slice(0, 8)

  bar.innerHTML = `
    <span class="sb-left">
      <span class="sb-dot"></span>
      <span>NitheshD05@CyberRealm</span>
      <span class="sb-sep">~</span>
      <span class="sb-path" id="sb-path">/home</span>
    </span>
    <span class="sb-center">
      <span class="sb-blink">▶</span> SECURE CONNECTION ESTABLISHED
    </span>
    <span class="sb-right">
      <span id="sb-time">${timeStr}</span>
      <span class="sb-sep">|</span>
      <span class="sb-status">STATUS: ONLINE</span>
    </span>
  `
  document.body.appendChild(bar)

  // Live clock
  setInterval(() => {
    const el = document.getElementById("sb-time")
    if (el) el.textContent = new Date().toTimeString().slice(0, 8)
  }, 1000)

  // Update path on navigation
  function updatePath() {
    const el = document.getElementById("sb-path")
    if (el) {
      const slug = window.location.pathname.replace(/\/$/, "") || "/home"
      el.textContent = slug
    }
  }
  updatePath()
  document.addEventListener("nav", updatePath)
}

// ── Scanline Flash on Navigation ────────────────────────────────
function initNavFlash() {
  document.addEventListener("nav", () => {
    const flash = document.createElement("div")
    flash.className = "nav-flash"
    document.body.appendChild(flash)
    setTimeout(() => flash.remove(), 400)
  })
}

// ── Console Easter Egg ──────────────────────────────────────────
function initConsoleEgg() {
  const style = "color: #00ff41; background: #000; font-size: 14px; font-family: monospace; padding: 4px 8px;"
  const styleWarn = "color: #ff2d78; background: #000; font-size: 12px; font-family: monospace; padding: 4px 8px;"

  console.log(
    "%c  ██████╗██╗   ██╗██████╗ ███████╗██████╗     ██████╗ ███████╗ █████╗ ██╗     ███╗   ███╗  ",
    style,
  )
  console.log("%c  NitheshD05 | Penetration Tester | MSc Information Security  ", style)
  console.log("%c  Top 400 Globally on HackTheBox  ", style)
  console.log("%c  ⚠  This site is protected. Unauthorized access is prohibited.  ", styleWarn)
  console.log("%c  GitHub: https://github.com/NitheshD05  ", style)
  console.log(
    "%c  HTB: https://app.hackthebox.com/profile/1701603  ",
    style,
  )
}

// ── Init All Effects ────────────────────────────────────────────
function runPageEffects() {
  initGlitchTitle()
  initScrambleTitle()
  initSearchPlaceholder()
  initKeywordBadges()
  // Refresh cursor badge bindings
  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const ring = document.getElementById("cursor-ring")
      if (ring) ring.classList.add("expanded")
    })
    el.addEventListener("mouseleave", () => {
      const ring = document.getElementById("cursor-ring")
      if (ring) ring.classList.remove("expanded")
    })
  })
}

// One-time init (persists across SPA navigation)
initMatrixRain()
initBootSequence()
initCursorTrail()
initStatusBar()
initNavFlash()
initConsoleEgg()

// Per-page init
runPageEffects()
document.addEventListener("nav", runPageEffects)
