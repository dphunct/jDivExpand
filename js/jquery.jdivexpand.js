(function( $ ) {
	
	var methods = {
		growDiv : function(myDiv) {
			var jdeDiv = myDiv.prev('div.jde');
			var height = jdeDiv.css('max-height');
			if(!height || height === 'none') {
				if(console) console.error("No max-height specified!");
			}
			else { 
				jdeDiv.animate({'height': height},'fast', 'linear', function(){
					$('span.showJdeIcon', myDiv).removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-n');
					$('a.showMoreJde', myDiv).removeClass('showMoreJde').addClass('showLessJde').text('Less');
				});
			}
		},
		shrinkDiv : function(myDiv) {
			var jdeDiv = myDiv.prev('div.jde');
			var height = jdeDiv.css('min-height');
			if(!height || height === 'none') {
				if(console) console.error("No min-height specified!");
			}
			else {
				jdeDiv.animate({'height': height},'fast', 'linear', function(){
					$('span.showJdeIcon', myDiv).removeClass('ui-icon-triangle-1-n').addClass('ui-icon-triangle-1-e');
					$('a.showLessJde', myDiv).removeClass('showLessJde').addClass('showMoreJde').text('More');
				});
			}
		}
	};
	
  $.fn.jdivexpand = function(options) {
  
	  var settings = $.extend( {
	      'scroll'         : false
	    }, options);

	    return this.each(function() {
	    	var $that = $(this);
	    	var _scroll = settings['scroll'];
	    	var useScrollText = $that.attr('scroll');
	    	if('true' === useScrollText) {
	    		_scroll = true;
	    	}
	    	var title = $that.attr('title');
	    	var jdeList = $that;
	    	var titlebar = "<div class='jde_title ui-helper-reset ui-state-default ui-corner-top'>";
	    	titlebar += (title && '' !== title) ? title : '&nbsp;'; 
	    	titlebar += "</div>";
	    	jdeList.before(titlebar);
	    	jdeList.after("<div class='jde_more ui-helper-reset ui-state-default ui-corner-bottom'><span class='showJdeIcon ui-icon ui-icon-triangle-1-e'></span><a name='#jde' class='showMoreJde'>More</a></div>");
	    	jdeList.wrap("<div class='jde'/>");// ui-helper-reset ui-widget-content
	    	
	    	$('a.showMoreJde').live('click', function(e) {
	    		e.preventDefault();
	    		methods['growDiv'].apply($that, new Array($(this).parent()));
	    	});
	    	$('a.showLessJde').live('click', function(e) {
	    		e.preventDefault();
	    		methods['shrinkDiv'].apply($that, new Array($(this).parent()));
	    	});
	    	if(_scroll) {
	    		$that.parent('div.jde').jScrollPane({
	    			showArrows: true,
	    			arrowScrollOnHover: false,
	    			autoReinitialise: true
	    		});
	    	}

	    });
  };
})( jQuery );