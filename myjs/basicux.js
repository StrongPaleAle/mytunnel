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
var songList = ["song1","song2","song3","song4","song5","song6","song7","song8","song9","song10","song11","song12","song13","song15"];
var myAudio = new Audio("music/" + songList[Math.floor(Math.random()*songList.length)] + ".mp3");
var setMusic = false;
var played = [];
//Generates a random song, sets it attributes/properties, and 
//appends a file extension that works with the browser.
function getRandomSong(){
    var randSongNum = Math.floor(Math.random()*songList.length);
    if(played.length == songList.length){
        played = [];
    }
    if(played.includes(randSongNum)){
        getRandomSong();
    } else {
        var randSong = songList[randSongNum]
        played.push(randSongNum);
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
        setMusic = true;
        //Event Listener that will start a new song after a pause
            //of randomly determined length.
        myAudio.addEventListener('ended', function(){
            setTimeout(function(){
                setMusic = false;
                playMusic();
            }, getRandomInterval(2,2));
        }, false);
    }
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
    if(!setMusic){
        getRandomSong();
    }
    myAudio.play();
    
    $('body').addClass('music-playing');
}
function stopMusic(){
    myAudio.pause();
    $('body').removeClass('music-playing');
}

function goFullscreen(){
    
    var docElm = document.documentElement;
    // go full-screen
    if ($('body').hasClass('fullscreen')){
        if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
          }  else if(document.mozexitFullscreen) {
                document.mozexitFullscreen();
        
          } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
          }
          $('body').removeClass('fullscreen');
    } else {
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.webkitRequestFullscreen) {
        docElm.webkitRequestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
      $('body').addClass('fullscreen');
    }
}