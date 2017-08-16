import './scss/style.scss';
import $ from 'jquery';
import _ from 'lodash';

class Carousel {
  constructor({ images = [], breadcrumb = true, arrows = true, autoplay = true }) {
    this.$container = $('#carousel');

    // IF IMAGE LINKS ARRAY IS PASSED, USE ARRAY
    if (images.length) {
      this.images = images;
    }
    // IF IMAGE LINKS ARRAY IS NOT GIVEN, SEARCH DOM FOR IMAGES AND CREATE ARRAY OF LINKS
    else {
      this.images = _.map($('.carousel img'), image => {
        return image.src;
      })
    }

    // RENDER IMAGES INTO DOM
    this.renderImages();

    this.$viewer = $('.carousel-viewer');;
    this.currentIndex = 0;
    this.nextIndex;
    this.prevIndex;
    this.imageCount = this.images.length;
    this.$nextArrow;
    this.$prevArrow;
    this.$breadcrumbContainer;
    this.$breadcrumbs;

    // ACTIVATE KEYBOARD ARROW BUTTONS
    this.activateKeyboard();

    // ON LOAD, INSERT FIRST IMAGE INTO VIEW CONTAINER
    this.displayImage(this.images[0]);

    // ACTIVATE BREADCRUMBS
    if (breadcrumb === true) {
      this.renderBreadcrumbs();
    }

    // ACTIVATE ARROWS
    if (arrows === true) {
      this.renderArrows();
    }

    this.$pause = $('.pause-autoplay');

    // ACTIVATE AUTOPLAY
    if (autoplay === true) {
      this.activateAutoplay();
    }
  }


  // RENDER IMAGES & INSERT INTO DOM
  renderImages() {
    this.$container.empty();

    let images = this.images.map((link) => {
      return `<img src="${link}">`;
    });

    this.$container.append(images);
    this.renderViewerContainer();
  }


  // RENDER VIEWER CONTAINER AND INSERT INTO DOM
  renderViewerContainer() {
    this.$container.prepend(`<div class="carousel-viewer pause-autoplay"></div>`);
  }


  // RENDER BREADCRUMB HTML INTO DOM
  renderBreadcrumbs() {
    let html = `
      <ol id="carousel-breadcrumb" class="carousel-breadcrumb pause-autoplay"></ol>
    `;

    this.$container.prepend(html);

    // register breadcrumb container
    this.$breadcrumbContainer = $('#carousel-breadcrumb');

    // add a breadcrumb item for every image
    for (var i = 0; i < this.imageCount; i++) {
      this.$breadcrumbContainer.append(`<li id="${i}"></li>`);
    }

    // register breadcrumb items
    this.$breadcrumbs = this.$breadcrumbContainer.find('li');

    // add active class to the first breadcrumb
    $(this.$breadcrumbs[0]).addClass('active');

    this.activateBreadcrumb();
  }


  // ACTIVATE BREADCRUMB NAVIGATION
  activateBreadcrumb() {
    this.$breadcrumbContainer.on('click', 'li', (event) => {
      event.stopPropagation();
      // get id of clicked breadcrumb
      let id = event.target.id;

      this.$breadcrumbs.removeClass('active');
      $(event.target).addClass('active');

      this.displayImage(this.images[id]);
    })
  }


  // UPDATE BREADCRUMB STYLE
  updateBreadcrumbState(id) {
    this.$breadcrumbs.removeClass('active');

    // find breadcrumb with same id as image and make it active
    let breadcrumb = this.$breadcrumbContainer.find(`#${id}`);
    breadcrumb.addClass('active');
  }


  // RENDER ARROWS INTO DOM
  renderArrows() {
    let html = `
      <i id="next" class="fa fa-angle-right fa-4x carousel-arrow right pause-autoplay" aria-hidden="true"></i>
      <i id="prev" class="fa fa-angle-left fa-4x carousel-arrow left pause-autoplay" aria-hidden="true"></i>
    `;

    this.$container.append(html);

    // register arrow elements
    this.$nextArrow = $('#next');
    this.$prevArrow = $('#prev');

    this.activateArrows();
  }


  // ACTIVATE CAROUSEL ARROWS
  activateArrows() {
    // show next image on arrow click
    this.$nextArrow.on('click', (event) => {
      event.stopPropagation();
      this.nextImage();
    });

    // show previous image on arrow click
    this.$prevArrow.on('click', (event) => {
      event.stopPropagation();
      this.prevImage();
    });
  }


  // SET NEXT IMAGE
  nextImage() {
    // if image is last in carousel, set next image to first image in carousel
    if (this.currentIndex === this.imageCount - 1) {
      this.nextIndex = 0;
      this.currentIndex = this.nextIndex;
    }
    else {
      this.nextIndex = this.currentIndex + 1;
      this.currentIndex = this.nextIndex;
    }

    this.displayImage(this.images[this.nextIndex]);
    this.updateBreadcrumbState(this.nextIndex);
  }


  // SET PREVIOUS IMAGE
  prevImage() {
    // if image is first in carousel, set previous image to last image in carousel
    if (this.currentIndex === 0) {
      this.prevIndex = this.imageCount - 1;
      this.currentIndex = this.prevIndex;
    }
    else {
      this.prevIndex = this.currentIndex - 1;
      this.currentIndex = this.prevIndex;
    }

    this.displayImage(this.images[this.prevIndex]);
    this.updateBreadcrumbState(this.prevIndex);
  }


  // DISPLAY IMAGE
  displayImage(link) {
    // insert background-image with image link into viewer container
    this.$viewer.css('background-image', `url(${link})`);
  }


  // ACTIVATE AUTOPLAY
  activateAutoplay() {
    let autoplay = setInterval(this.nextImage.bind(this), 4000);

    this.$pause.hover(() => {
      clearInterval(autoplay);
    }, () => {
      autoplay = setInterval(this.nextImage.bind(this), 4000);
    });
  }


  // ACTIVATE KEYBOARD BUTTONS
  activateKeyboard() {
    $(document).keydown((event) => {

      switch (event.keyCode) {
        case 37:
          this.prevImage();
          event.preventDefault();
          break;
        case 39:
          this.nextImage();
          event.preventDefault();
          break;
      }
    });
  }
}

new Carousel({
  images: [
    'https://raw.githubusercontent.com/thaitwo/carousel/master/images/snow.jpg',
    'https://raw.githubusercontent.com/thaitwo/carousel/master/images/valley.jpg',
    'https://raw.githubusercontent.com/thaitwo/carousel/master/images/mountains.jpg',
    'https://raw.githubusercontent.com/thaitwo/carousel/master/images/sunset.jpg',
    'https://raw.githubusercontent.com/thaitwo/carousel/master/images/river.jpg'
  ],
  breadcrumb: true,
  arrows: true,
  autoplay: true
});