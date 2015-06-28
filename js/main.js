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

	function setActiveSlide(){
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
			disableControls();
			setTimeout(function(){
				handleClassDelegation();
			},300)
		} else {
			var amountToSlide =  (((activeIndex-1) * visibleWidth))*-1;
			currentSlideValue = amountToSlide;
		}
		if ( document.getElementsByClassName('transform').length > 0){ // checks if browser can transform
			vWrapper.style.cssText += '-moz-transform: translateX('+amountToSlide+'px) translateY(0px); -webkit-transform: translateX('+amountToSlide+'px) translateY(0px); -o-transform: translateX('+amountToSlide+'px) translateY(0px); -ms-transform: translateX('+amountToSlide+'px) translateY(0px); transform: translateX('+amountToSlide+'px) translateY(0px);';
		} else {
			vWrapper.style.cssText += 'margin-left:'+amountToSlide+'px;';
		}
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
				vWrapper.style.cssText += '-moz-transform: translateX('+amountToSlide+'px) translateY(0px); -webkit-transform: translateX('+amountToSlide+'px) translateY(0px); -o-transform: translateX('+amountToSlide+'px) translateY(0px); -ms-transform: translateX('+amountToSlide+'px) translateY(0px); transform: translateX('+amountToSlide+'px) translateY(0px);';
			} else {
				vWrapper.style.cssText += 'margin-left:'+amountToSlide+'px;';
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

	setActiveSlide();
	testBrowser();
	calculateWrapperWidth();
	writeScaffoldingCSS();
	disableControls();



	//The following code ustilizes the YouTube API because I have not place to locally host and I wanted to play with the API for fun :)

	var videos = vContainer.getElementsByClassName('video-player');
	var videoIDs = [];
	var players;
	for (var videoPlayerCount = 0; videoPlayerCount < videos.length; videoPlayerCount++){
		videos[videoPlayerCount].setAttribute('id','video'+videoPlayerCount);
		videoIDs[videoPlayerCount] = videos[videoPlayerCount].getAttribute('data-yt-id');
	}
	// console.log(videoIDs);

	// function onYouTubeIframeAPIReady(){
	// 	for(var index = 0; index < videoIDs.length; index++){
	// 		players[index] = new YT.Player('video'+index,{
	// 			playerVars: { 'autoplay': 1, 'controls': 0 },
	// 			height: '100%',
	// 			width: '100%',
	// 			videoId: videoIDs[index],
	// 			events: {
	// 				'onReady': onPlayerReady,
	// 				'onStateChange': onPlayerStateChange
	// 			}
	// 		});
	// 		console.log('video'+index);
	// 	}
	// }

      // 2. This code loads the IFrame Player API code asynchronously.
      // var tag = document.createElement('script');

      // tag.src = "https://www.youtube.com/iframe_api";
      // var firstScriptTag = document.getElementsByTagName('script')[0];
      // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.


      // var player;
      // function onYouTubeIframeAPIReady() {
      //   player = new YT.Player('player', {
      //   playerVars: { 'autoplay': 1, 'controls': 0 },
      //     height: '100%',
      //     width: '100%',
      //     videoId: '1FgLlwfY51Q',
      //     events: {
      //       'onReady': onPlayerReady,
      //       'onStateChange': onPlayerStateChange
      //     }
      //   });
      // }

      // 4. The API will call this function when the video player is ready.


      // function onPlayerReady(event) {
      //   event.target.playVideo();
      // }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.


      // var done = false;
      // function onPlayerStateChange(event) {
      //   if (event.data == YT.PlayerState.PLAYING && !done) {
      //     setTimeout(stopVideo, 6000);
      //     done = true;
      //   }
      // }
      // function stopVideo() {
      //   player.stopVideo();
      // }

}

