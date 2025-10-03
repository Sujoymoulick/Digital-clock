
    const timeDisplay = document.getElementById('time-display');
    const ampmIndicator = document.getElementById('ampm-indicator');
    const dateDisplay = document.getElementById('date-display');

    function padZero(num) {
      return num < 10 ? '0' + num : num;
    }

    function updateTime() {
      try {
        const now = new Date();

        let hours = now.getHours();
        const minutes = padZero(now.getMinutes());
        const seconds = padZero(now.getSeconds());

        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;
        const displayHours = padZero(hours);

        const timeString = `${displayHours}:${minutes}:${seconds}`;

        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        };
        const dateString = now.toLocaleDateString('en-US', options);

        timeDisplay.textContent = timeString;
        ampmIndicator.textContent = ampm;
        dateDisplay.textContent = dateString;

      } catch (error) {
        console.error("Error updating the clock:", error);
        timeDisplay.textContent = "Error";
      }
    }

    updateTime();
    setInterval(updateTime, 100);

    let scene, camera, renderer, object, mouseX = 0, mouseY = 0;
    const container = document.getElementById('three-container');

    function initThreeJs() {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0x222222);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      const geometry = new THREE.DodecahedronGeometry(1.5, 0);
      const material = new THREE.MeshPhongMaterial({
        color: 0x10b981,
        wireframe: true,
        shininess: 50
      });
      object = new THREE.Mesh(geometry, material);
      scene.add(object);

      window.addEventListener('resize', onWindowResize, false);
      document.addEventListener('mousemove', onMouseMove, false);

      animate();
    }

    function onWindowResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }

    function onMouseMove(event) {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function animate() {
      requestAnimationFrame(animate);

      object.rotation.x += 0.001;
      object.rotation.y += 0.002;

      object.rotation.x += (mouseY * 0.5 - object.rotation.x) * 0.01;
      object.rotation.y += (mouseX * 0.5 - object.rotation.y) * 0.01;

      renderer.render(scene, camera);
    }

    window.onload = initThreeJs;
