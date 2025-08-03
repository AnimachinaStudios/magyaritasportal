const chapters = {
    1: {
        title: "Poppy Playtime - Chapter 1",
        image: "images/chapter1.png",
        description: `
        <p>A Poppy Playtime első fejezete mostantól teljes magyar fordítással érhető el, így a történetet teljesen anyanyelven élvezheted.</p>
        `,
        trailer: "https://www.youtube.com/embed/AJnGRhAuWZk?si=c3kAC53GR-G5vks0",
        download: "https://kokonoshy-studio.itch.io/poppy-playtime-magyar"
    },
    2: {
        title: "Poppy Playtime - Chapter 2",
        image: "images/chapter2.png",
        description: `
        <p>A második fejezet magyarítása még folyamatban de hamarosan elkészül és így még mélyebben elmerülhetsz a játék világában magyar nyelven.</p>
        `,
        trailer: "https://www.youtube.com/embed/n6EasSST0BU?si=EKLbo62hNIQMZzC_",
        download: "https://kokonoshy-studio.itch.io/poppy-playtime-chapter-2-magyar"
    },
    3: {
        title: "Poppy Playtime - Chapter 3",
        image: "images/chapter3.png",
        description: `
        <p>Magyarul is elérhető a harmadik fejezet, hogy még izgalmasabb legyen a kaland anyanyelven. De jelenleg még csak felirattal!</p>
        `,
        trailer: "https://www.youtube.com/embed/iDnja4to_-I?si=sTUVqkDL41DWwrpm",
        download: "https://kokonoshy-studio.itch.io/ppch3-magyar"
    },
    4: {
        title: "Poppy Playtime - Chapter 4",
        image: "images/chapter4.png",
        description: `
        <p>Fedezd fel a Chapter 4 rémisztő történetét magyarul, teljes fordítással és lokalizált élménnyel. De jelenleg még csak felirattal!</p>
        `,
        trailer: "https://www.youtube.com/embed/-WlFgNka1QM?si=bMyPnfKbiN6tmxTf",
        download: "https://kokonoshy-studio.itch.io/poppy-playtime-chapter-4-magyar"
    },
    5: {
        title: "Bendy és a Tintagép",
        image: "images/bendy.png",
        description: `
        <p>A magyarítás készülőben van, de már most betekintést nyerhetsz a Bendy sötét világába magyar nyelven.</p>
        `,
        trailer: "https://www.youtube.com/embed/-mUHMhBTPus?si=6v-a-kx5ANdpe8Dc",
        download: "https://kokonoshy-studio.itch.io/"
    },
    6: {
        title: "Granny Chapter 1",
        image: "images/granny.png",
        description: `
        <p>A Granny Chapter 1 magyar verziója fejlesztés alatt áll, de már elérhető kipróbálásra!</p>
        `,
        trailer: "https://www.youtube.com/embed/jD-8kDFQVqI?si=TF2bB9fY1yFQUbPc",
        download: "https://kokonoshy-studio.itch.io/granny-magyar/"
    }
};

let isDetailsVisible = false;
let isAnimating = false;

function showDetails(chapter) {
    const detailCard = document.getElementById("detail-card");
    if (!detailCard) return;

    if (isDetailsVisible || isAnimating) return;

    isAnimating = true;
    const content = document.getElementById("content");

    document.getElementById("detail-title").innerText = chapters[chapter].title;
    document.getElementById("detail-image").src = chapters[chapter].image;
    document.getElementById("detail-description").innerHTML = chapters[chapter].description;
    document.getElementById("download-link").href = chapters[chapter].download;
    const video = document.getElementById("detail-video");
    const baseUrl = chapters[chapter].trailer;

    const embedUrl = baseUrl.replace("watch?v=", "embed/") + "?autoplay=1&mute=1&rel=0&controls=1";
    video.src = embedUrl;


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
    document.getElementById("detail-video").src = "";

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
