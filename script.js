let photos = [
  {
    name: "jalan",
    url: "alam.jpg",
    alt: "Pantai",
    category: "Alam"
  },
  {
    name: "gunung",
    url: "gunung.jpg",
    alt: "Gunung",
    category: "Alam"
  },
  {
    name: "kota",
    url: "kota.jpg",
    alt: "Kota",
    category: "Kota"
  },
  {
    name: "hutan",
    url: "hutan.jpg",
    alt: "Hutan",
    category: "Alam"
  },
  {
    name: "anak",
    url: "anak.jpg",
    alt: "anak kecil",
    category: "anak"
  },
  {
  name: "anak",
  url: "anak1.jpg",
  alt: "anak kecil",
  category: "anak"
},
{
  name: "cuaca",
  url: "alam1.jpg",
  alt: "kota",
  category: "alam"
},
{
  name: "cuaca",
  url: "alam2.jpg",
  alt: "kota",
  category: "alam"
},
{
  name: "cuaca",
  url: "alam3.jpg",
  alt: "kota",
  category: "alam"
},
{
  name: "cuaca",
  url: "alam4.jpg",
  alt: "kota",
  category: "alam"
},
{
  name: "jalan",
  url: "alam5.jpg",
  alt: "kota",
  category: "alam"
},
{
  name: "gunung",
  url: "gunung1.jpg",
  alt: "kota",
  category: "alam"
},
{
  name: "kota",
  url: "kota1.jpg",
  alt: "kota",
  category: "alam"
},
{
  name: "kota",
  url: "kota2.jpg",
  alt: "kota",
  category: "alam"
},
{
  name: "hutan",
  url: "hutan1.jpg",
  alt: "Hutan",
  category: "Alam"
},
{
  name: "anime",
  url: "anime.jpg",
  alt: "anime",
  category: "anime"
},
{
  name: "Artis",
  url: "artis.jpg",
  alt: "artis",
  category: "artis"
},
{
  name: "Idol",
  url: "idol.jpg",
  alt: "idol",
  category: "idol"
},
{
  name: "anime",
  url: "anime1.jpg",
  alt: "anime",
  category: "anime"
},
{
  name: "Artis",
  url: "artis1.jpg",
  alt: "artis",
  category: "artis"
},
{
  name: "Idol",
  url: "idol1.jpg",
  alt: "idol",
  category: "idol"
},
{
  name: "anime",
  url: "anime2.jpg",
  alt: "anime",
  category: "anime"
},
{
  name: "Artis",
  url: "artis2.jpg",
  alt: "artis",
  category: "artis"
},
{
  name: "Idol",
  url: "idol2.jpg",
  alt: "idol",
  category: "idol"
},
{
  name: "anime",
  url: "anime3.jpg",
  alt: "anime",
  category: "anime"
},
{
  name: "Artis",
  url: "artis3.jpg",
  alt: "artis",
  category: "artis"
},
{
  name: "Idol",
  url: "idol3.jpg",
  alt: "idol",
  category: "idol"
},
];

const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const photoCount = document.getElementById("photoCount");

function renderPhotos() {
  const keyword = searchInput.value.toLowerCase();
  const category = filterCategory.value;

  gallery.innerHTML = "";

  const filtered = photos.filter(p => {
    const matchName = p.name.toLowerCase().includes(keyword);
    const matchCategory = !category || p.category === category;
    return matchName && matchCategory;
  });

  filtered.forEach(photo => {
    const card = document.createElement("div");
    card.className = "photo-card";
    card.dataset.name = photo.name;

    card.innerHTML = `
      <img src="${photo.url}" alt="${photo.alt}" />
      <div class="photo-actions">
        <button onclick="downloadImage(this)">Download</button>
      </div>
    `;

    const img = card.querySelector("img");
    img.addEventListener("click", () => openLightbox(photo.url));
    gallery.appendChild(card);
  });

  photoCount.textContent = `Total Foto: ${filtered.length}`;
}

function downloadImage(button) {
  const img = button.closest('.photo-card').querySelector('img');
  const link = document.createElement('a');
  link.href = img.src;
  link.download = img.alt || 'foto';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function openLightbox(url) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  lightboxImg.src = url;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

searchInput.addEventListener("input", renderPhotos);
filterCategory.addEventListener("change", renderPhotos);

function downloadAll() {
  photos.forEach(photo => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = photo.alt || 'foto';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

document.getElementById("uploadInput").addEventListener("change", function () {
  const files = [...this.files];
  files.forEach(file => {
    const url = URL.createObjectURL(file);
    const name = file.name.split(".")[0];
    photos.push({
      name,
      url,
      alt: name,
      category: "Lokal"
    });
  });
  renderPhotos();
});

function toggleMode() {
  document.body.classList.toggle("light-mode");
}

// Load awal
renderPhotos();
