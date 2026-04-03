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

  const isMobile = window.innerWidth < 800
  const fontSize = isMobile ? 18 : 14
  const fpsTarget = isMobile ? 10 : 18   // target FPS, not ms interval

  let columns = Math.floor(canvas.width / fontSize)
  let drops: number[] = Array(columns).fill(1).map(() => Math.random() * -100)

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.045)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // No shadowBlur — it is the single biggest canvas perf killer
    ctx.font = `${fontSize}px monospace`

    for (let i = 0; i < drops.length; i++) {
      const isHead = drops[i] > 0 && Math.random() > 0.85
      ctx.fillStyle = isHead ? "#7fff7f" : "#00c832"
      const char = chars[Math.floor(Math.random() * chars.length)]
      ctx.fillText(char, i * fontSize, drops[i] * fontSize)
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
      drops[i]++
    }
  }

  // requestAnimationFrame + time throttle — pauses when tab is hidden
  let lastFrame = 0
  const interval = 1000 / fpsTarget
  function loop(ts: number) {
    requestAnimationFrame(loop)
    if (ts - lastFrame < interval) return
    lastFrame = ts
    draw()
  }
  requestAnimationFrame(loop)
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
// cursor-dot and cursor-ring are rendered in HackerEffects.tsx so they exist
// in every page's static HTML. Micromorph preserves them across SPA navigation
// because it sees matching IDs in both old and new DOM — no re-creation needed.

function initCursorTrail() {
  const isTouch = !window.matchMedia("(hover: hover) and (pointer: fine)").matches
  if (isTouch) return

  // Show the elements (CSS hides them by default)
  const dot = document.getElementById("cursor-dot")
  const ring = document.getElementById("cursor-ring")
  if (!dot || !ring) return
  dot.style.display = "block"
  ring.style.display = "block"

  let mouseX = 0, mouseY = 0
  let ringX = 0,  ringY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    // Always look up by ID — micromorph may have morphed the element reference
    const d = document.getElementById("cursor-dot")
    if (d) { d.style.left = `${mouseX}px`; d.style.top = `${mouseY}px` }
  })

  ;(function animateRing() {
    ringX += (mouseX - ringX) * 0.12
    ringY += (mouseY - ringY) * 0.12
    const r = document.getElementById("cursor-ring")
    if (r) { r.style.left = `${ringX}px`; r.style.top = `${ringY}px` }
    requestAnimationFrame(animateRing)
  })()
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

// ── Scroll Reveal ───────────────────────────────────────────────
function initScrollReveal() {
  // Skip if user prefers reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
  )

  // Headings slide from left
  document.querySelectorAll("article h2, article h3").forEach((el, i) => {
    if (!el.classList.contains("reveal-left")) {
      el.classList.add("reveal-left")
      ;(el as HTMLElement).style.transitionDelay = `${i * 0}ms` // no stagger on headings
      observer.observe(el)
    }
  })

  // Body content fades up with stagger
  const revealEls = document.querySelectorAll(
    "article p, article li, article pre, article blockquote, article table, article img",
  )
  revealEls.forEach((el, i) => {
    if (!el.classList.contains("reveal")) {
      el.classList.add("reveal")
      ;(el as HTMLElement).style.transitionDelay = `${Math.min(i * 35, 280)}ms`
      observer.observe(el)
    }
  })
}

// ── Live Packets Counter in Status Bar ─────────────────────────
function initPacketsCounter() {
  const sb = document.getElementById("cyber-statusbar")
  if (!sb || document.getElementById("sb-packets")) return

  const right = sb.querySelector(".sb-right") as HTMLElement
  if (!right) return

  const wrap = document.createElement("span")
  wrap.innerHTML = `<span class="sb-sep">|</span> PKT: <span id="sb-packets">0</span>`
  right.prepend(wrap)

  let packets = Math.floor(Math.random() * 4000) + 1000

  setInterval(() => {
    packets += Math.floor(Math.random() * 12) + 1
    const el = document.getElementById("sb-packets")
    if (el) el.textContent = packets.toLocaleString()
  }, 400)
}

// ── Animate h2 underline trace on scroll ───────────────────────
function initH2Trace() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 },
  )

  document.querySelectorAll("article h2").forEach((el) => {
    observer.observe(el)
  })
}

