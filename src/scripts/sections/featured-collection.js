/**
 * Section: Featured collection
 * ------------------------------------------------------------------------------
 * Featured collection configuration for complete theme support
 * - https://github.com/Shopify/theme-scripts/tree/master/packages/theme-sections
 *
 * @namespace featuredCollection
 */
import {register} from '@shopify/theme-sections';
import swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

/**
 * Featured collection constructor
 * Executes on page load as well as Theme Editor `section:load` events.
 *
 * @param {string} container - selector for the section container DOM element
 */
register('featured-collection', {
  init() {
    this.publicMethod();
  },

  publicMethod() {
    window.console.log('Initialising featured collection section');
  },

  onLoad: function() {

    // Swiper Carousel
    const mySwiper = new swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView:'auto',
          spaceBetween: 20,
        },
        768: {
          slidesPerGroup: 3,
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerGroup: 3,
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1440: {
          slidesPerGroup: 4,
          slidesPerView: 4,
          spaceBetween: 22,
        },
      },
      on: {
        init: function () {
          // show carousel after it is initialized
          this.el.style.visibility = 'visible';
        },
      },
    });

    // AJAX Add To Cart
    const cartButtons = document.getElementsByClassName("js-add-to-cart");
    Array.from(cartButtons).forEach(button => {
      button.addEventListener('click', (event) => { 
        event.preventDefault();
        fetch('/cart/add.js', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With':'xmlhttprequest' 
          },
          body: JSON.stringify({'quantity': 1, 'id': button.dataset.variantId})
        })
        .then(function (data) {
          console.log('Request succeeded with JSON response', data);
        })
        .catch(function (error) {
          console.log('Request failed', error);
        });
      });
    });
    
  },
});
