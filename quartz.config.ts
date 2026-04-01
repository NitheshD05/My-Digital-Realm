import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "NitheshD05 | Cyber Realm",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "nitheshd05.github.io/My-Digital-Realm",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Share Tech Mono",
        body: "Share Tech Mono",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#0d1117",
          lightgray: "#161b22",
          gray: "#30363d",
          darkgray: "#c9d1d9",
          dark: "#39d353",
          secondary: "#58a6ff",
          tertiary: "#3fb950",
          highlight: "rgba(56, 139, 253, 0.1)",
          textHighlight: "rgba(56, 139, 253, 0.2)",
        },
        darkMode: {
          light: "#080b08",
          lightgray: "#0f1a0f",
          gray: "#1a3a1a",
          darkgray: "#a8d8a8",
          dark: "#00ff41",
          secondary: "#00d4ff",
          tertiary: "#ff2d78",
          highlight: "rgba(0, 255, 65, 0.08)",
          textHighlight: "rgba(0, 255, 65, 0.25)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
