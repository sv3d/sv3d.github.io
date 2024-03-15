window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/models/CREATIVE_BLOCKS_35_MM";
var NUM_INTERP_FRAMES = 21;

var interp_images = {};
function preloadInterpolationImages(item) {
  interp_images[item.id] = []
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + item.id + "/NVS_dynamic/" +  String(i).padStart(6, '0') + '.jpg';
    interp_images[item.id][i] = new Image();
    interp_images[item.id][i].src = path;
  }
}

function setInterpolationImage(item, i) {
  var image = interp_images[item.id][i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  item.innerHTML = "";
  item.appendChild(image);
}


$(document).ready(function() {
    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    // Get all interpolation-image-wrapper
    var interpolationImageWrappers = document.getElementsByClassName('interpolation-image-wrapper');
    for (var i = 0; i < interpolationImageWrappers.length; i++) {
      preloadInterpolationImages(interpolationImageWrappers[i]);
    }

    $('#interpolation-slider').on('input', function(event) {
      for (var i = 0; i < interpolationImageWrappers.length; i++) {
        setInterpolationImage(interpolationImageWrappers[i], this.value);
      }
    });

    for (var i = 0; i < interpolationImageWrappers.length; i++) {
      setInterpolationImage(interpolationImageWrappers[i], 0);
    }
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})
