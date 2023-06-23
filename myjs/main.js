$( document ).ready(function() {

    var options = {};
    var stereo = false;
    var sound = true;
    $('.mobile-wrapper').find('h1').append('<div class="shine one"></div><div class="shine two"></div><div class="shine three"></div><div class="shine four"></div><div class="shine five"></div>');
	$('.infobutton').click(function(evt){
		
		if (!$('body').hasClass('info-open'))
			{
				$('body').removeClass('info-open');
				$('body').addClass('info-open')
			}
		else{
			$('body').removeClass('info-open');
		}
		
    });
    $('.playbutton').click(function(evt){
        if($('body').hasClass('music-playing')){
            stopMusic();
        }else{
            playMusic();
        }
    });
    $('.fullscreenbutton').click(function(evt){
        goFullscreen();
    });
    


	if( isMobile.any() ) {
		console.log("MOBILE");
		
		
		
		
		if (!$('body').hasClass('mobile'))
			{
				$('body').removeClass('mobile');
				$('body').addClass('mobile')
			}
		
        options = {
            fov : 150,
            stereo : false,
            camY : 0,
            objX1: 8000,
            objX2: 4000,
            objY1: 4000 ,
            objY2: 2000,
            objZ1: 8000,
            objZ2: 20000,
            speed: 10
        }
        
		
	} else if( !isMobile.any() ) {
		
		console.log("DESKTOP");
        options = {
            fov : 150,
            stereo : false,
            camY : 20,
            objX1: 3000,
            objX2: 2000,
            objY1: 2000 ,
            objY2: 1000,
            objZ1: 8000,
            objZ2: 20000,
            speed: 10
        }
        
        

		$('.infos').find('h1').append('<div class="shine one"></div><div class="shine two"></div><div class="shine three"></div><div class="shine four"></div><div class="shine five"></div>');
		
		
	}
    $('.setting').click(function(evt){
        
        $('.mobile-wrapper').addClass('setted');
    });
	$('.start').click(function(evt){
        $('body').removeClass('options-active');
        if($(this).hasClass('vr')){
            stereo = true;
            if (!$('body').hasClass('fullscreen')){

                goFullscreen();
            }
        }
        if($(this).hasClass('mute')){
            sound = false;
        }
        sceneLoader(options, stereo, sound);
        
        
        
    })
	
});