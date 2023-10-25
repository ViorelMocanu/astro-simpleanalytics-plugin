<a href="https://simpleanalytics.com/?ref=github.com/ViorelMocanu/astro-simpleanalytics-plugin">
  <img src="https://assets.simpleanalytics.com/images/logos/logo-github-readme.png" alt="Simple Analytics logo" align="right" height="62" />
</a>

# Simple Analytics Astro plugin

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/ViorelMocanu/astro-simpleanalytics-plugin/static.yml)](https://github.com/ViorelMocanu/astro-simpleanalytics-plugin/actions) [![NPM Package Version](https://img.shields.io/npm/v/%40viorelmocanu%2Fastro-simpleanalytics-plugin)](https://github.com/ViorelMocanu/astro-simpleanalytics-plugin/releases) [![GitHub contributors](https://img.shields.io/github/contributors/ViorelMocanu/astro-simpleanalytics-plugin.svg)](https://github.com/ViorelMocanu/astro-simpleanalytics-plugin/graphs/contributors) [![GitHub Sponsors](https://img.shields.io/github/sponsors/ViorelMocanu)](https://github.com/sponsors/ViorelMocanu/) [![ISC license](https://img.shields.io/badge/License-ISC-blue.svg?style=flat)](https://github.com/ViorelMocanu/astro-simpleanalytics-plugin/blob/main/LICENSE) ![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/ViorelMocanu/astro-simpleanalytics-plugin) [![Downloads of NPM package](https://img.shields.io/npm/dt/astro-simpleanalytics-plugin/%40viorelmocanu%2Fastro-simpleanalytics-plugin)](https://www.npmjs.com/package/astro-simpleanalytics-plugin)

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
pnpm astro add astro-simpleanalytics-plugin
# Using Yarn
yarn astro add astro-simpleanalytics-plugin
# Using NPM
npm astro add astro-simpleanalytics-plugin
```

If you run into any issues, [feel free to report them to us on GitHub](https://github.com/ViorelMocanu/astro-simpleanalytics-plugin/issues) and try the manual installation steps below.

### 🏗️ Manual install

First, install the `astro-simpleanalytics-plugin` package using your package manager. Run this in the terminal:

```sh
# using PNPM
pnpm install astro-simpleanalytics-plugin
# Using Yarn
yarn add astro-simpleanalytics-plugin
# Using NPM
npm install astro-simpleanalytics-plugin
```

We'll assume you're using `pnpm` from now on, but the commands are nearly identical for all package managers.

Then, apply this integration to your `astro.config.*` file using the `integrations` property:

```diff lang="js" "partytown()"
  // astro.config.mjs
  import { defineConfig } from 'astro/config';
+ import simpleanalytics from 'astro-simpleanalytics-plugin';

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
import simpleanalytics from 'astro-simpleanalytics-plugin';
//     ^^^^^^^^^^^^^^^

export default defineConfig({
  // ...
  integrations: [simpleanalytics()],
  //             ^^^^^^^^^^^^^^^^^
});
```

Simple Analytics should be ready to go with zero config.

It exposes some of the advanced tracking options you can find below as integration config flags and stubs in a console logger when analytics are disabled for easy debugging.

By default, it will only run in `production` environments, with native integration inside `@astrojs/partytown` and start tracking the currently visible domain inside the visitor browsers' address bar. It honors **Do Not Track** and gets blocked by some ad blockers. It runs for all website pages.

If you'd like to change that behaviour, please browse through the various configuration options below:

### ✅ Option: Loading Analytics in all environments ♾️

By default, the Simple Analytics plugin attempts to load its client script exclusively on `production` by using [Vite's](https://vitejs.dev/guide/env-and-mode.html) `import.meta.env.DEV` boolean (since Vite is automatically bundled with Astro). If it's true, it doesn't load the script, but stubs the options with a console log. If it's somehow unavailable or unset, it defaults to showing the script everywhere. If you'd like to force showing the script on all environments (including `local` / `development`, `staging` / `preview`, `production`, etc.), you need to add the following configuration flag:

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

-   [Browse projects with SimpleAnalytics Astro Plugin on GitHub](https://github.com/search?q=%22astro-simpleanalytics-plugin%22+path%3A**%2Fpackage.json&type=code) for more examples!

## 🙏 Contributing

Bug reports and pull requests are welcome on GitHub at <https://github.com/ViorelMocanu/astro-simpleanalytics-plugin> .

### ℹ️ Code of Conduct

Everyone interacting in the `astro-simpleanalytics-plugin` project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/ViorelMocanu/simpleanalytics-plugin/blob/main/CODE_OF_CONDUCT.md).

### 🎯 Coding Standards

This project uses [ESLint](https://github.com/eslint/eslint), Prettier and Commitlint for standardizing the look and feel of the source files when committing.

Please run `pnpm verify --fix` prior to submitting pull requests.

### 🧞 Available commands

All commands can be ran from the plugin root folder using your terminal of choice:

| Command                | Action                                                                                     |
| :--------------------- | :----------------------------------------------------------------------------------------- |
| *Dependencies*                                                                                                      |
| `pnpm install`         | Install dependencies                                                                       |
| `pnpm update`          | Update and install dependencies                                                            |
| *Astro server actions*                                                                                              |
| `pnpm dev`             | Start the local Astro development server at: `localhost:4321`                              |
| `pnpm start`           | Start the local Astro development server at: `localhost:4321`                              |
| `pnpm build`           | Build the production-ready deliverables at: `./dist/`                                      |
| `pnpm preview`         | Render a preview before deploy, push or publish                                            |
| `pnpm astro ...`       | Run CLI commands such as `astro add`, `astro check`                                        |
| `pnpm astro -- --help` | Show help on available CLI commands available in Astro                                     |
| *Code quality actions*                                                                                              |
| `pnpm format`          | Validate local code using `Prettier` and `prettier-plugin-astro`                           |
| `pnpm format:fix`      | Validate **and fix** local code using `Prettier` (watch out: this can be disruptive)       |
| `pnpm lint`            | Validate JavaScript, TypeScript and Astro local files using `ESLint` + plugins             |
| `pnpm lint:fix`        | Validate **and fix** JavaScript, TypeScript and Astro local files using `ESLint` + plugins |
| `pnpm typecheck`       | Validate TypeScript types using TSC and `tsconfig.json`                                    |
| `pnpm validate`        | Validate TypeScript types, JavaScript, TypeScript and Astro local files, and code styling  |

## 📝 License

This package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## 🏺 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this integration.

Made by [Viorel Mocanu](https://github.com/ViorelMocanu) after [a challenge](https://github.com/simpleanalytics/roadmap/issues/708) from [Adriaan van Rossum](https://github.com/adriaanvanrossum).

-   @TODO get inspiration <https://github.com/search?q=%22AstroIntegration%22&type=code> + <https://github.com/search?q=%22astro-integration%22+language%3ATypeScript&type=code>

