function moBile() {

	            
	

	            
			
	var api_key = process.env.TUMBLR_API_KEY;
    var key = "api_key=" + api_key;		

	
	$(function() {

	           
		
		            var docElm = document.documentElement;
		
		            // go full-screen
		            if (docElm.requestFullscreen) {
		                docElm.requestFullscreen();
		            } else if (docElm.webkitRequestFullscreen) {
		                docElm.webkitRequestFullscreen();
		            } else if (docElm.mozRequestFullScreen) {
		                docElm.mozRequestFullScreen();
		            } else if (docElm.msRequestFullscreen) {
		                docElm.msRequestFullscreen();
		            }
		            
		         
	
	        	
	            
	            
	            
            });
			

            playMusic();

            //Event Listener that will start a new song after a pause
            //of randomly determined length.
            myAudio.addEventListener('ended', function(){setTimeout(function(){playMusic();}, getRandomInterval(2,2));}, false);
            
            var camera, scene, renderer;
			var objects = [], player;

			var auto = true;
			var controls;
			
			init();
			animate();
			
			
			
			
			function init() {

				camera = new THREE.PerspectiveCamera( 120, window.innerWidth / window.innerHeight, 0.001, 10000 );
				camera.position.y = 0;
				camera.position.z = -5000;
				
				scene = new THREE.Scene();

				renderer = new THREE.CSS3DRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.domElement.style.position = 'absolute';
				document.getElementById( 'container' ).appendChild( renderer.domElement );				

				//

				controls = new THREE.DeviceOrientationControls( camera );
				
				

				document.body.addEventListener( 'mousewheel', onMouseWheel, false );

				

				window.addEventListener( 'resize', onWindowResize, false );
				
				
			}
			 			
				
		$(function(){
			
	 		$.ajax({
				
    url: "http://api.tumblr.com/v2/blog/cronofagiacontemporanea.tumblr.com/posts?"+key,
    dataType: 'jsonp',
    success: function onData( posts ) {

				var entries = posts.response.posts;
					console.log(entries);

				console.log("load");
				// console.log( entries );

				for ( var i = 0; i <= 19; i ++ ) {
				//for ( var i = 1; i < 20; i ++ ) {
					  var p = entries[i];
					//var entry = entries[ i ];

					var element = document.createElement( 'div' );
					element.style.width = '400px';
					element.style.height = 'auto';

					var image = document.createElement( 'img' );
					image.addEventListener( 'load', function ( event ) {

						var object = this.properties.object;
						
						new TWEEN.Tween( object.position )
							.to( { y: Math.random() * 4000 - 2000 }, 5000 )
							.easing( TWEEN.Easing.Exponential.Out )
							.start();

					}, false );
					
					
					image.style.position = 'absolute';
					
					image.src =  p.photos[0].alt_sizes[2].url;
					element.appendChild( image );

					

					var blocker = document.createElement( 'div' );
					blocker.style.position = 'absolute';
					blocker.style.width = '400px';
					blocker.style.height = 'auto';
					
					blocker.style.cursor = 'pointer';
					element.appendChild( blocker );

					var object = new THREE.CSS3DObject( element );
					object.position.x = Math.random() * 8000 - 4000;
					object.position.y = Math.random() * 4000 - 2000;
					
					object.position.z = Math.random() * - 10000;
					scene.add( object );

					objects.push( object );

					//

					var properties = { data: p, blocker: blocker, object: object }

					element.properties = properties;
					image.properties = properties;

					
					

					

				}

			}
			});
			
			var o = 0;

	$(function() {
		o += 20;
		$.ajax({ 
			
			url: 'http://api.tumblr.com/v2/blog/cronofagiacontemporanea.tumblr.com/posts?' + key + '&offset=' + o,  
			dataType: 'jsonp',
			success: function onData(posts) { 
				
					var entries = posts.response.posts;
					console.log(entries);

				console.log("load");
				// console.log( entries );

				for ( var i = 0; i <= 19; i ++ ) {
				//for ( var i = 1; i < 20; i ++ ) {
					  var p = entries[i];
					//var entry = entries[ i ];

					var element = document.createElement( 'div' );
					element.style.width = '400px';
					element.style.height = 'auto';

					var image = document.createElement( 'img' );
					image.addEventListener( 'load', function ( event ) {

						var object = this.properties.object;
						
						new TWEEN.Tween( object.position )
							.to( { y: Math.random() * 4000 - 2000 }, 4000 )
							.easing( TWEEN.Easing.Exponential.Out )
							.start();

					}, false );
					
					
					image.style.position = 'absolute';
					
					image.src =  p.photos[0].alt_sizes[2].url;
					element.appendChild( image );

					

					var blocker = document.createElement( 'div' );
					blocker.style.position = 'absolute';
					blocker.style.width = '400px';
					blocker.style.height = 'auto';
					
					blocker.style.cursor = 'pointer';
					element.appendChild( blocker );

					var object = new THREE.CSS3DObject( element );
					object.position.x = Math.random() * 4000 - 2000;
					object.position.y = Math.random() * 4000 - 2000;
					
					object.position.z = Math.random() * - 10000;
					scene.add( object );

					objects.push( object );

					//

					var properties = { data: p, blocker: blocker, object: object }

					element.properties = properties;
					image.properties = properties;
					}
			}
});
	});
			
			});
			

			function move( delta ) {

				for ( var i = 0; i < objects.length; i ++ ) {

					var object = objects[ i ];

					object.position.z += delta;

					if ( object.position.z > -1000 ) {

						object.position.z -= 10000;

					} else if ( object.position.z < - 20000 ) {

						object.position.z += 10000;

					}

				}

			}

			function onMouseWheel( event ) {

				move( event.wheelDelta );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
				render();

			}

						
			function animate() {
				requestAnimationFrame( animate );
				TWEEN.update();
				controls.update();
				if ( auto === true ) {

					move( 20 );
					
					

				}
				
				render();
			}
			function render() {
				renderer.render( scene, camera );
			}
			};
                    