// ── Interactive Terminal Popup ──────────────────────────────────
function initHackerTerminal() {
  if (document.getElementById("hacker-terminal-btn")) return

  // Floating button
  const btn = document.createElement("button")
  btn.id = "hacker-terminal-btn"
  btn.innerHTML = `<span>&gt;_</span>`
  btn.title = "Open Terminal"
  document.body.appendChild(btn)

  // Terminal modal
  const modal = document.createElement("div")
  modal.id = "hacker-terminal"
  modal.innerHTML = `
    <div class="ht-titlebar">
      <span class="ht-dots"><span></span><span></span><span></span></span>
      <span class="ht-title">NitheshD05@CyberRealm:~$</span>
      <button class="ht-close">✕</button>
    </div>
    <div class="ht-body">
      <pre class="ht-output">Welcome to Cyber Realm Terminal v1.0
Type <span class="ht-cmd">help</span> for available commands.
</pre>
      <div class="ht-input-row">
        <span class="ht-prompt">NitheshD05@CyberRealm:~$&nbsp;</span>
        <input class="ht-input" type="text" autocomplete="off" spellcheck="false" autofocus />
      </div>
    </div>
  `
  document.body.appendChild(modal)

  const output = modal.querySelector(".ht-output") as HTMLPreElement
  const input = modal.querySelector(".ht-input") as HTMLInputElement

  const commands: Record<string, () => string> = {
    help: () =>
      `Available commands:\n  <span class="ht-cmd">whoami</span>     — About NitheshD05\n  <span class="ht-cmd">skills</span>     — Skill proficiency\n  <span class="ht-cmd">htb</span>        — HackTheBox stats\n  <span class="ht-cmd">contact</span>    — Get in touch\n  <span class="ht-cmd">certs</span>      — Certifications\n  <span class="ht-cmd">ls</span>         — List site sections\n  <span class="ht-cmd">clear</span>      — Clear terminal\n  <span class="ht-cmd">exit</span>       — Close terminal`,

    whoami: () =>
      `<span class="ht-green">NitheshD05</span> — Nithesh Dhakshanamoorthy\nMSc Information Security | Penetration Tester\nOrigin: India → UK\nSpecialisation: Web &amp; Network Penetration Testing\nVisa: Graduate Route (UK)`,

    skills: () =>
      `<span class="ht-cyan">[SKILL PROFICIENCY SCAN]</span>\n\nPenetration Testing  <span class="ht-bar" data-val="95">░░░░░░░░░░░░░░░░░░░░</span> 95%\nNetwork Security     <span class="ht-bar" data-val="85">░░░░░░░░░░░░░░░░░░░░</span> 85%\nWeb App Testing      <span class="ht-bar" data-val="88">░░░░░░░░░░░░░░░░░░░░</span> 88%\nActive Directory     <span class="ht-bar" data-val="78">░░░░░░░░░░░░░░░░░░░░</span> 78%\nPython / Scripting   <span class="ht-bar" data-val="82">░░░░░░░░░░░░░░░░░░░░</span> 82%\nCTF / HTB            <span class="ht-bar" data-val="90">░░░░░░░░░░░░░░░░░░░░</span> 90%`,

    htb: () =>
      `<span class="ht-green">[HACKTHEBOX STATS]</span>\n\nProfile  : app.hackthebox.com/profile/1701603\nGlobal Rank : <span class="ht-cyan">Top 400</span> worldwide\nMachines    : 50+ pwned\nStatus      : <span class="ht-green">Active</span>`,

    contact: () =>
      `<span class="ht-cyan">[CONTACT INFO]</span>\n\nEmail    : nitheshdm05@gmail.com\nLinkedIn : linkedin.com/in/nithesh-dhakshanamoorthy-2541111b3\nGitHub   : github.com/NitheshD05\nHTB      : app.hackthebox.com/profile/1701603\nX        : x.com/05Nithesh`,

    certs: () =>
      `<span class="ht-cyan">[CERTIFICATIONS &amp; PROGRESS]</span>\n\n[✓] MSc Information Security (UK)\n[✓] Top 3% TryHackMe (4M+ users)\n[✓] Top 400 HackTheBox Globally\n[~] CPTS — <span class="ht-green">In Progress</span>`,

    ls: () =>
      `<span class="ht-green">drwxr-xr-x</span>  CV/\n<span class="ht-green">drwxr-xr-x</span>  HTB-Writeups/\n<span class="ht-green">drwxr-xr-x</span>  Blogs/\n<span class="ht-green">-rw-r--r--</span>  Cover-Letter.md\n<span class="ht-green">-rw-r--r--</span>  Cheat-Sheet.md\n<span class="ht-green">-rw-r--r--</span>  Command-Dump.md`,

    clear: () => {
      output.innerHTML = ""
      return ""
    },

    exit: () => {
      setTimeout(() => modal.classList.remove("open"), 200)
      return `<span class="ht-pink">Session terminated.</span>`
    },
  }

  function printLine(html: string) {
    if (!html) return
    output.innerHTML += html + "\n"
    output.scrollTop = output.scrollHeight
    // Animate skill bars if present
    output.querySelectorAll(".ht-bar[data-val]").forEach((bar) => {
      const val = parseInt((bar as HTMLElement).dataset.val || "0")
      const filled = Math.round(val / 5)
      bar.textContent = "█".repeat(filled) + "░".repeat(20 - filled)
    })
  }

  function handleCommand(cmd: string) {
    const trimmed = cmd.trim().toLowerCase()
    output.innerHTML += `<span class="ht-prompt-echo">NitheshD05@CyberRealm:~$</span> ${cmd}\n`
    if (trimmed === "") {
      output.scrollTop = output.scrollHeight
      return
    }
    const fn = commands[trimmed]
    if (fn) {
      printLine(fn())
    } else {
      printLine(`<span class="ht-pink">command not found: ${cmd}. Type <span class="ht-cmd">help</span></span>`)
    }
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleCommand(input.value)
      input.value = ""
    }
  })

  btn.addEventListener("click", () => {
    modal.classList.toggle("open")
    if (modal.classList.contains("open")) setTimeout(() => input.focus(), 100)
  })
  modal.querySelector(".ht-close")!.addEventListener("click", () => modal.classList.remove("open"))
}

