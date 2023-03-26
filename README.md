# Drunk Math

An app to help calculate how drunk you really are

**Link to project:** https://drunk-math.vercel.app/

![Drunk Math App Layout](/images/homepage.png "Drunk Math")

## Features

- Calculates your Blood Alcohol Concentraion(BAC) levels for a certain level of alcohol intake
- Shows a table of how intoxicated you would be if you continued at a certain pace
- Uses local storage to prevent the user from entering the same data repeatedly

## How It's Made:

**Technology used:** Typescript, NextJS, Tailwind, and Vercel.

Typescript:
- Type safety

NextJS
- Mainly due to familiarity with regard to deploying on Vercel

Tailwind:
- Removes duplicate CSS code
- keep bundle size down as an app gets larger
- Easy to use once familiar

## Optimizations
Development time.
- This was mostly done over a single weekend using tools I was relatively familiar with

### Further Changes
Port to a SPA with Vite for a smaller bundle.

Explore if Astro could provide an even smaller end product to end users but allow the developer experience of React.

Use Vitest primarily to test the calculation logic

## Lessons Learned:
Sometimes it's best to get a project deployed, optimizing for time rather than technical choices
How to use the Tailwind library.

