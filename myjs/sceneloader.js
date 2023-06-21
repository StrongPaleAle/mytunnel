function sceneLoader(options, stereo, sound) {
  

  var camera, scene, renderer;
  var objects = [],
    player;

  var auto = true;
  var controls;

  init();
  animate();

  if (sound) {
    playMusic();
  }

  function init() {
    camera = new THREE.PerspectiveCamera(
      options.fov,
      options.aspect,
      options.near,
      options.far
    );
    camera.position.y = options.camY;
    camera.position.z = -5000;

    scene = new THREE.Scene();
    if (stereo) {
      renderer = new THREE.CSS3DStereoRenderer();
    } else {
      renderer = new THREE.CSS3DRenderer();
    }
    //renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = 0;
    //controls = new THREE.DeviceOrientationControls( camera );
    document.getElementById("container").appendChild(renderer.domElement);

    //

    controls = new THREE.DeviceOrientationControls(camera);

    var query = document.getElementById("query");
    query.addEventListener(
      "keyup",
      function (event) {
        if (event.keyCode === 13) {
          search(query.value);
        }
      },
      false
    );

    var button = document.getElementById("button");
    button.addEventListener(
      "click",
      function (event) {
        search(query.value);
      },
      false
    );

    if (window.location.hash.length > 0) {
      query.value = window.location.hash.substr(1);
    }

    search(query.value);

    document.body.addEventListener("mousewheel", onMouseWheel, false);

    document.body.addEventListener(
      "click",
      function (event) {
        console.log("click");
        auto = true;

        if (player !== undefined) {
          console.log(player);
          player.parentNode.removeChild(player);
          player = undefined;
        }

        new TWEEN.Tween(camera.position)
          .to({ x: 0, y: -25 }, 1500)
          .easing(TWEEN.Easing.Exponential.Out)
          .start();
      },
      false
    );

    window.addEventListener("resize", onWindowResize, false);
  }

  function search(query) {
    window.location.hash = query;

    for (var i = 0, l = objects.length; i < l; i++) {
      var object = objects[i];
      var delay = Math.random() * 1000;

      new TWEEN.Tween(object.position)
        .to({ y: -3000 }, 1000)
        .delay(delay)
        .easing(TWEEN.Easing.Exponential.In)
        .start();

      new TWEEN.Tween(object)
        .to({}, 2000)
        .delay(delay)
        .onComplete(function () {
          $(object).remove();
          $(object).addClass("ended");

          var index = objects.indexOf(this);
          objects.splice(index, 1);
        })
        .start();
    }

    loadPosts();
  }

  function loadPosts() {
    var offset = 0;
    var api_key = "LyLuf1EPap7Z3SUIiaTnyc9sgU3HxHMuqUR1cyU2vkFZT3m8zg";
    var key = "api_key=" + api_key;
    var api = "https://api.tumblr.com/v2/blog/" + query.value + ".tumblr.com/";
    var retrieve_more = function (offset) {
      $.ajax({
        url: api + "posts/photo?limit=20&offset=" + offset + "&" + key,
        dataType: "jsonp",
        success: function (data) {
          console.log(data);
          //$.each(data.response.posts, function(i, item) {

          var entries = data.response.posts;
          console.log(entries);

          console.log("load");
          // console.log( entries );
          var leght = data.response.posts.length - 1;
          for (var e = 0; e <= leght; e++) {
            //for ( var i = 1; i < 20; i ++ ) {
            var p = entries[e];
            //var entry = entries[ i ];

            var element = document.createElement("div");
            element.style.width = "400px";
            element.style.height = "auto";

            var link = document.createElement("a");
            link.setAttribute("href", p.short_url);
            link.setAttribute("target", "_blank");
            element.appendChild(link);

            var image = document.createElement("img");
            image.addEventListener(
              "load",
              function (event) {
                var object = this.properties.object;

                new TWEEN.Tween(object.position)
                  .to({ y: Math.random() * 4000 - 2000 }, 5000)
                  .easing(TWEEN.Easing.Exponential.Out)
                  .start();
              },
              false
            );

            image.style.position = "absolute";
            var altsize = p.photos[0].alt_sizes[2];

            if (altsize) {
              image.src = p.photos[0].alt_sizes[2].url;
            } else {
              image.src = p.photos[0].original_size.url;
            }

            if (!image.src) {
              console.log(p);
            }
            link.appendChild(image);

            var blocker = document.createElement("div");
            blocker.style.position = "absolute";
            blocker.style.width = "400px";
            blocker.style.height = "auto";

            blocker.style.cursor = "pointer";
            element.appendChild(blocker);

            var object = new THREE.CSS3DObject(element);
            object.position.x = Math.random() * 3000 - 2000;
            object.position.y = Math.random() * 2000 - 1000;

            object.position.z = Math.random() * 8000 - 20000;
            scene.add(object);

            objects.push(object);

            //

            var properties = { data: p, blocker: blocker, object: object };

            element.properties = properties;
            image.properties = properties;
          }

          //});

          if (data.response.posts.length == 20) {
            offset += 20;
            console.log("loading more");
            setTimeout(function () {
              retrieve_more(offset);
              console.log("wait...");
            }, 10000);
          }
          if (data.response.posts.length <= 18) {
            offset *= 0;
            setTimeout(function () {
              retrieve_more(offset);
              console.log("===IS A NEW DAY!===");
            }, 10000);
          }
        },
      });
    };
    retrieve_more(offset);
  }

  function move(delta) {
    for (var i = 0; i < objects.length; i++) {
      var object = objects[i];

      object.position.z += delta;

      if (object.position.z > -5000) {
        $(object).remove();
      } else if (object.position.z < -20000) {
        object.position.z -= 10000;
      }
    }
  }

  function onMouseWheel(event) {
    move(event.wheelDelta);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);

    TWEEN.update();

    if (auto === true) {
      move(10);
    }

    controls.update();

    renderer.render(scene, camera);
  }
}
