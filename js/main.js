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


	/* This function will find out if the browser can support css transitions - Probably better to use Modernizer here */
	function testBrowser(){ //To see if we can do that sweet 60fps or if its IE
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

	/* This function keeps track of widths */
	function calculateWrapperWidth(){
		visibleWidth = vContainer.clientWidth;
		totalWidth = visibleWidth * (vSlides.length);
	}

	/* This function will write the css values needed to stack divs next to one another*/
	function writeScaffoldingCSS(){			
		vWrapper.style.cssText = 'width:'+totalWidth+'px;';
		for (var slideLoop = 0;slideLoop < vSlides.length; slideLoop++){
			vSlides[slideLoop].style.cssText = 'width:'+visibleWidth+'px;';	
		}
		
	}

	/* This function lets us know which slide is currently being viewed */
	function handleClassDelegation(){
		for (var slideCount = 0;slideCount < vSlides.length; slideCount++){
			vSlides[slideCount].className = vSlides[slideCount].className.replace(/\b active\b/,'');
		}
		vSlides[activeIndex-1].className += ' active';
	}

	/* This function will return true if a slide is marked as active */
	function checkIfActive(){
		for (var i = 0;i < vSlides.length; i++){
			if (vSlides[i].className.indexOf('active') >= 0){
				return true;
			}
		}
		return false;
	}

	/* This function disbaled controls if you reach the end of the slides */
	function disableControls(){
		slideControlLeft.className = slideControlLeft.className.replace(/\b disabled\b/,'');
		slideControlRight.className = slideControlRight.className.replace(/\b disabled\b/,'');
		if (activeIndex == 1){
			slideControlLeft.className += ' disabled';
		}
		if (activeIndex == vSlides.length){
			slideControlRight.className += ' disabled';
		}
	}

	/* This function sets a slide to active */
	function setActiveSlide(){
		if (checkIfActive() == false){
			for (var slideCount = 0;slideCount < vSlides.length; slideCount++){
				vSlides[slideCount].className = vSlides[slideCount].className.replace(/\b active\b/,'');
			}
			vSlides[0].className += ' active';
		}
	}

	/* This function will create pagination */
	function buildPagination(){
		var vPagination = document.getElementsByClassName('vanilla-pagination')[0];
		for (var pageCount = 0; pageCount < vSlides.length; pageCount++){
			vPagination.innerHTML += '<span class="page" id="page-'+(pageCount+1)+'"></span>';
		}
		handlePagination();
	}

	/* This function will change the pagination active marker based off the actove slide */
	function handlePagination(){
		var paginationControl = document.getElementsByClassName('page');
		for (var i = 0; i < paginationControl.length; i++){
			var pageVal = paginationControl[i].id.replace('page-','');
			paginationControl[i].className = paginationControl[i].className.replace(/\b active\b/,'');
			if (activeIndex == pageVal){
				paginationControl[i].className += ' active';
			}
		}
	}

	/* Controls */
	function slideRight(){
		if ( (activeIndex * visibleWidth) < totalWidth){
			var amountToSlide = (activeIndex * visibleWidth)*-1;
			currentSlideValue = amountToSlide;
			activeIndex ++;
			disableControls();
			setTimeout(function(){
				handleClassDelegation();
			},300)
		} else {
			var amountToSlide =  (((activeIndex-1) * visibleWidth))*-1;
			currentSlideValue = amountToSlide;
		}
		if ( document.getElementsByClassName('transform').length > 0){ // checks if browser can transform
			vWrapper.style.cssText += '-moz-transform: translateX('+amountToSlide+'px); -webkit-transform: translateX('+amountToSlide+'px); -o-transform: translateX('+amountToSlide+'px); -ms-transform: translateX('+amountToSlide+'px); transform: translateX('+amountToSlide+'px);';
		} else {
			vWrapper.style.cssText += 'margin-left:'+amountToSlide+'px;';
		}
		handlePagination();
	}

	function slideLeft(){
		var amountToSlide = currentSlideValue + visibleWidth;
		if (currentSlideValue < 0) {
			currentSlideValue = amountToSlide;
			activeIndex--;
			disableControls();
			setTimeout(function(){
				handleClassDelegation();
			},300)
			if ( document.getElementsByClassName('transform').length > 0){ // checks if browser can transform
				vWrapper.style.cssText += '-moz-transform: translateX('+amountToSlide+'px); -webkit-transform: translateX('+amountToSlide+'px); -o-transform: translateX('+amountToSlide+'px); -ms-transform: translateX('+amountToSlide+'px); transform: translateX('+amountToSlide+'px);';
			} else {
				vWrapper.style.cssText += 'margin-left:'+amountToSlide+'px;';
			}
		}
		handlePagination();		
	}

	/* Event Listeners */
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
		writeScaffoldingCSS();
	});

	/* Initialization Calls */
	setActiveSlide();
	testBrowser();
	calculateWrapperWidth();
	writeScaffoldingCSS();
	buildPagination();
	disableControls();

}