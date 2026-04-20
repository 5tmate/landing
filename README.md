# 5tmate — Landing Page

Marketing landing page for [5tmate](https://5tmate.com), your AI financial co-pilot for Asia.

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4**
- **shadcn/ui** component library
- **Paraglide JS** for i18n (EN, ID, TH, ZH-SG, ZH-TW)
- **Syne** display font + **JetBrains Mono** for UI text
- **oxfmt** for code formatting

## Getting Started

```bash
npm install
npm run paraglide   # generate i18n runtime (required before dev/build)
npm run dev
```

## Scripts

| Command              | Description                        |
| -------------------- | ---------------------------------- |
| `npm run dev`        | Start local dev server             |
| `npm run build`      | Production build → `dist/`         |
| `npm run preview`    | Preview production build locally   |
| `npm run paraglide`  | Regenerate i18n from `messages/`   |
| `npm run format`     | Format all files with oxfmt        |
| `npm run format:check` | Check formatting (used in CI)    |
| `npm run lint`       | Lint with ESLint                   |

## i18n

Message files live in `messages/`. After editing them, run `npm run paraglide` to regenerate `src/paraglide/` (this directory is gitignored — CI regenerates it automatically).

## CI

GitHub Actions runs on every push and PR to `main`:
1. Format check
2. Paraglide codegen
3. Vite build
4. Upload `dist/` as a GitHub artifact (retained 7 days)
