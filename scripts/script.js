const chapters = {
    1: {
        title: "Poppy Playtime - Chapter 1",
        image: "images/chapter1.png",
        description: `
        <p>A Poppy Playtime első fejezete mostantól teljes magyar fordítással érhető el, így a történetet teljesen anyanyelven élvezheted.</p>
        `,
        trailer: "https://www.youtube.com/embed/AJnGRhAuWZk?si=c3kAC53GR-G5vks0",
        download: "https://animachina-studios.itch.io/poppy-playtime-magyar"
    },
    2: {
        title: "Poppy Playtime - Chapter 2",
        image: "images/chapter2.png",
        description: `
        <p>A második fejezet magyarítása még folyamatban de hamarosan elkészül és így még mélyebben elmerülhetsz a játék világában magyar nyelven.</p>
        `,
        trailer: "https://www.youtube.com/embed/n6EasSST0BU?si=EKLbo62hNIQMZzC_",
        download: "https://animachina-studios.itch.io/poppy-playtime-chapter-2-magyar"
    },
    3: {
        title: "Poppy Playtime - Chapter 3",
        image: "images/chapter3.png",
        description: `
        <p>Magyarul is elérhető a harmadik fejezet, hogy még izgalmasabb legyen a kaland anyanyelven. De jelenleg még csak felirattal!</p>
        `,
        trailer: "https://www.youtube.com/embed/iDnja4to_-I?si=sTUVqkDL41DWwrpm",
        download: "https://animachina-studios.itch.io/ppch3-magyar"
    },
    4: {
        title: "Poppy Playtime - Chapter 4",
        image: "images/chapter4.png",
        description: `
        <p>Fedezd fel a Chapter 4 rémisztő történetét magyarul, teljes fordítással és lokalizált élménnyel. De jelenleg még csak felirattal!</p>
        `,
        trailer: "https://www.youtube.com/embed/-WlFgNka1QM?si=bMyPnfKbiN6tmxTf",
        download: "https://animachina-studios.itch.io/poppy-playtime-chapter-4-magyar"
    }
};

let isDetailsVisible = false;
let isAnimating = false;

function showDetails(chapter) {
    const detailCard = document.getElementById("detail-card");
    if (!detailCard) return;

    if (isDetailsVisible || isAnimating) return;

    // Ellenőrizzük, hogy létezik-e a fejezet
    if (!chapters[chapter]) {
        console.error(`A(z) ${chapter} azonosítójú fejezet nem található!`);
        return;
    }

    isAnimating = true;
    const content = document.getElementById("content");

    document.getElementById("detail-title").innerText = chapters[chapter].title;
    document.getElementById("detail-image").src = chapters[chapter].image;
    document.getElementById("detail-description").innerHTML = chapters[chapter].description;
    
    // Letöltési link beállítása
    const downloadLink = document.getElementById("detail-download-link");
    downloadLink.href = chapters[chapter].download;
    downloadLink.textContent = chapters[chapter].download === "#" ? "Hamarosan..." : "Letöltés";
    
    // Videó beállítása (ha van)
    const video = document.getElementById("detail-video");
    const trailer = chapters[chapter].trailer;
    
    if (trailer && trailer.trim() !== "") {
        video.style.display = "block";
        const embedUrl = trailer.replace("watch?v=", "embed/") + "?autoplay=1&mute=1&rel=0&controls=1";
        video.src = embedUrl;
    } else {
        video.style.display = "none";
    }

    // Kártya megjelenítése
    detailCard.style.display = "block";
    if (content) content.classList.add("blur");

    void detailCard.offsetWidth;
    detailCard.classList.add("visible");

    setTimeout(() => {
        isDetailsVisible = true;
        isAnimating = false;
        document.addEventListener("click", closeOnOutsideClick);
    }, 300);
}

function hideDetails() {
    const detailCard = document.getElementById("detail-card");
    if (!detailCard || !isDetailsVisible || isAnimating) return;

    isAnimating = true;
    const content = document.getElementById("content");

    detailCard.classList.remove("visible");
    if (content) content.classList.remove("blur");
    
    // Videó forrásának törlése
    const video = document.getElementById("detail-video");
    video.src = "";
    video.style.display = "block"; // Alaphelyzetbe állítjuk

    setTimeout(() => {
        detailCard.style.display = "none";
        isDetailsVisible = false;
        isAnimating = false;
        document.removeEventListener("click", closeOnOutsideClick);
    }, 300);
}

function toggleMenu() {
    const menu = document.querySelector("nav");
    const menuToggle = document.querySelector(".menu-toggle");

    menu.classList.toggle("show");
    menuToggle.classList.toggle("active");
}

function closeOnOutsideClick(event) {
    const detailCard = document.getElementById("detail-card");
    const clickedElement = event.target;
    
    if (detailCard.contains(clickedElement)) return;
    if (clickedElement.closest('.card button')) return;
    
    hideDetails();
}

const video = document.getElementById('bg-video');

// Teljesen tiltjuk a jobb klikk menüt
video.addEventListener('contextmenu', e => e.preventDefault());

// Megakadályozzuk, hogy a videó megálljon (pl. billentyűzet vagy kattintás miatt)
video.addEventListener('pause', () => video.play());

// Biztosítjuk, hogy ne lehessen teljes képernyőre tenni
video.addEventListener('webkitfullscreenchange', () => {
    if (document.webkitFullscreenElement) document.webkitExitFullscreen();
});
video.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) document.exitFullscreen();
});