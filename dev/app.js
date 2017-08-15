import './scss/style.scss';
import Carousel from './components/carousel.js';

class App {
  constructor() {
    new Carousel('#carousel', true, true, true);
  }
}

new App();