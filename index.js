const currentTime = document.getElementById("currentTime");
const audioSlider = document.getElementById("audioSlider");
const volumeSlider = document.getElementById("volumeSlider");
const content = document.querySelector(".content");
const navsBtn = document.querySelectorAll(".navs span");
const navs = [...navsBtn];
let audio = new Audio();
const btn = document.getElementById("dark-mode-btn");
const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");
const navsu = document.querySelector(".navs");
const container = document.querySelector(".container");
const contento = document.querySelector(".content");
const bawah = document.querySelector(".current-play");
const logo = document.querySelector(".logo");
const logoSrc = logo.getAttribute("src");
const darkModeLogoSrc = "./img/ico/whaito-icon.png";
const lightSrc = "./img/light.png";
const yingAndYang = document.querySelector(".yinAndYang");
const yinAndYangSrc = yingAndYang.getAttribute("src");

btn.addEventListener("click", function () {
  body.classList.toggle("mode");
  if (body.classList.contains("mode")) {
    logo.src = darkModeLogoSrc;
    yingAndYang.src = lightSrc;
  } else {
    logo.src = logoSrc;
    yingAndYang.src = yinAndYangSrc;
  }
});
audio.addEventListener("timeupdate", () => {
  const currentTimeValue = audio.currentTime;
  const formattedTime = formatTime(currentTimeValue);
  currentTime.textContent = formattedTime;

  const progress = (audio.currentTime / audio.duration) * 100;
  audioSlider.value = progress;
});

audioSlider.addEventListener("input", function () {
  const seekToTime = audio.duration * (audioSlider.value / 100);
  audio.currentTime = seekToTime;
});

volumeSlider.addEventListener("input", function () {
  audio.volume = volumeSlider.value / 100;
});

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
function toggleDarkMode() {
  body.classList.toggle("dark-modes");
  navbar.classList.toggle("dark-modes-nav");
  navsu.classList.toggle("dark-modes-navs");
  container.classList.toggle("dark-modes-contain");
  contento.classList.toggle("dark-modes-content");
  bawah.classList.toggle("dark-modes-bawah");
}

const darkModeBtn = document.getElementById("dark-mode-btn");
darkModeBtn.addEventListener("click", toggleDarkMode);

navs.map((btn) => {
  btn.addEventListener("click", function () {
    let key = this.dataset.name;
    navs.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
    if (key == "song") {
      getAllData(showAllSong);
    } else if (key == "album") {
      getArtistDatabase(showSongByAlbum);
    } else if (key == "artist") {
      getArtistDatabase(showSongByArtist);
    }
  });
});

getAllData(showAllSong);
getDataById(btnPlay, 0);

function getAllData(callback) {
  fetch("data.json")
    .then((response) => response.json())
    .then((response) => callback(response))
    .catch((response) => callback(response));
}

function getDataById(callback, key) {
  fetch("data.json")
    .then((response) => response.json())
    .then((response) => callback(response[key]))
    .catch((response) => callback(response));
}

function getDataBySpesific(callback, key, value) {
  fetch("data.json")
    .then((response) => response.json())
    .then((response) => {
      let data = response.filter((item) => item[key] == value);
      callback(data);
    })
    .catch((response) => callback(response));
}

function getArtistDatabase(callback) {
  fetch("artist.json")
    .then((response) => response.json())
    .then((response) => callback(response))
    .catch((response) => callback(response));
}

function showAllSong(data) {
  let card = "";
  data.sort((a, b) => a.song.localeCompare(b.song));
  data.forEach((item, id) => (card += elSong(item, id)));
  content.innerHTML = `<div class="content-row">${card}</div>`;
  chooseSong();
}

function showSongByAlbum(data) {
  let card = "";
  let arr = [];
  data.forEach((item) => {
    item.album.forEach((count) => arr.push(count));
  });
  arr.sort((a, b) => a.title.localeCompare(b.title));
  arr.forEach((album) => (card += elAlbum(album)));
  content.innerHTML = `<div class="content-column">${card}</div>`;
  showDetailSong("album");
}

function showSongByArtist(data) {
  let card = "";
  data.sort((a, b) => a.artist.localeCompare(b.artist));
  data.forEach((item) => (card += elArtist(item)));
  content.innerHTML = `<div class="content-column">${card}</div>`;
  showDetailSong("artist");
}

function showDetailSong(key) {
  const cardVertical = document.querySelectorAll(".card-vertical");
  let card = [...cardVertical];
  card.map((btn) => {
    btn.addEventListener("click", function () {
      getDataBySpesific(showAllSong, key, this.dataset.title);
    });
  });
}

