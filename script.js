const chapters = {
    1: {
        title: "Poppy Playtime - Chapter 1",
        image: "images/chapter1.png",
        description: `
            <p>Örömmel értesítünk minden Poppy Playtime rajongót, hogy elkészült a teljes magyarítás! Mostantól még izgalmasabb lesz a játék, hiszen a történetet és a karaktereket anyanyelvünkön élvezhetitek! 🇭🇺🎮</p>

            <h3>🔹 Miért érdemes kipróbálni?</h3>
            <ul>
                <li>✅ Teljes magyar fordítás 🎭</li>
                <li>✅ Szinkronizált karakterek 🎙️</li>
                <li>✅ Egyszerű telepítés 🛠️</li>
            </ul>

            <h3>👥 Fordítói csapat</h3>
            <ul>
                <li>🔹 <b>Textúrák fordítása és elkészítése:</b> <a href="https://x.com/frienbear28478?t=A4UQUnhVjb-GJFJJ8MLwiA&s=09" target="_blank">SunBakery Twitter (X)</a></li>
                <li>🔹 <b>Feliratok fordítása és modolás:</b> Kondix</li>
                <li>🔹 <b>Tesztelés:</b> Discord tagok, Kondix</li>
            </ul>

            <h3>🎤 Szinkronszínészek (BÉTA verzió)</h3>
            <ul>
                <li>🎙️ Elliot Ludwig – @Trashy</li>
                <li>🎙️ Leith Pierre – @ThauXeon</li>
                <li>🎙️ Rich – @SansTheSkeleton</li>
                <li>🎙️ Avery – @Trafn</li>
                <li>🎙️ Poppy – @Kai</li>
                <li>🎙️ Female Narrátor – @Nikoletta</li>
                <li>🎙️ Stella – @Kai</li>
                <li>🎙️ Interjúztató – @Trashy</li>
            </ul>

            <p>⚠️ A szinkron jelenleg BÉTA verzióban van, így előfordulhatnak kisebb hibák!</p>
        `,
        trailer: "https://www.youtube.com/embed/Wwbr-eFIKRw?si=Qxrgd2rDeKUIh1ls",
        download: "https://kokonoshy-studio.itch.io/poppy-playtime-magyar"
    },
    2: {
        title: "Poppy Playtime - Chapter 2",
        image: "images/chapter2.png",
        description: `
            <h3>A MAGYARÍTÁS FEJLESZTÉS ALATT!</h3>
            <p>Szeretnéd magyarul játszani a Poppy Playtime Chapter 2-t? Akkor ez a mod neked készült! A magyarítás segítségével teljes mértékben élvezheted a játék történetét, ijesztő pillanatait és rejtélyeit, immár anyanyelveden.</p>
            
            <p><b>Mivel feliratok nincsenek a játékban, ezért csak a textúrák magyarítását tudjuk megcsinálni.</b></p>
            
            <ul>
                <li>🔹 Magyar Textúrák és Dokumentációk</li>
                <li>🔹 Egyszerű telepítés</li>
                <li>🔹 Eredeti játékélmény, magyar nyelven</li>
            </ul>
        `,
        trailer: "https://www.youtube.com/embed/yn_Ht3N80X0?si=PsX7Y0POZ9fOeAyU",
        download: "https://kokonoshy-studio.itch.io/poppy-playtime-chapter-2-magyar"
    },
    3: {
        title: "Poppy Playtime - Chapter 3",
        image: "images/chapter3.png",
        description: `
            <h3>🎮 Poppy Playtime Chapter 3 – Magyarítás 🇭🇺</h3>
            <p>Szeretnéd magyarul élvezni a Poppy Playtime Chapter 3 borzongató kalandjait? 🧸👻 Itt a teljes magyarítás, amit könnyedén telepíthetsz!</p>

            <p><b>||| by: Animachina Studios |||</b></p>

            <h3>⚠ Fontos Megjegyzések ⚠</h3>
            <ul>
                <li>✅ A magyarítás kizárólag a játék eredeti verziójával működik.</li>
                <li>✅ Ha a játék frissül, előfordulhat, hogy újra kell telepíteni a fordítást.</li>
                <li>✅ Ha bármilyen problémába ütközöl, próbáld meg újratelepíteni a magyarítást.</li>
            </ul>

            <p>👾 Jó játékot, és ne hagyd, hogy CatNap elkapjon! 👀💀</p>
        `,
        trailer: "https://www.youtube.com/embed/wEyyL5YFQuM?si=lmbDm6KbA7cJaM0H",
        download: "https://kokonoshy-studio.itch.io/ppch3-magyar"
    },
    4: {
        title: "Poppy Playtime - Chapter 4",
        image: "images/chapter4.png",
        description: `
            <p>Merülj el még jobban a Poppy Playtime hátborzongató világában ezzel a teljes magyar fordítással! A Magyarítás Mod segítségével az egész Chapter 4 történetét, párbeszédeit és menüit anyanyelveden élvezheted.</p>

            <ul>
                <li>🔹 Teljes magyar szöveg – Menük, párbeszédek és feliratok fordítása</li>
                <li>🔹 Eredeti élmény megőrzése – Az atmoszféra és a játék hangulata változatlan marad</li>
                <li>🔹 Egyszerű telepítés – Könnyen telepíthető és kompatibilis a legfrissebb verzióval</li>
            </ul>

            <h3>⚠ FIGYELEM!</h3>
            <p>A fájlt semmiképp se nevezd át, különben nem fog működni!</p>

            <p><b>📌 Fontos!</b> Ez egy rajongói fordítás, és nem a hivatalos fejlesztők által készült. A mod használatához az eredeti játék szükséges.</p>

            <p>Töltsd le most, és éld át a Poppy Playtime: Chapter 4 rémisztő pillanatait magyarul! 🎃👻</p>
        `,
        trailer: "https://www.youtube.com/embed/bXMfqsuUqNo?si=3hj6c_fOpf2pPcYW",
        download: "https://kokonoshy-studio.itch.io/poppy-playtime-chapter-4-magyar"
    }
};

function showDetails(chapter) {
    const detailCard = document.getElementById("detail-card");
    const content = document.getElementById("content");

    document.getElementById("detail-title").innerText = chapters[chapter].title;
    document.getElementById("detail-image").src = chapters[chapter].image;
    document.getElementById("detail-description").innerHTML = chapters[chapter].description;
    document.getElementById("download-link").href = chapters[chapter].download;

    document.getElementById("detail-video").src = chapters[chapter].trailer;

    content.classList.add("blur");

    detailCard.style.display = "block";
    
    setTimeout(() => {
        detailCard.classList.add("show");
    }, 50);
    
    setTimeout(() => {
        document.addEventListener("click", closeOnOutsideClick);
    }, 100);
}

function hideDetails() {
    const detailCard = document.getElementById("detail-card");
    const content = document.getElementById("content");

    document.getElementById("detail-video").src = "";

    detailCard.classList.remove("show");
    detailCard.classList.add("hide");
    content.classList.remove("blur");

    document.removeEventListener("click", closeOnOutsideClick);

    setTimeout(() => {
        detailCard.style.display = "none";
        detailCard.classList.remove("hide");
    }, 500);
}

function toggleMenu() {
    const menu = document.querySelector("nav");
    const menuToggle = document.querySelector(".menu-toggle");

    menu.classList.toggle("show");
    menuToggle.classList.toggle("active");
}

function closeOnOutsideClick(event) {
    const detailCard = document.getElementById("detail-card");
    if (!detailCard.contains(event.target)) {
        hideDetails();
    }
}
