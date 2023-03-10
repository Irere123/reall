# Design Guidelines

This document aims to specify and define the rules and patterns to follow when implementing and developing new features and components for Reall.

> This is a summary. For a more extensive version, components and UI Design, visit the publically available **[Figma file](https://www.figma.com/file/I8w8NkoieLiw8QZ9i5KbYG/Reall?node-id=0%3A1&t=TiFMWWOwPCUW6LI0-0)**.

## Table of contents

- [Design Guidelines](#design-guidelines)

  - [Table of contents](#table-of-contents)

  - [Typography](#typography)
    - [Web Embed](#web-embed)
    - [Desktop](#desktop)
  - [Spacing](#spacing)
  - [Doubts and questions](#doubts-and-questions)

## Typography

The font chosen for this project is `Inter`.

Inter is a free font available on Google Fonts. Clean and bold headings, readable paragraph text and an overall versatile font.

We'll be using two of its styles:

- Inter Bold (`700`)
- Inter Medium (`500`)

#### Web Embed

HTML's `link` method

```html
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap"
  rel="stylesheet"
/>
```

CSS/SCSS `@import`

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap");
```

CSS Rules

```scss
font-family: "Inter", sans-serif;

// Regular
font-weight: 500;

// Bold
font-weight: 700;
```

| Tag           | Font Size | Line Height | Weight    |
| ------------- | --------- | ----------- | --------- |
| **H1**        | 56px      | 90          | 700       |
| **H2**        | 40px      | 64          | 700       |
| **H3**        | 28px      | 45          | 700       |
| **H4**        | 20px      | 32          | 700       |
| **P**         | 14px      | 22          | 500 - 700 |
| **P (small)** | 12px      | 22          | 500 - 700 |

## Spacing

This is an approximation. On some circumstances other values will be used to ensure readability, consistency and visual balance, so make sure to also check the UI Design and the spacing used there.

## Doubts and questions

If you have any doubts or concerns when developing components or other UI elements, you can open an issue and tag @design or leave a message in `#design`
