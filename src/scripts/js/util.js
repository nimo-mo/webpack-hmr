var IosCanvas = require('./lib/iosCanvas');
var util = {};

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};
var events = 'touchmove pointermove MSPointerMove scroll DOMMouseScroll wheel mousewheel'.replace(/\s/g,'.util '); // join namespace;

function preventDefault (e) {
  e.preventDefault(); 
}

function stopPropagation (e) {
  e.stopPropagation();
}

function preventDefaultForScrollKeys (e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
  }
}

util.enableEvents = function () {
  $(window).off(events,preventDefault);
  $(document).off('keydown.util',preventDefaultForScrollKeys);
};

util.disableEvents = function () {
  $(window).on(events,preventDefault);
  $(document).on('keydown.util',preventDefaultForScrollKeys);
};

util.getLocationOrigin = function () {
	return location.origin ?
		location.origin :
		location.protocol + '//' + location.host;
};

util.getLocationOriginPath = function () {
	return util.getLocationOrigin() + location.pathname
};

util.getRequestUrl = function (requestUrl) {
	return $.fn.cookie('requestUrl');
};

util.setRequestUrl = function (requestUrl) {
	$.fn.cookie('requestUrl',requestUrl);
};

util.getCurrentUser = function () {
	return {
		id: $.fn.cookie('X-User-Id'),
		name: $.fn.cookie('X-User-Name'),
		token: $.fn.cookie('X-User-Token'),
		mobile: $.fn.cookie('X-User-Mobile')
	}
};

util.clearCurrentUser = function () {
	$.fn.cookie('X-User-Id', null);
	$.fn.cookie('X-User-Name', null);
	$.fn.cookie('X-User-Token', null);
	$.fn.cookie('X-User-Mobile', null);
};

util.pushToLogin = function (loginPath,reactScope) {
	reactScope.props.history.push(loginPath);
};

util.getQueryString = function (name) {
  var reg = new RegExp('(^|\\?|&)'+ name +'=([^&]*)(\\s|&|$)', 'i');  
  return reg.test(location.href) ? unescape(RegExp.$2.replace(/\+/g, ' ')) : '';
},

util.generateBlob = function (blobData, blobType) {
  var b, bb;
  if(window.Blob) {
    b = new Blob(blobData, {type: blobType});
  } else if(window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder) {
    BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
    bb = new BlobBuilder();
    bb.append(blobData);
    b = bb.getBlob();
  } else {
    throw new Error('Can not generate blob.');
  };
  return b;
};

util.compress = function (options) {
  var file = options['file'],
      quality = options['quality'],
      max_width = options['max_width'],
      max_height = options['max_height'],
      mime_type = options['mime_type'];
  var width, height;
  var bugfix = document.getElementById("bugfix");

  // Scale base on the ratio
  width = file.width;
  height = file.height;
  // ratio = width / height;
  // width = width > max_width ? max_width : width;
  // height = Math.round( width / ratio );

  if(width > height){
    if(width > max_width) {
      height = Math.round(max_width * height / width);
      width = max_width;
    };
  } else {
    if(height > max_height) {
      width = Math.round(max_height * width / height);
      height = max_height;
    };
  };

  // Generate a canvas
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  var ctx = canvas.getContext('2d');
  IosCanvas.drawImageIOSFix(ctx, file, 0,0,file.width,file.height, 0,0,width,height);
  // Transform canvas into dataURL
  var newImgData = canvas.toDataURL(mime_type, quality/100);
  return newImgData;
};

util.previewFile = function (file,callback) {
	callback = callback || function () {};
	// if (!file.type.match('image.*')) { return }
	if (!/image\/(jpe?g|png|gif)/i.test(file.type)) { return }
	if (window.File && window.FileReader) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", function () {
      var image = new Image();
      image.height = 100;
      image.title = file.name;
      image.src = this.result;
      callback(image.src);
    }, false);

    // reader.readAsArrayBuffer(file);
    // reader.onload = function(e) {
    //   try {
    //     var blob = util.generateBlob([e.target.result], file.type);
    //     var url = window.URL || window.webkitURL;
    //     var blobURL = url.createObjectURL(blob);
    //     var image = new Image();
    //     image.onload = function() {
    //     	callback(blobURL);
    //       url.revokeObjectURL(blobURL);
    //     };
    //     image.src = blobURL;
    //   } catch(err) {
    //     callback('');
    //   };
    // };
  } else {
    callback('');
  }
}

module.exports = util;