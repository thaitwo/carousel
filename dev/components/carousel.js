import $ from 'jquery';

class Carousel {
  constructor(id, arrows, breadcrumb, autoslide) {
    this.$container = $(id);
    this.$carouselItems = this.$container.find('.item');
    this.$images = this.$container.find('img');
    this.$viewer;
    this.currentIndex = 0;
    this.nextIndex;
    this.prevIndex;
    this.imageCount = this.$images.length;
    this.$nextArrow;
    this.$prevArrow;
    this.$breadcrumbContainer;
    this.$breadcrumbs;

    this.renderViewerContainer();
    this.activateKeyboard();

    // ACTIVATE ARROWS
    if (arrows === true) {
      this.renderArrows();
    }

    // ACTIVATE BREADCRUMBS
    if (breadcrumb === true) {
      this.renderBreadcrumbs();
    }

    // ACTIVATE AUTOSLIDE
    if (autoslide === true) {
      setInterval(this.nextImage.bind(this), 4000);
    }
  }


  renderViewerContainer() {
    this.$container.prepend(`<div class="carousel-viewer"></div>`);
    this.$viewer = $('.carousel-viewer');
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
    })
  }


  // UPDATE BREADCRUMB STYLE
  updateBreadcrumbState(id) {
    this.$breadcrumbs.removeClass('active');

    let breadcrumb = this.$breadcrumbContainer.find(`#${id}`);
    breadcrumb.addClass('active');
  }


  // RENDER BREADCRUMB HTML INTO DOM
  renderBreadcrumbs() {
    let html = `
      <ol id="carousel-breadcrumb" class="carousel-breadcrumb"></ol>
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
      this.$breadcrumbs.removeClass('active');
      $(event.target).addClass('active');
      let id = event.target.id;

      this.displayImage(this.$images[id]);
    })
  }


  // RENDER ARROWS INTO DOM
  renderArrows() {
    let html = `
      <i id="next" class="fa fa-chevron-right fa-3x carousel-arrow right" aria-hidden="true"></i>
      <i id="prev" class="fa fa-chevron-left fa-3x carousel-arrow left" aria-hidden="true"></i>
    `;

    this.$container.append(html);

    // register arrow elements
    this.$nextArrow = $('#next');
    this.$prevArrow = $('#prev');

    this.activateArrows();
  }


  // ACTIVATE CAROUSEL ARROWS
  activateArrows() {
    this.$nextArrow.on('click', (event) => {
      event.stopPropagation();
      this.nextImage();
    });

    this.$prevArrow.on('click', (event) => {
      event.stopPropagation();
      this.prevImage();
    })
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

    this.displayImage(this.$images[this.nextIndex]);
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

    this.displayImage(this.$images[this.prevIndex]);
    this.updateBreadcrumbState(this.prevIndex);
  }


  // DISPLAY IMAGE
  displayImage(image) {
    // get image url
    let url = image.src;

    // insert background-image with image url into viewer container
    this.$viewer.css('background-image', `url(${url})`);
  }
}

export default Carousel;