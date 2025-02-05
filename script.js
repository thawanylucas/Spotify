document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("toggleTheme");
    const body = document.body;
    const themeIcon = document.querySelector(".theme__content .fa");
    const logoImage = document.getElementById("logo");

    // alternar modo
    function updateTheme(isDark) {
        if (isDark) {
            body.classList.add("dark-theme");
            body.classList.remove("light-theme");
            logoImage.src = "./assets/icons/logo-light.png";
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
            themeIcon.style.color = "#b3b3b3";
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.add("light-theme");
            body.classList.remove("dark-theme");
            logoImage.src = "./assets/icons/logo-dark.png";
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
            themeIcon.style.color = "#141414";
            localStorage.setItem("theme", "light");
        }
    }

    //tema escuro por padrão
    let savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
        savedTheme = "dark";
    }

    if (savedTheme === "dark") {
        themeToggle.checked = true;
        updateTheme(true); 
    } else {
        themeToggle.checked = false; 
        updateTheme(false); 
    }

    themeToggle.addEventListener("change", () => {
        if (themeToggle.checked) {
            updateTheme(true);
        } else {
            updateTheme(false);
        }
    });


    // footer

    const hideButton = document.querySelector(".hide__button");
    const footer = document.querySelector(".disclaimer-premium");
    const showFooterContainer = document.querySelector(".show__footer");
    const showFooterButton = document.querySelector(".showFooter__button");
    hideButton.addEventListener("click", () => {
        footer.classList.add("hidden"); 
        setTimeout(() => {
            footer.style.display = "none";
            showFooterContainer.style.display = "block";
        }, 500); 
    });
    showFooterButton.addEventListener("click", () => {
        footer.style.display = "flex";
        setTimeout(() => {
            footer.classList.remove("hidden");
        }, 10);
        showFooterContainer.style.display = "none";
    });
    // artistas
    const searchInput = document.getElementById('search-input');
    const resultArtist = document.getElementById("result-artist");
    const resultPlaylist = document.getElementById('result-playlists');
    
    function requestApi(searchTerm) {
        fetch("http://localhost:3000/artists")
            .then(response => response.json())
            .then(data => {
                const filteredResults = data.filter(artist =>
                    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
    
                console.log("Resultado filtrado:", filteredResults); // Debug
    
                displayResults(filteredResults);
            })
            .catch(error => console.error("Erro ao buscar dados:", error));
    }
        
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm === '') {
            resultPlaylist.classList.add('hidden');
            resultArtist.classList.remove('hidden');
            return
        }
        
        requestApi(searchTerm);
    })

    function displayResults(result) {
        resultPlaylist.classList.add("hidden")
        const artistName = document.getElementById('artist-name');
        const artistImage = document.getElementById('artist-img');
    
        result.forEach(element => {
            artistName.innerText = element.name;
            artistImage.src = element.urlImg;
        });
    
        resultArtist.classList.remove('hidden');
    }
});