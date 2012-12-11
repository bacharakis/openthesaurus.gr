;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $(document).ready(function() {
    $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
    $.fn.foundationButtons          ? $doc.foundationButtons() : null;
    $.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
    $.fn.foundationNavigation       ? $doc.foundationNavigation() : null;
    $.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
    $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
    $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
    $.fn.foundationTabs             ? $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup}) : null;
    $.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
    $.fn.foundationMagellan         ? $doc.foundationMagellan() : null;
    $.fn.foundationClearing         ? $doc.foundationClearing() : null;

    $.fn.placeholder                ? $('input, textarea').placeholder() : null;
  });

	

 
  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
  if (Modernizr.touch && !window.location.hash) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }

})(jQuery, this);

//Search when hittig enter button in text box
$("#word").keyup(function(event){
    if(event.keyCode == 13){
        $("#search").click();
    }
});

//function for hitting the search button or enter
function find(e1){
    $.ajax({
        url: 'http://www.openthesaurus.gr/synonyme/search?q='+$(e1).attr("id")+'&format=application/json',
        dataType: 'jsonp',
        crossDomain: true,
        cache: false
    }).done(function(json) {

            var result = [];
            getNames(json, "term");
            var ff = [];
            var len = result.length;
            for(var i=0; i<len; i++){
                var text = result[i];
                var finaltext = '<a id='+text+' onclick="find(this)">'+text+'</a> , ';
        ff.push(finaltext);
    }
            $('#results').html(ff);
            document.getElementById('word').value=$(e1).attr("id");
            function getNames(obj, name) {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if ("object" == typeof(obj[key])) {
                            getNames(obj[key], name);
                        } else if (key == name) {
                            result.push(obj[key]);
                        }
                    }
                }
            }
        });
};

//function for clicking a synonym from the results list
function resulta() {
    $.ajax({
        url: 'http://www.openthesaurus.gr/synonyme/search?q='+document.getElementById('word').value+'&format=application/json',
        dataType: 'jsonp',
        crossDomain: true,
        cache: false
    }).done(function(json) {
            var result = [];
            getNames(json, "term");
            var ff = [];
            var len = result.length;
            for(var i=0; i<len; i++){
                var text = result[i];
                var finaltext = '<a id='+text+' onclick="find(this)">'+text+'</a> , ';
                ff.push(finaltext);
            }

            $('#results').html(ff);
            function getNames(obj, name) {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if ("object" == typeof(obj[key])) {
                            getNames(obj[key], name);
                        } else if (key == name) {
                            result.push(obj[key]);
                        }
                    }
                }
            }
        });

}


//Install button
$(document).ready(function() {
    $("#install_app").click(function() {
        var request = window.navigator.mozApps.install('http://bacharakis.com/projects/openthesaurus.gr/manifest.webapp');
        request.onsuccess = function () {
            // Save the App object that is returned
            var appRecord = this.result;
        };
        request.onerror = function () {
            // Display the error information from the DOMError object
            alert('Install failed, error: ' + this.error.name);
        };
    });
});
