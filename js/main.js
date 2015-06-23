window.onload = function () {
	/*Lets set up some variables*/
	var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    var css = '';
	var vContainer = document.getElementsByClassName('vanilla-container')[0];
	var visibleWidth = 0;
	var vWrapper = vContainer.getElementsByClassName('vanilla-wrapper')[0];
	var totalWidth = 0;
	var vSlides = vWrapper.getElementsByClassName('vanilla-slide');
	var vControls = vContainer.getElementsByClassName('vanilla-controls')[0];
	var slideControlRight = vControls.getElementsByClassName('right')[0];
	var slideControlLeft = vControls.getElementsByClassName('left')[0];
	var activeIndex = 1;
	var currentSlideValue = 0;
	var styleAdded = false;


	function testBrowser(){
		var cssSupportCheck = (function(){
		var testElement = document.createElement('div');
		var vendorPrefixs = ['Khtml, Ms, O, Webkit'];
		var vendorLength = vendorPrefixs.length;
			return function(propTest){
				if (propTest in testElement.style ) return true; //Catch 'em early
				propTest = propTest.replace(/^[a-z]/,function(val) {
					return val.toUpperCase();
				});
				while(vendorLength--) {
					if (vendorPrefixs[vendorLength] + propTest in testElement.style){
						return true;
					}
				}
				return false;
			};
		})();
	 
		if (cssSupportCheck('transform')) {
		   document.documentElement.className += ' transform'; // Adds class to html tag if true;
		}
	}



	function calculateWrapperWidth(){
		visibleWidth = vContainer.clientWidth;
		totalWidth = visibleWidth * (vSlides.length);
	}

	function generateCSS(){			
		vWrapper.style.cssText = 'width:'+totalWidth+'px;';
		for (var slideLoop = 0;slideLoop < vSlides.length; slideLoop++){
			vSlides[slideLoop].style.cssText = 'width:'+visibleWidth+'px;';	
		}
		
	}

	// function writeCSS(){
	// 	style.type = 'text/css';
	// 	style.appendChild(document.createTextNode(css));
	// 	head.appendChild(style);
	// 	styleAdded = true;
	// }

	function slideRight(){
		if ( (activeIndex * visibleWidth) < totalWidth){
			var amountToSlide = (activeIndex * visibleWidth)*-1;
			currentSlideValue = amountToSlide;
			activeIndex ++;
		} else {
			var amountToSlide =  (((activeIndex-1) * visibleWidth))*-1;
			currentSlideValue = amountToSlide;
		}
		if ( document.getElementsByClassName('transform').length > 0){ // checks if browser can transform
			vWrapper.style.cssText += '-moz-transform: translateX('+amountToSlide+'px) translateY(0px); -webkit-transform: translateX('+amountToSlide+'px) translateY(0px); -o-transform: translateX('+amountToSlide+'px) translateY(0px); -ms-transform: translateX('+amountToSlide+'px) translateY(0px); transform: translateX('+amountToSlide+'px) translateY(0px);';
		}
	}

	function slideLeft(){
		var amountToSlide = currentSlideValue + visibleWidth;
		if (currentSlideValue < 0) {
			currentSlideValue = amountToSlide;
			activeIndex--;
			if ( document.getElementsByClassName('transform').length > 0){ // checks if browser can transform
				vWrapper.style.cssText += '-moz-transform: translateX('+amountToSlide+'px) translateY(0px); -webkit-transform: translateX('+amountToSlide+'px) translateY(0px); -o-transform: translateX('+amountToSlide+'px) translateY(0px); -ms-transform: translateX('+amountToSlide+'px) translateY(0px); transform: translateX('+amountToSlide+'px) translateY(0px);';
			}
		}				
	}

	slideControlRight.addEventListener('click', function(e){
		e.preventDefault();
		slideRight();
	});

	slideControlLeft.addEventListener('click', function(e){
		e.preventDefault();
		slideLeft();
	});

	window.addEventListener('resize',function(){
		calculateWrapperWidth();
		generateCSS();
		// writeCSS();
	});


	testBrowser();
	calculateWrapperWidth();
	generateCSS();
	// writeCSS();

	





}

