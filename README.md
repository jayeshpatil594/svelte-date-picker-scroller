# svelte-date-picker-scroller

A simple svelte scrollable date picker component. A native ios/android like date picker for the web.

## Usage
Add it to your svelte project:
```shell
$ npm i svelte-date-component --save
```

Then, pop it into the component that suites you:
```html
<script>
	import DatePickerScroller from 'svelte-date-picker-scroller';
</script>

<DatePickerScroller />
```
### Props

| Property          | Type                                              | Required?  | Description  |
| :---------------- | :------------------------------------------------ | :-------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| selectedDate             | `Date`                             |          | Initial selected date to which the date picker will auto scroll to on mount                                                                                                                                                                                                                                                                                                                      |
| maxDate            |  `Date`                              |          | Max date that can be picked                                                                                                                                                                                                                                                                                                                       |
| minDate         | `Date`                                          |          | Min date that can be picked                                                                                                                                                                                                                                                                                                                                                                                                |
| noOfVisibleRows          | `number` |          | No of rows that need to be visible in the date picker window                                                                                                                                                                                                            |
| rowItemHeight   | `number`                                          |           | Row item height in px.                                                                                                                                                                                                                                                                                                                           |
| rowItemStyles      | `object`                                          |           | Row item custom style object                                                                                                                                                                                                                                                                                                                                            |
| activeRowItemStyles     | `object`                                          |           | Active row item custom style object                                                                                                                                                                                                                                                                                                                                                                         |

### Slots

- `day` - Slot for rendering day text
  - Props:
    - `day: number` - day index (-1 for filler(empty item))
- `month` - Slot for rendering month text
  - Props:
    - `month: number` - month index (-1 for filler(empty item))
- `year` - Slot for rendering year text
  - Props:
    - `year: number` - year (-1 for filler(empty item))
- `activeRowHighlighter` - Slot for the active row highlight overlay

### Events

- `selection` - Fired after any of the (day/month/year) selection changes.
  - `detail` type: `Date` 


## Bugs
Found an problem? [Submit an issue](https://github.com/jayeshpatil594/svelte-date-picker-scroller/issues/new)

## This project was built using:

## create-svelte

Everything you need to build a Svelte library, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

Read more about creating a library [in the docs](https://kit.svelte.dev/docs/packaging).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```
