# carousel
A full-width carousel with options for arrow navigation, breadcrumb navigation, and autoplay.

## Installation

Download the `carousel.js` and `carousel.css` files and add into your project directory.

In your html file, insert `div` container for the carousel.

```html
<div id="carousel" class="carousel"></div
```
In your `.js` file, import and then create a new `Carousel` like below.

```js
import Carousel from 'carousel.js';

new Carousel();
```


## Options
Set options by passing an object as an argument. Default values are displayed below.

```js
new Carousel({
	images: ['images/snow.jpg', 'images/valley.jpg', 'images/mountains', 'images/sunset'],
	breadcrumb: true,
	arrows: true,
	autoplay: true
})
```

**`images`** (array) - An array of image links. If no array is passed, Carousel will search `<div id="carousel"></div>` for `img` elements.

**`breadcrumb`** (boolean) - If value is set to `true` carousel will display breadcrumb naviation at the bottom of carousel. If set to `false` breadcrumb navigation will not be displayed.

**`arrows`** (boolean) - If value is set to `true` navigation arrows will be displayed. If set to `false` arrows will not be displayed.

**`autoplay`** (boolean) - If value is set to `true`carousel slides will autoplay.