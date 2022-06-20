
$(function () {
  mapr.init();
});


mapr = {
  count: 0,
  wrapper: null,
  widthPx: null,
  heightPx: null,
  image: null,
  imageWidth: null,
  ie: false,

  init: function () {
    mapr.loadImage();
    //set values
    mapr.image = $('#map-image');
    mapr.wrapper = $('#map-box');
    mapr.getImageSize();
    // mapr.addLink(mapr.count);
    //mapr.loadFromLocalStorage();
    mapr.testMap();

    //Attaching events
    $('.element_storage').on('click', function () {
      mapr.addLink(mapr.count);
    });

    $('#button-ie8').on('click', function () {
      mapr.ie8(this);
      mapr.writeHTML();
    });

    mapr.wrapper.on('click', '.map-item-close', function () {
      $(this).parent('div').remove();
    });

    mapr.wrapper.on('change, keyup', '.input-link, .input-title', function () {
      mapr.writeHTML();
    });

    mapr.wrapper.on('change, keyup', '.input-z-index', function () {
      $(this).parents('div').css('z-index', this.value);
      mapr.writeHTML();
    });

  },

  /*loadFromLocalStorage: function(){
    if(localStorage.getItem('mapHTML')) {
      mapr.wrapper.html(localStorage.getItem('mapHTML'));
      $('#code').html(localStorage.getItem('outputHTML'));
    }
  },*/

  loadImage: function () {
    //console.log(window.location.hash);
    $('#load-image').on('click', function () {
      console.log('yo');
      var imagePath = $('#image-path').val();
      console.log('image path:' + imagePath);
      mapr.image.attr('src', imagePath);
      mapr.getImageSize();
      //localStorage.setItem("imagePath",imagePath);
      return false;
    });
  },

  /*----------------------------------------------
  attachUI(i)
  attached the jquery UI events to the draggable
  elements dynamically. i is the number part 
  of the ID of the element. 
  ----------------------------------------------*/

  attachUI: function (i) {
    $('#map-item-' + i).draggable({
      containment: "parent",
      //scroll: false,
      drag: function () {
        mapr.updateCoords(this);
      },
      stop: function () {
        mapr.writeHTML();
        //localStorage.setItem('mapHTML',mapr.wrapper.html());
      }
    }).resizable({
      handles: "n, e, se, s, sw, w, nw",
      resize: function () {
        mapr.updateCoords(this);
      },
      stop: function () {
        mapr.writeHTML();
        //localStorage.setItem('mapHTML',mapr.wrapper.html());
      }
    });
  },

  getImageSize: function () {
    //check when image is loaded, set values and set map dimensions

    var newImg = new Image();
    newImg.onload = function () { mapr.setMapDimensions(); };
    newImg.src = mapr.image.attr('src');

    mapr.imageWidth = newImg.width;
  },

  setMapDimensions: function () {
    mapr.widthPx = mapr.wrapper.width();
    mapr.heightPx = mapr.wrapper.height();
  },

  updateCoords: function (el) {
    var $el = $(el),
      xPx = $el.position().left,
      xPercent = (Math.round((xPx / mapr.widthPx) * 10000)) / 100,
      yPx = $el.position().top,
      yPercent = (Math.round((yPx / mapr.heightPx) * 10000)) / 100,
      widthPx = $el.outerWidth(),
      widthPercent = (Math.round((widthPx / mapr.widthPx) * 10000)) / 100,
      heightPx = $el.outerHeight(),
      heightPercent = (Math.round((heightPx / mapr.heightPx) * 10000)) / 100;

    $el.find('.x-px').html(xPx + 'px');
    $el.find('.x-percent').html(xPercent + '%');
    $el.find('.y-px').html(yPx + 'px');
    $el.find('.y-percent').html(yPercent + '%');
    $el.find('.width-px').html(widthPx + 'px');
    $el.find('.width-percent').html(widthPercent + '%');
    $el.find('.height-px').html(heightPx + 'px');
    $el.find('.height-percent').html(heightPercent + '%');

    let audio = $el.find('.map-select').val();
    $el.attr('onclick', `playAudio('${audio}');`);
  },

  addLink: function () {
    mapr.count++;

    var maprHTML =
      '<div class="map-item" id="map-item-' + mapr.count + '" >' +
      // '<div class="map-output-wrapper">' + 
      '<div class="map-item-close ui-icon ui-icon-close"></div>' +
      '<div class="map-output-box"><span class="map-output-label">x:</span> <span class="map-output x-px">20px</span> | <span class="map-output x-percent"></span></div>' +
      '<div class="map-output-box"><span class="map-output-label">y:</span> <span class="map-output y-px">20px</span> | <span class="map-output y-percent"></span></div>' +
      '<div class="map-output-box"><span class="map-output-label">width:</span> <span class="map-output width-px">150px</span> | <span class="map-output width-percent"></span></div>' +
      '<div class="map-output-box"><span class="map-output-label">height:</span> <span class="map-output height-px">150px</span> | <span class="map-output height-percent"></span></div>' +
      '<div class="map-output-box"><input class="map-input input-z-index" placeholder="Z" value="2" title="z-index"><input class="map-input input-link map-input-long" placeholder="Link" title="Link" value=""><input class="map-input input-title map-input-long" placeholder="Title" title="Link Title" value=""></div>' +
      // '</div>' + 
      '</div>';

    let mapr_id = `map-item-${mapr.count}`;
    let maprHTML_2 = `
        <div class="box-div map-item ui-draggable ui-resizable" id="${mapr_id}" onclick="">
          <select class="map-select">
            <option value="L1-0.mp3">L1-0.mp3</option>
            <option value="L1-1.mp3">L1-1.mp3</option>
            <option value="L1-2.mp3">L1-2.mp3</option>
            <option value="L1-3.mp3">L1-3.mp3</option>
            <option value="L1-4.mp3">L1-4.mp3</option>
          </select>
          <span class="map-output x-px">20px</span>
          <span class="map-output y-px">20px</span>
          <span class="map-output x-percent"></span>
          <span class="map-output y-percent"></span>
          <span class="map-output width-px">150px</span>
          <span class="map-output height-px">150px</span>
          <span class="map-output width-percent"></span>
          <span class="map-output height-percent"></span>
        </div>
      `;

    // mapr.wrapper.append(maprHTML);
    mapr.wrapper.append(maprHTML_2);
    //mapr.updateCoords('#map-item-' + mapr.count);
    mapr.attachUI(mapr.count);

  },
  writeHTML: function () {
    var id, x, y, w, h, z,
      $pre = $('#code'),
      mapHTML = '',
      link = '',
      title = '',
      ieCSS = '';

    if (mapr.ie === true) {
      ieCSS = 'filter: alpha(opacity=.1);';
    }

    $('.map-item').each(function () {
      id = this.id;
      x = $(this).find('.x-percent').text();
      y = $(this).find('.y-percent').text();
      w = $(this).find('.width-percent').text();
      h = $(this).find('.height-percent').text();
      z = $(this).find('.input-z-index').val();
      link = $(this).find('.input-link').val();
      title = $(this).find('.input-title').val();

      mapHTML = mapHTML + '<a href="' + link + '" title="' + title + '" style="position: absolute; left: ' + x + '; top: ' + y + ';  width: ' + w + ';  height: ' + h + ';  z-index: ' + z + ';' + ieCSS + '"></a>';
    });
    mapHTML = mapHTML.replace(/&/g, '&amp;');
    mapHTML = mapHTML.replace(/</g, '&lt;');
    mapHTML = mapHTML.replace(/>/g, '&gt;');

    $('#code').html(mapHTML);
    localStorage.setItem('outputHTML', mapHTML);
  },


  /*----------------------------------------------
  ie8()
  loads a clear.gif image in the map to 
  
  ----------------------------------------------*/

  ie8: function (el) {

    if (mapr.ie === false) {
      mapr.ie = true;
      $(el).addClass('active');
    }
    else {
      mapr.ie = false;
      $(el).removeClass('active');
    }
  },

  /*selectElementContents: function(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  },*/

  /*----------------------------------------------
  testMap()
  used to test the image map links on the image 
  probably not going to be used for production.
  ----------------------------------------------*/

  testMap: function () {
    var mapHTML = '';
    $('#test-map').on('click', function () {
      mapHTML = $('#code').html();
      mapHTML = mapHTML.replace(/&lt;/g, '<');
      mapHTML = mapHTML.replace(/&gt;/g, '>');
      mapr.wrapper.append(mapHTML);
      return false;
    });
    $('#remove-test-map').on('click', function () {
      mapr.wrapper.find('a').remove();
    });
  }
};