function chooseSong() {
  const file = document.querySelectorAll(".card");
  const song = [...file];
  song.map((btn) => {
    btn.addEventListener("click", function () {
      audioCheck(this.dataset.file);
    });
  });
}

function audioCheck(src) {
  const btn = document.querySelector(".btn-play img");
  if (audio.paused == true) {
    audio.src = "file/" + src;
    audio.play();
    btn.src = "img/btn-play.png";
    loadData();
  } else {
    btn.src = "img/btn-pause.png";
    audio.pause();
    audio.src = "file/" + src;
    audio.play();
    btn.src = "img/btn-play.png";
    loadData();
  }
  getDataBySpesific(setCurrentSong, "file", src);
  audioSlider.value = 0;
}

function loadData() {
  const elLoad = document.querySelector(".loading-col");
  audio.addEventListener("loadstart", function () {
    elLoad.innerHTML = eLoad();
  });
  audio.addEventListener("playing", function () {
    elLoad.innerHTML = "";
  });
}

function setCurrentSong(data) {
  const currentInfo = document.querySelector(".current-info");
  let card = "";
  data.forEach((item) => (card += elCurrentSong(item)));
  currentInfo.innerHTML = card;
  audioSlider.value = 0;
}

function btnPlay(data) {
  const btn = document.querySelector(".btn-play img");
  const arr = [];
  arr.push(data);
  btn.addEventListener("click", function () {
    if (audio.paused == true) {
      if (audio.src == "") {
        audioCheck(data.file);
      } else {
        audio.play();
      }
      this.src = "img/btn-play.png";
    } else {
      audio.pause();
      this.src = "img/btn-pause.png";
    }
  });
}

let currentIndex = 0;

function chooseSong() {
  const songCards = document.querySelectorAll(".card");
  const songs = Array.from(songCards);

  songs.forEach((song, index) => {
    song.addEventListener("click", () => {
      const selectedFile = song.dataset.file;
      audioCheck(selectedFile);
      currentIndex = index;
      updateButtonVisibility();
    });
  });
}

function playNextSong() {
  currentIndex++;
  const songCards = document.querySelectorAll(".card");
  const totalSongs = songCards.length;

  if (currentIndex >= totalSongs) {
    currentIndex = 0;
  }

  const nextSong = songCards[currentIndex];
  const nextSongFile = nextSong.dataset.file;
  audioCheck(nextSongFile);
  updateButtonVisibility();
}

function playPreviousSong() {
  currentIndex--;
  const songCards = document.querySelectorAll(".card");
  const totalSongs = songCards.length;

  if (currentIndex < 0) {
    currentIndex = totalSongs - 1;
  }

  const previousSong = songCards[currentIndex];
  const previousSongFile = previousSong.dataset.file;
  audioCheck(previousSongFile);
  updateButtonVisibility();
}

function updateButtonVisibility() {
  const backButton = document.getElementById("btn-back");

  if (currentIndex === 0) {
    backButton.style.display = "none";
  } else {
    backButton.style.display = "block";
  }
}

const backButton = document.getElementById("btn-back");
backButton.addEventListener("click", playPreviousSong);
updateButtonVisibility();

const nextButton = document.getElementById("btn-next");
nextButton.addEventListener("click", playNextSong);

function elCurrentSong(data) {
  return `
    <figure class="card">
        <div class="img">
            <img src="img/${data.img}" alt="">
        </div>
        <figcaption>
            <h4>${data.song}</h4>
            <p>${data.artist}</p>
        </figcaption>
    </figure>
    `;
}

function elArtist(data) {
  return `
    <figure class="card-vertical" data-title="${data.artist}">
        <div class="img">
            <img src="img/${data.img}" alt="">
        </div>
        <figcaption>
            <h4>${data.artist.substring(0, 9)}</h4>
        </figcaption>
    </figure>
    `;
}

function elAlbum(data) {
  return `
    <figure class="card-vertical" data-title="${data.title}">
        <div class="img">
            <img src="img/${data.img}" alt="">
        </div>
        <figcaption>
            <h4>${data.title.substring(0, 9)}</h4>
        </figcaption>
    </figure>
    `;
}

function elSong(data, id) {
  return `
    <figure class="card" data-id='${id}' data-file='${data.file}'>
        <div class="img">
            <img src="img/${data.img}" alt="">
        </div>
        <figcaption>
            <h4>${data.song}</h4>
            <p>${data.artist}</p>
        </figcaption>
    </figure>
    `;
}

function eLoad() {
  // komentar dulu sementara . karena ada bug
  // jika button next ditekan saat lagu habis maka akan loading terus dan
  // jika lagu tidak ada juga akan loading terus
  //   return `
  //     <div class="loading">
  //         <img src="./img/loading.gif" alt="loading" class="loading-img">
  //     </div>
  //     `;
}
