<a href="https://simpleanalytics.com/?ref=github.com/ViorelMocanu/simpleanalytics-astro-plugin">
  <img src="https://assets.simpleanalytics.com/images/logos/logo-github-readme.png" alt="Simple Analytics logo" align="right" height="62" />
</a>

# Simple Analytics Astro plugin

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/ViorelMocanu/simpleanalytics-astro-plugin/static.yml)](https://github.com/ViorelMocanu/simpleanalytics-astro-plugin/actions) [![GitHub Pages Deploy Status](https://github.com/ViorelMocanu/simpleanalytics-astro-plugin/actions/workflows/static.yml/badge.svg)](https://github.com/ViorelMocanu/simpleanalytics-astro-plugin/deployments) [![GitHub contributors](https://img.shields.io/github/contributors/ViorelMocanu/simpleanalytics-astro-plugin.svg)](https://github.com/ViorelMocanu/simpleanalytics-astro-plugin/graphs/contributors) [![GitHub Sponsors](https://img.shields.io/github/sponsors/ViorelMocanu)](https://github.com/sponsors/ViorelMocanu/) [![ISC license](https://img.shields.io/badge/License-ISC-blue.svg?style=flat)](https://github.com/ViorelMocanu/simpleanalytics-astro-plugin/blob/main/LICENSE) ![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/ViorelMocanu/simpleanalytics-astro-plugin)

[Simple Analytics](https://simpleanalytics.com) is a clean, simple, and privacy friendly analytics tool. Actionable data in a beautiful dashboard. It does not use cookies and you can bypass ad blockers. Make sure to signup to get most value out of this plugin.

[Astro](https://astro.build/) is a website build tool for the modern web — powerful developer experience meets lightweight output.

This is a [Simple Analytics](https://github.com/simpleanalytics) plugin for [Astro](https://github.com/withastro/astro).

- [Simple Analytics Astro plugin](#simple-analytics-astro-plugin)
    - [🚀 Installation](#-installation)
        - [⚡ Quick installation](#-quick-installation)
        - [🏗️ Manual install](#️-manual-install)
    - [✨ Usage](#-usage)
        - [✅ Option: Loading Analytics in all environments ♾️](#-option-loading-analytics-in-all-environments-️)
        - [✅ Option: Integrate with `@astrojs/partytown` 🎉](#-option-integrate-with-astrojspartytown-)
        - [✅ Option: Light version script 🪶](#-option-light-version-script-)
        - [✅ Option: Group multiple domains 🥪](#-option-group-multiple-domains-)
        - [✅ Option: Do Not Track (DNT) 🛑](#-option-do-not-track-dnt-)
        - [✅ Option: Bypass Ad Blockers 🪙](#-option-bypass-ad-blockers-)
        - [✅ Option: Ignore pages ➖](#-option-ignore-pages-)
        - [✅ Option: Non-unique hostnames 🔗](#-option-non-unique-hostnames-)
        - [📃 Complete configuration reference](#-complete-configuration-reference)
    - [💡 Examples](#-examples)
    - [🙏 Contributing](#-contributing)
        - [ℹ️ Code of Conduct](#ℹ️-code-of-conduct)
        - [🎯 Coding Standards](#-coding-standards)
        - [🧞 Available commands](#-available-commands)
    - [📝 License](#-license)
    - [🏺 Changelog](#-changelog)

## 🚀 Installation

### ⚡ Quick installation

The `astro add` command-line tool automates the installation for you. Run one of the following commands in a new terminal window. (If you aren't sure which package manager you're using, run the first command.) Then, follow the prompts, and type "y" in the terminal (meaning "yes") for each one.

```sh
# using PNPM
pnpm astro add simpleanalytics-astro-plugin
# Using Yarn
yarn astro add simpleanalytics-astro-plugin
# Using NPM
npm astro add simpleanalytics-astro-plugin
```

If you run into any issues, [feel free to report them to us on GitHub](https://github.com/ViorelMocanu/simpleanalytics-astro-plugin/issues) and try the manual installation steps below.

### 🏗️ Manual install

First, install the `simpleanalytics-astro-plugin` package using your package manager. Run this in the terminal:

```sh
# using PNPM
pnpm install simpleanalytics-astro-plugin
# Using Yarn
yarn add simpleanalytics-astro-plugin
# Using NPM
npm install simpleanalytics-astro-plugin
```

We'll assume you're using `pnpm` from now on, but the commands are nearly identical for all package managers.

Then, apply this integration to your `astro.config.*` file using the `integrations` property:

```diff lang="js" "partytown()"
  // astro.config.mjs
  import { defineConfig } from 'astro/config';
+ import simpleanalytics from 'simpleanalytics-astro-plugin';

  export default defineConfig({
    // ...
    integrations: [simpleanalytics()],
    //             ^^^^^^^^^^^^^^^^^
  });
```

## ✨ Usage

In your `astro.config.mjs` file, make sure you have the appropriate integrations call:

```typescript
import { defineConfig } from 'astro/config';
import simpleanalytics from 'simpleanalytics-astro-plugin';
//     ^^^^^^^^^^^^^^^

export default defineConfig({
  // ...
  integrations: [simpleanalytics()],
  //             ^^^^^^^^^^^^^^^^^
});
```

Simple Analytics should be ready to go with zero config. By default, it will only run in `production` environments, with native integration inside `@astrojs/partytown` and start tracking the currently visible domain inside the visitor browsers' address bar. It honors **Do Not Track** and gets blocked by some ad blockers. It runs for all website pages.

If you'd like to change that behaviour, please browse through the various configuration options below:

### ✅ Option: Loading Analytics in all environments ♾️

By default, the Simple Analytics plugin attempts to load its client script exclusively on `production` by using [Vite's](https://vitejs.dev/guide/env-and-mode.html) `import.meta.env.PROD` boolean (since Vite is automatically bundled with Astro). If it's somehow unavailable or unset, it defaults to showing the script everywhere. If you'd like to force showing the script on all environments (including `local` / `development`, `staging` / `preview`, `production`, etc.), you need to add the following configuration flag:

```typescript
export default defineConfig({
  // ...
  integrations: [
    simpleanalytics({
      allEnvironments: true,
    }),
  ],
  // ...
});
```

### ✅ Option: Integrate with `@astrojs/partytown` 🎉

[Partytown](https://partytown.builder.io/) is a lazy-loaded library to help relocate resource intensive scripts into a [web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), and off of the [main thread](https://developer.mozilla.org/en-US/docs/Glossary/Main_thread). If you're using third-party scripts for things like analytics or ads, Partytown is a great way to make sure that they don't slow down your site.

This plugin automatically integrates with [@astrojs/partytown](https://github.com/withastro/astro/tree/main/packages/integrations/partytown). For more details about `@astrojs/partytown`, read the [official Astro integration documentation](https://docs.astro.build/en/guides/integrations-guide/partytown/).

If you want to disable this plugin for your specific use case, use this configuration flag in your `astro.config.mjs` file:

```typescript
export default defineConfig({
  // ...
  integrations: [
    simpleanalytics({
      partytown: false,
    }),
  ],
  // ...
});
```

### ✅ Option: Light version script 🪶

The Simple Analytics script is already very light, but in exchange for some missing features, it can be made even **lighter** by using this configuration flag:

```typescript
export default defineConfig({
  // ...
  integrations: [
    simpleanalytics({
      light: true,
    }),
  ],
  // ...
});
```

The features missing from the **lighter** script are:

- ❌ Time on page
- ❌ Hash navigation
- ❌ Scroll depth
- ❌ SPA
- ❌ Screen sizes
- ❌ Ignore pages
- ❌ Overwrite domain name
- ❌ Ignore DNT

Read more details about this feature in the [official documentation](https://docs.simpleanalytics.com/light).

### ✅ Option: Group multiple domains 🥪

By default, the Simple Analytics uses the domain shown to users in the browser's address bar. If you want to [link multiple domains into one domain](https://docs.simpleanalytics.com/overwrite-domain-name) in your dashboard, or you want to use a different domain than people see in their browser address bar, you need to enable the following configuration flag:

```typescript
export default defineConfig({
  // ...
  integrations: [
    simpleanalytics({
      customHostname: 'example.com',
    }),
  ],
  // ...
});
```

### ✅ Option: Do Not Track (DNT) 🛑

By default, the Simple Analytics [supports the Do Not Track setting](https://docs.simpleanalytics.com/dnt) and supports the feature of not tracking users that have chosen this option in their browsers. If you would like to enable tracking devices irrespective of this option, you need to enable the following configuration flag:

```typescript
export default defineConfig({
  // ...
  integrations: [
    simpleanalytics({
      collectDNT: true,
    }),
  ],
  // ...
});
```

### ✅ Option: Bypass Ad Blockers 🪙

By default, the Simple Analytics JavaScript file loads from the `scripts.simpleanalyticscdn.com` domain. You can also optionally specify a custom domain to **bypass ad blockers**:

```typescript
export default defineConfig({
  // ...
  integrations: [
    simpleanalytics({
      customDomain: 'custom.domain.com',
    }),
  ],
  // ...
});
```

Read more about this in [the Simple Analytics documentation](https://docs.simpleanalytics.com/bypass-ad-blockers).

### ✅ Option: Ignore pages ➖

By default, the Simple Analytics JavaScript file loads in the site footer on all your pages. If you'd like to [avoid loading the script on some pages](https://docs.simpleanalytics.com/ignore-pages) (and implicitly not tracking those pages) add this configuration flag as a CSV string with optional wildcards:

```typescript
export default defineConfig({
  // ...
  integrations: [
    simpleanalytics({
      ignorePages: '/search/*,/accounts/*,/vouchers',
    }),
  ],
  // ...
});
```

### ✅ Option: Non-unique hostnames 🔗

Suppose you redirect your visitors to a payment provider, and after they complete the payment, they return to your website. Because of the nature of not tracking visitors in Simple Analytics, we count those "returning" visitors as new visitors. To prevent this from happening, you can specify the hostname of that payment provider to tell us we should register this visit as non-unique.

You can [specify a list of hostnames](https://docs.simpleanalytics.com/non-unique-hostnames) as CSV values (without `https://`) in this configuration flag:

```typescript
export default defineConfig({
  // ...
  integrations: [
    simpleanalytics({
      nonUniqueHostnames: 'checkout.stripe.com,checkout.adyen.com,checkout.mollie.com',
    }),
  ],
  // ...
});
```

### 📃 Complete configuration reference

These are all the available options for this plugin inside your `astro.config.mjs` file, alongside their default values:

```typescript
export default defineConfig({
  // ...
  integrations: [
    simpleanalytics({
      allEnvironments: false, // options: false | true
      collectDNT: false, // options: false | true
      customDomain: undefined, // options: undefined | string
      customHostname: undefined, // options: undefined | string
      ignorePages: undefined, // options: undefined | string
      light: false, // options: false | true
      nonUniqueHostnames: undefined, // options: undefined | string
      partytown: true, // options: true | false
    }),
  ],
  // ...
});
```

## 💡 Examples

-   [Browse projects with SimpleAnalytics Astro Plugin on GitHub](https://github.com/search?q=%22simpleanalytics-astro-plugin%22+path%3A**%2Fpackage.json&type=code) for more examples!

## 🙏 Contributing

Bug reports and pull requests are welcome on GitHub at <https://github.com/ViorelMocanu/simpleanalytics-astro-plugin> .

### ℹ️ Code of Conduct

Everyone interacting in the `simpleanalytics-astro-plugin` project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/ViorelMocanu/simpleanalytics-plugin/blob/main/CODE_OF_CONDUCT.md).

### 🎯 Coding Standards

This project uses [ESLint](https://github.com/eslint/eslint), Prettier and Commitlint for standardizing the look and feel of the source files when committing.

Please run `pnpm verify --fix` prior to submitting pull requests.

### 🧞 Available commands

All commands can be ran from the plugin root folder using your terminal of choice:

@TODO

| Command                | Action                                                                                     |
| :--------------------- | :----------------------------------------------------------------------------------------- |
| `pnpm install`         | Install dependencies                                                                       |
| `pnpm dev`             | Pornește serverul local de Astro la `localhost:4321`                                       |
| `pnpm start`           | Pornește serverul local de Astro la `localhost:4321`                                       |
| `pnpm build`           | Construiește site-ul de producție la `./dist/`                                             |
| `pnpm preview`         | Fă un preview al site-ului local înainte de deploy                                         |
| `pnpm astro ...`       | Rulează comenzi CLI cum ar fi `astro add`, `astro check`                                   |
| `pnpm astro -- --help` | Afișează comenzile disponibile în Astro CLI                                                |
| `pnpm format`          | Validează codul local folosind `Prettier` și `prettier-plugin-astro`                       |
| `pnpm format:fix`      | Validează și **corectează** codul folosind `Prettier` (atenție: poate fi distructiv)       |
| `pnpm lint:js`         | Validează fișierele JavaScript, TypeScript și Astro locale folosind `ESLint`               |
| `pnpm lint:md`         | Validează fișierele Markdown locale folosind `MarkdownLint`                                |
| `pnpm lint:fix`        | Validează și **corectează** fișierele JavaScript, TypeScript și Markdown locale            |
| `pnpm lint`            | Validează fișierele JavaScript, TypeScript, Astro și Markdown cu `ESLint` / `MarkdownLint` |
| `pnpm typecheck`       | Validează type-urile de TypeScript folosind TSC și `tsconfig.json`                         |

## 📝 License

This package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## 🏺 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this integration.

Made by @ViorelMocanu after [a challenge](https://github.com/simpleanalytics/roadmap/issues/708) from @adriaanvanrossum

-   @TODO docs for integration <https://docs.astro.build/en/reference/integrations-reference/>
-   @TODO get inspiration <https://github.com/search?q=%22AstroIntegration%22&type=code> + <https://github.com/search?q=%22astro-integration%22+language%3ATypeScript&type=code>
-   @TODO plugin template <https://github.com/astro-community/plugin-template>
-   @TODO view inspiration <https://github.com/pilcrowOnPaper/siena/blob/fd8233596a0e275ece7295ff72fa92c43bce0c1d/src/index.ts#L200>
-   @TODO view inspiration <https://github.com/logaretm/vee-validate/blob/b2c1234c3d3606cc522bd47d17bbd07bcd2bc993/docs/src/integrations/svgSprite.ts#L2>
-   @TODO view inspiration <https://github.com/withastro/astro/blob/main/packages/integrations/tailwind/src/index.ts>
-   @TODO view inspiration <https://github.com/astro-community/config-to-alias/blob/5e1d651ef81f5cb3c79911144f374f764e563527/lib/config-to-alias-astro-integration.js>
-   @TODO view inspiration <https://github.com/withastro/astro/blob/main/packages/integrations/partytown/src/index.ts>
-   @TODO view inspiration <https://github.com/logaretm/vee-validate/blob/b2c1234c3d3606cc522bd47d17bbd07bcd2bc993/docs/src/integrations/svgSprite.ts#L2>
-   @TODO view inspiration <https://github.com/vite-pwa/astro/blob/62ca78a2822aa35b291f7a2d5e7be224517af253/src/index.ts>
-   @TODO view inspiration <https://github.com/lloydjatkinson/astro-integration-demo/tree/master/packages/astro-integration-demo-components/src>
-   @TODO analytics inspiration <https://github.com/simpleanalytics/gatsby-plugin/blob/master/index.js>
-   @TODO analytics inspiration <https://github.com/simpleanalytics/docusaurus-plugin>
-   @TODO analytics inspiration <https://github.com/simpleanalytics/vue-plugin>
-   @TODO first npm package <https://www.freecodecamp.org/news/how-to-create-and-publish-your-first-npm-package/>
-   @TODO read publish to NPM doc <https://docs.astro.build/en/reference/publish-to-npm/>
-   @TODO publish to NPM <https://docs.npmjs.com/cli/v8/commands/npm-publish> + <https://docs.npmjs.com/creating-and-publishing-scoped-public-packages>
-   @TODO register the NPM Package <https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry>
