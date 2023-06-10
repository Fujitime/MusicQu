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
