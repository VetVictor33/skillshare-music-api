const search = document.querySelector('#searchInput');
const btnSearch = document.querySelector('button');
const songsArticle = document.querySelector('.songs');

function getSongs(song) {
    if (!song || song == ' ') {
        return
    }
    cleanSongs()
    const URL = `https://itunes.apple.com/search?media=music&limit=12&term=${song}`
    fetch(URL)
        .then((response) => response.json())
        .then((dados) => {
            const data = dados.results;
            return data.map(result => {
                const songArticle = document.createElement('article'),
                    songImg = document.createElement('img'),
                    songArtist = document.createElement('p'),
                    songName = document.createElement('p'),
                    albumName = document.createElement('p'),
                    songAudio = document.createElement('audio'),
                    songSrc = document.createElement('source');

                songImg.src = result.artworkUrl100;
                songArtist.innerHTML = result.artistName;
                songName.innerHTML = result.trackName;
                albumName.innerHTML = result.collectionName;
                songSrc.src = result.previewUrl;

                songsArticle.appendChild(songArticle);
                songArticle.appendChild(songImg);
                songArticle.appendChild(songArtist);
                songArticle.appendChild(albumName);
                songArticle.appendChild(songName);
                songArticle.appendChild(songAudio);
                songAudio.appendChild(songSrc);

                songAudio.setAttribute('controls', '')

                songArticle.classList.add('song');
                songImg.classList.add('song-img');
                songArtist.classList.add('song-artist');
                albumName.classList.add('album-name');
                songName.classList.add('song-name');
                songAudio.classList.add('song-audio');
            })
        })
        .catch(error => console.log("Request failed: ", error));
}

function cleanSongs() {
    while (songsArticle.firstChild) {
        songsArticle.removeChild(songsArticle.firstChild)
    }
}

btnSearch.addEventListener('click', () => {
    getSongs(search.value)
    search.value = ''
})

search.addEventListener('keypress', e => {
    if (e.key != 'Enter') {
        return
    }
    getSongs(search.value)
    search.value = ''
})

document.addEventListener('play', e => {
    const audios = document.getElementsByTagName('audio');
    for (let i = 0; i < audios.length; i++) {
        if (audios[i] != e.target) {
            audios[i].pause();
        }
    }
}, true)
