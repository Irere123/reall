<a href="https://bereall.netlify.app">
<p align="center">
<img height=100 src="/.assets/reall_logo.svg"/>
</p></a>
<p align="center">
  <strong>Taking communication to the moon 🚀</strong>
</p>

## What's inside?

| Codebase             |    Description     |
| :------------------- | :----------------: |
| [api](api)           |     Elixir API     |
| [apps/web](apps/web) |  Next.js frontend  |
| [packages](packages) | Workspace packages |

## Branches

- dev -> dev stuff happening on this branch
- prod -> don't touch, this is what's running in prod

### Apps and Packages

- `web`: another [Next.js](https://nextjs.org/) app
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Contributions

Reall is open to contributions, but I recommend creating an issue or replying in a comment to let me know what you are working on first that way we don't overwrite each other.

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
yarn run dev
```
