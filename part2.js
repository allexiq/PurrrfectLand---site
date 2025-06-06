var icon = document.getElementById("icon");
icon.onclick= function(){
	document.body.classList.toggle("dark-theme");
	
if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark"); 
    } else {
        localStorage.setItem("theme", "light"); 
    }
};


window.onload = function () {
    const savedTheme = localStorage.getItem("theme"); 
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme"); 
    } else {
        document.body.classList.remove("dark-theme"); 
    }
};


const elements = ["/ᐠ - ˕ -マ", "^⎚-⎚^", "ᓚ₍ ^. .^₎", "⪩. .⪨"];    


document.addEventListener('click', function(event) {
  
    const randomElement = elements[Math.floor(Math.random() * elements.length)];

    
    const meow = document.createElement('span');
    meow.textContent = randomElement;
    meow.className = 'meow';

    
    meow.style.left = `${event.pageX}px`;
    meow.style.top = `${event.pageY}px`;

    document.body.appendChild(meow);   // il pune in pagina 

    
    setTimeout(() => {
        meow.remove();
    }, 3000);
});

 const loginButton = document.getElementById('loginButton');
        const logoutButton = document.getElementById('logoutButton');
        const usernameInput = document.getElementById('usernameInput');
        const passwordInput = document.getElementById('passwordInput');

        // Simulăm utilizatorii existenți (date hardcoded)
        const users = [
            { username: 'user1@gmail.com', password: 'password123' },
            { username: 'user2@gmail.com', password: 'mypassword' },
            { username: 'allex1q@gmail.com', password: 'admin123' }
        ];

        // Verificăm starea utilizatorului la încărcarea paginii
        window.addEventListener('load', () => {
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (loggedInUser) {
                // Dacă utilizatorul este logat, afișăm doar Logout
                usernameInput.classList.add('hidden');
                passwordInput.classList.add('hidden');
                loginButton.classList.add('hidden');
                logoutButton.classList.remove('hidden');
            }
        });

        // Logica pentru Login
        loginButton.addEventListener('click', () => {
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            // Validăm username-ul și parola
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                // Salvăm sesiunea utilizatorului
                localStorage.setItem('loggedInUser', username);
                alert(`Te-ai logat cu succes ca ${username}`);
                // Ascundem Login și afișăm Logout
                usernameInput.classList.add('hidden');
                passwordInput.classList.add('hidden');
                loginButton.classList.add('hidden');
                logoutButton.classList.remove('hidden');
            } else {
                alert('Username sau parola incorecte!');
            }
        });

        // Logica pentru Logout
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser'); // Ștergem sesiunea utilizatorului
            alert('Te-ai delogat cu succes!');
            // Afișăm din nou Login și ascundem Logout
            usernameInput.classList.remove('hidden');
            passwordInput.classList.remove('hidden');
            loginButton.classList.remove('hidden');
            logoutButton.classList.add('hidden');
        });