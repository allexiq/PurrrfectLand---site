const welcomeMessage = document.getElementById('welcomeMessage');
        const fileInput = document.getElementById('fileInput');
        const uploadButton = document.getElementById('uploadButton');
        const gallery = document.getElementById('gallery');

        // ia numele utilizatorului din Local Storage
        const username = localStorage.getItem('username');
        if (!username) {
            alert('Nu e?ti autentificat! Vei fi redirec?ionat la login.');
            window.location.href = 'index.html';
        } else {
            welcomeMessage.textContent = `Buna, ${username}! Posteaza poze cu pisici!`;
        }

        // pune imaginile salvate pt utilizator
        const savedImages = JSON.parse(localStorage.getItem(`${username}-images`)) || [];
        savedImages.forEach(imageSrc => displayImage(imageSrc));

        
        uploadButton.addEventListener('click', () => {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imageSrc = e.target.result;
                    savedImages.push(imageSrc);
                    localStorage.setItem(`${username}-images`, JSON.stringify(savedImages));
                    displayImage(imageSrc);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Te rog selecteaza o imagine!');
            }
        });

        // afis img in galerie
        function displayImage(src) {
            const img = document.createElement('img');
            img.src = src;
            const container = document.createElement('div');
            container.className = 'image-container';
            container.appendChild(img);
            gallery.appendChild(container);
        }
		const canvas = document.getElementById('drawingCanvas');
        const ctx = canvas.getContext('2d');
        let isDrawing = false;

        canvas.addEventListener('mousedown', () => (isDrawing = true));
        canvas.addEventListener('mouseup', () => (isDrawing = false));
        canvas.addEventListener('mousemove', (event) => {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            ctx.fillStyle = '#6a0dad';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        });

        document.getElementById('clearCanvas').addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
	 postCanvasButton.addEventListener('click', () => {
            const canvasImage = canvas.toDataURL('image/png'); // convertesc continutul canvas ului in img 
            const img = document.createElement('img');
            img.src = canvasImage;
            img.alt = 'Desen postat';
            canvasPreview.appendChild(img); 
        });
		 saveCanvasButton.addEventListener('click', () => {
            const canvasData = canvas.toDataURL(); // transform canvasul intr o img
            localStorage.setItem('savedCanvas', canvasData); 
            alert('Desenul a fost salvat!');
        });

        
        loadCanvasButton.addEventListener('click', () => {
            const savedCanvas = localStorage.getItem('savedCanvas');
            if (savedCanvas) {
                const img = new Image();
                img.src = savedCanvas;
                img.onload = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height); // dau clear la canvas
                    ctx.drawImage(img, 0, 0); 
                };
            } else {
                alert('Nu exista niciun desen salvat!');
            }
        });

        
        window.addEventListener('load', () => {
            const savedCanvas = localStorage.getItem('savedCanvas');
            if (savedCanvas) {
                const img = new Image();
                img.src = savedCanvas;
                img.onload = () => {
                    ctx.drawImage(img, 0, 0); // desenez imaginea pe canvas
                };
            }
        });