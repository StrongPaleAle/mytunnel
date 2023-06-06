var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


	            
	            
	            
            
			var randInterval = 0;
            var songList = ["song1","song2","song3","song4","song5","song6","song7","song8","song9","song10","song11","song12","song13","song14","song15"];
            var myAudio = new Audio("music/" + songList[Math.floor(Math.random()*songList.length)] + ".mp3");

            //Generates a random song, sets it attributes/properties, and 
            //appends a file extension that works with the browser.
            function getRandomSong(){
                var randSong = songList[Math.floor(Math.random()*songList.length)]
                if (myAudio.canPlayType('audio/mp3;')) {
                    myAudio.src="music/" + randSong + ".mp3";
                } else {
                    myAudio.src="music/" + randSong + ".ogg";
                }
                myAudio.id="myAudio";
                myAudio.volume=0.15;
                myAudio.load();
                myAudio.controls=false
                myAudio.preload=false;
            }

            //Sets a random interval for the setTimeout Function with the
            //'variation' parameter being a random amount of time in 
            //seconds, and the 'range' parameter being a set amount of time 
            //in seconds.
            function getRandomInterval(variation, range){
                randInterval = Math.floor((Math.random()*1000*variation)+(1000*range)); 
                return randInterval;
            }   
            
                       

            //Gets a random song and plays that song.
            function playMusic(){
                getRandomSong();
                myAudio.play();
                console.log(myAudio);
            }
            var delay = ( function() {
			var timer = 0;
			return function(callback, ms) {
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
    			};
})();

$( document ).ready(function() {
	$('.infobutton').click(function(evt){
		
		if (!$('body').hasClass('info-open'))
			{
				$('body').removeClass('info-open');
				$('body').addClass('info-open')
			}
		else{
			$('body').removeClass('info-open');
		}
		
		})
	if( isMobile.any() ) {
		console.log("MOBILE");
		
		$('.mobile-wrapper').find('h1').append('<div class="shine one"></div><div class="shine two"></div><div class="shine three"></div><div class="shine four"></div><div class="shine five"></div>');
		
		if (!$('body').hasClass('options-active'))
			{
				$('body').removeClass('options-active');
				$('body').addClass('options-active')
			}
		if (!$('body').hasClass('mobile'))
			{
				$('body').removeClass('mobile');
				$('body').addClass('mobile')
			}
		
		$('.vr-mobile').click(function(evt){
			$('body').removeClass('options-active');
			
			console.log("VR ACTIVATED!");
			virtualReality();
			
			
			evt.preventDefault();
			
		})
		$('.normal-mobile').click(function(evt){
			$('body').removeClass('options-active');
			
			console.log("STANDARD MOBILE!");
			moBile();
			
			
			evt.preventDefault();
		})
		
	}
	else if( !isMobile.any() ) {
		
		console.log("DESKTOP");
		$('.infos').find('h1').append('<div class="shine one"></div><div class="shine two"></div><div class="shine three"></div><div class="shine four"></div><div class="shine five"></div>');
		
		deskTop();
	}
	
	
	});