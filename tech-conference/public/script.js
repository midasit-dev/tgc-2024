const displacementSlider = function (opts) {

  let vertex = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `;

  let fragment = `
        
        varying vec2 vUv;

        uniform sampler2D currentImage;
        uniform sampler2D nextImage;

        uniform float dispFactor;

        void main() {

            vec2 uv = vUv;
            vec4 _currentImage;
            vec4 _nextImage;
            float intensity = 0.3;

            vec4 orig1 = texture2D(currentImage, uv);
            vec4 orig2 = texture2D(nextImage, uv);
            
            _currentImage = texture2D(currentImage, vec2(uv.x, uv.y + dispFactor * (orig2 * intensity)));

            _nextImage = texture2D(nextImage, vec2(uv.x, uv.y + (1.0 - dispFactor) * (orig1 * intensity)));

            vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);

            gl_FragColor = finalTexture;

        }
    `;

  let images = opts.images,image,sliderImages = [];;
  let canvasWidth = images[0].clientWidth;
  let canvasHeight = images[0].clientHeight;
  let parent = opts.parent;
  let renderWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  let renderHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  let renderW, renderH;

  if (renderWidth > canvasWidth) {
    renderW = renderWidth;
  } else {
    renderW = canvasWidth;
  }

  renderH = canvasHeight;

  let renderer = new THREE.WebGLRenderer({
    antialias: false });


  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x23272A, 1.0);
  renderer.setSize(renderW, renderH);
	renderer.domElement.style.opacity = .3;
  parent.appendChild(renderer.domElement);

  let loader = new THREE.TextureLoader();
  loader.crossOrigin = "anonymous";

  images.forEach(img => {

    image = loader.load(img.getAttribute('src') + '?v=' + Date.now());
    image.magFilter = image.minFilter = THREE.LinearFilter;
    image.anisotropy = renderer.capabilities.getMaxAnisotropy();
    sliderImages.push(image);

  });

  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0x23272A);
  let camera = new THREE.OrthographicCamera(
  renderWidth / -2,
  renderWidth / 2,
  renderHeight / 2,
  renderHeight / -2,
  1,
  1000);


  camera.position.z = 1;

  let mat = new THREE.ShaderMaterial({
    uniforms: {
      dispFactor: { type: "f", value: 0.0 },
      currentImage: { type: "t", value: sliderImages[0] },
      nextImage: { type: "t", value: sliderImages[1] } },

    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    opacity: 1.0 });


  let geometry = new THREE.PlaneBufferGeometry(
  parent.offsetWidth,
  parent.offsetHeight,
  1);

  let object = new THREE.Mesh(geometry, mat);
  object.position.set(0, 0, 0);
  scene.add(object);

  let addEvents = function () {

    let pagButtons = Array.from(document.getElementById('pagination').querySelectorAll('button'));
    let isAnimating = false;

    pagButtons.forEach((el, slideIndex) => {

      el.addEventListener('click', function () {

        if (!isAnimating) {

          isAnimating = true;

          document.getElementById('pagination').querySelectorAll('.active')[0].className = '';
          this.className = 'active';

					const csEl = document.getElementById('change-slide');
					if (csEl) {
						csEl.innerHTML = slideIndex;
						csEl.dispatchEvent(new Event('onChangeSlide'));
					}

          let slideId = parseInt(this.dataset.slide, 10);

          mat.uniforms.nextImage.value = sliderImages[slideId];
          mat.uniforms.nextImage.needsUpdate = true;

          TweenLite.to(mat.uniforms.dispFactor, 1, {
            value: 1,
            ease: 'Expo.easeInOut',
            onComplete: function () {
              mat.uniforms.currentImage.value = sliderImages[slideId];
              mat.uniforms.currentImage.needsUpdate = true;
              mat.uniforms.dispFactor.value = 0.0;
              isAnimating = false;
            } });


          let slideTitleEl = document.getElementById('slide-title');
          let slideStatusEl = document.getElementById('slide-status');
          let slideAuthorEl = document.getElementById('slide-author');
          let nextSlideTitle = document.querySelectorAll(`[data-slide-title="${slideId}"]`)[0].innerHTML;
          let nextSlideStatus = document.querySelectorAll(`[data-slide-status="${slideId}"]`)[0].innerHTML;
          let nextSlideAuthor = document.querySelectorAll(`[data-slide-author="${slideId}"]`)[0].innerHTML;

          TweenLite.fromTo(slideTitleEl, 
						0.5,
          	{ autoAlpha: 1, y: 0 },
          	{
							autoAlpha: 0,
							y: 20,
							ease: 'Expo.easeIn',
							onComplete: function () {
								slideTitleEl.innerHTML = nextSlideTitle;
								TweenLite.to(slideTitleEl, 0.5, {
									autoAlpha: 1,
									y: 0 
								});
							}
						}
					);

          TweenLite.fromTo(slideStatusEl, 
						0.5,
						{ autoAlpha: 1, y: 0 },
						{
							autoAlpha: 0,
							y: 20,
							ease: 'Expo.easeIn',
							onComplete: function () {
								slideStatusEl.innerHTML = nextSlideStatus;
								TweenLite.to(slideStatusEl, 0.5, {
									autoAlpha: 1,
									y: 0,
									delay: 0.1 
								});

							}
						}
					);

					TweenLite.fromTo(slideAuthorEl, 
						0.5,
						{ autoAlpha: 1, y: 0 },
						{
							autoAlpha: 0,
							y: 20,
							ease: 'Expo.easeIn',
							onComplete: function () {
								slideAuthorEl.innerHTML = nextSlideAuthor;
								TweenLite.to(slideAuthorEl, 0.5, {
									autoAlpha: 1,
									y: 0,
									delay: 0.1 
								});

							}
						}
					);
        }

      });

    });

  };

  addEvents();

  window.addEventListener('resize', function (e) {
    renderer.setSize(renderW, renderH);
  });

  let animate = function () {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  };
  animate();
};

imagesLoaded(document.querySelectorAll('img'), () => {

  document.body.classList.remove('loading');

  const el = document.getElementById('slider');
  const imgs = Array.from(el.querySelectorAll('img'));
  new displacementSlider({parent: el, images: imgs });

	function doPaginationToggle() {
		let pagButtons = Array.from(document.getElementById('pagination').querySelectorAll('button'));
		//active가 있는지 검사 없으면 아무 동작을 수행하지 않음
		if (pagButtons.every(el => el.className !== 'active')) {
			return;
		}

		//array를 순회하면서 active가 있으면 현재 element의 active를 제거하고 다음 element에 active를 추가한 후 return
		for (let i = 0; i < pagButtons.length; i++) {
			if (pagButtons[i].className === 'active') {
				if (i + 1 < pagButtons.length) {
					pagButtons[i + 1].click();
				} else {
					pagButtons[0].click();
				}
				return;
			}
		}
	};

	setInterval(doPaginationToggle, 7000);
});

