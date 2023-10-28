# 🙏 How to contribute to `astro-simpleanalytics-plugin`

First and foremost, thanks for considering taking the time to help us move this project forward!

We have a [roadmap](ROADMAP.md) of things we thought we need to do, but any kind of contribution and PR will be considered if it brings value to this package.

Thanks in advance for your help!

## ℹ️ Code of Conduct

Everyone interacting in the `astro-simpleanalytics-plugin` project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](CODE_OF_CONDUCT.md).

## 🎯 Coding Standards

This project uses [ESLint](https://github.com/eslint/eslint), [Prettier](https://github.com/prettier/prettier) and [Commitlint](https://github.com/conventional-changelog/commitlint) for standardizing the look and feel of the source files when committing.

Please run `pnpm verify:fix` prior to submitting pull requests.

## 🧞 Available commands

All commands can be ran from the plugin root folder using your terminal of choice:

| Command                | Action                                                                                     |
| :--------------------- | :----------------------------------------------------------------------------------------- |
| *Dependencies*         |                                                                                            |
| `pnpm install`         | Install dependencies                                                                       |
| `pnpm update`          | Update and install dependencies                                                            |
| *Astro server actions* |                                                                                            |
| `pnpm dev`             | Start the local Astro development server at: `localhost:4321`                              |
| `pnpm start`           | Start the local Astro development server at: `localhost:4321`                              |
| `pnpm build`           | Build the production-ready deliverables at: `./dist/`                                      |
| `pnpm preview`         | Render a preview before deploy, push or publish                                            |
| `pnpm astro ...`       | Run CLI commands such as `astro add`, `astro check`                                        |
| `pnpm astro -- --help` | Show help on available CLI commands available in Astro                                     |
| *Code quality actions* |                                                                                            |
| `pnpm typecheck`       | Validate TypeScript types using TSC and `tsconfig.json`                                    |
| `pnpm format`          | Validate local code using `Prettier` and `prettier-plugin-astro`                           |
| `pnpm format:fix`      | Validate **and fix** local code using `Prettier` (watch out: this can be disruptive)       |
| `pnpm lint`            | Validate JavaScript, TypeScript and Astro local files using `ESLint` + plugins             |
| `pnpm lint:fix`        | Validate **and fix** JavaScript, TypeScript and Astro local files using `ESLint` + plugins |
| `pnpm validate`        | Validate TypeScript types, JavaScript, TypeScript and Astro local files.                   |
| `pnpm validate:fix`    | Validate **and fix** TypeScript types, JavaScript, TypeScript and Astro local files.       |