// ── 3D Card Tilt on Internal Links ─────────────────────────────
function init3DTilt() {
  const isTouch = !window.matchMedia("(hover: hover) and (pointer: fine)").matches
  if (isTouch) return

  document.querySelectorAll<HTMLElement>("a.internal").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      card.style.transform = `perspective(300px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-2px) scale(1.02)`
    })
    card.addEventListener("mouseleave", () => {
      card.style.transform = ""
    })
  })
}

// ── Fake IP + Session in Status Bar ────────────────────────────
function initFakeIP() {
  const sb = document.getElementById("cyber-statusbar")
  if (!sb || document.getElementById("sb-ip")) return

  const right = sb.querySelector(".sb-right") as HTMLElement
  if (!right) return

  const wrap = document.createElement("span")
  wrap.innerHTML = `<span class="sb-sep">|</span> <span id="sb-ip">10.10.x.x</span>`
  right.appendChild(wrap)

  const fakeOctet = () => Math.floor(Math.random() * 50 + 100)
  const updateIP = () => {
    const el = document.getElementById("sb-ip")
    if (el) el.textContent = `10.10.${fakeOctet()}.${fakeOctet()}`
  }
  updateIP()
  // Occasionally flicker IP (like VPN reconnect)
  setInterval(() => {
    if (Math.random() > 0.85) updateIP()
  }, 5000)
}

// ── Konami Code Easter Egg ──────────────────────────────────────
function initKonamiCode() {
  const sequence = [
    "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
    "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
    "b","a",
  ]
  let pos = 0
  document.addEventListener("keydown", (e) => {
    if (e.key === sequence[pos]) {
      pos++
      if (pos === sequence.length) {
        pos = 0
        triggerKonami()
      }
    } else {
      pos = 0
    }
  })

  function triggerKonami() {
    const flash = document.createElement("div")
    flash.id = "konami-flash"
    flash.innerHTML = `
      <div class="konami-content">
        <pre class="konami-ascii">
 ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗
 ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
 ███████║███████║██║     █████╔╝ █████╗  ██║  ██║
 ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██║  ██║
 ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██████╔╝
 ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝</pre>
        <p class="konami-msg">&gt; ROOT ACCESS GRANTED &lt;</p>
        <p class="konami-sub">You found the secret. Nice moves, hacker.</p>
      </div>`
    document.body.appendChild(flash)
    setTimeout(() => {
      flash.style.opacity = "0"
      flash.style.transition = "opacity 0.8s"
      setTimeout(() => flash.remove(), 800)
    }, 2500)
  }
}

// ── Init All Effects ────────────────────────────────────────────
function runPageEffects() {
  initGlitchTitle()
  initScrambleTitle()
  initSearchPlaceholder()
  initKeywordBadges()
  initScrollReveal()
  initH2Trace()
  init3DTilt()

  // Ensure cursor display is set on each page (CSS default is none)
  const isTouch = !window.matchMedia("(hover: hover) and (pointer: fine)").matches
  if (!isTouch) {
    const dot = document.getElementById("cursor-dot")
    const ring = document.getElementById("cursor-ring")
    if (dot) dot.style.display = "block"
    if (ring) ring.style.display = "block"

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const r = document.getElementById("cursor-ring")
        if (r) r.classList.add("expanded")
      })
      el.addEventListener("mouseleave", () => {
        const r = document.getElementById("cursor-ring")
        if (r) r.classList.remove("expanded")
      })
    })
  }
}

// One-time init (persists across SPA navigation)
initMatrixRain()
initBootSequence()
initCursorTrail()
initStatusBar()
initPacketsCounter()
initFakeIP()
initNavFlash()
initConsoleEgg()
initHackerTerminal()
initKonamiCode()

// Per-page init
runPageEffects()
document.addEventListener("nav", runPageEffects)
