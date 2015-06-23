window.onload = function () {
	/*Lets set up some variables*/
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

	function writeScaffoldingCSS(){			
		vWrapper.style.cssText = 'width:'+totalWidth+'px;';
		for (var slideLoop = 0;slideLoop < vSlides.length; slideLoop++){
			vSlides[slideLoop].style.cssText = 'width:'+visibleWidth+'px;';	
		}
		
	}

	function handleClassDelegation(){
		for (var slideCount = 0;slideCount < vSlides.length; slideCount++){
			vSlides[slideCount].className = vSlides[slideCount].className.replace(/\b active\b/,'');
		}
		vSlides[activeIndex-1].className += ' active';
	}

	function checkIfActive(){
		for (var i = 0;i < vSlides.length; i++){
			if (vSlides[i].className.indexOf('active') >= 0){
				return true;
			}
		}
		return false;
	}

	function setActive(){
		if (checkIfActive() == false){
			for (var slideCount = 0;slideCount < vSlides.length; slideCount++){
				vSlides[slideCount].className = vSlides[slideCount].className.replace(/\b active\b/,'');
			}
			vSlides[0].className += ' active';
		}
	}

	function slideRight(){
		if ( (activeIndex * visibleWidth) < totalWidth){
			var amountToSlide = (activeIndex * visibleWidth)*-1;
			currentSlideValue = amountToSlide;
			activeIndex ++;
			handleClassDelegation();
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
			handleClassDelegation();
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
		writeScaffoldingCSS()
	});


	
	setActive();
	testBrowser();
	calculateWrapperWidth();
	writeScaffoldingCSS();

}

