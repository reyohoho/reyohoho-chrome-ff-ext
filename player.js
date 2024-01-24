let lastUrl = location.href;
const playerTailId = 'watch-kinopoisk-player-tail';
const movieTypes = ['film', 'series'];
const tailImage = `<svg width="100%" height="100%" viewBox="0 0 128 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path id="Banner" d="M128,0L0,0L0,512L64,480L128,512L128,0Z" style="fill:url(#_Linear1);"/><g transform="matrix(6.57572e-17,1.0739,-1.08204,6.62559e-17,327.734,298.698)"><g><path d="M78.752,202.827L99.504,239.449L120.551,275.899L78.752,275.727L36.953,275.899L58.001,239.449L78.752,202.827Z" style="fill:url(#_Linear2);"/></g></g><defs><linearGradient id="_Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(128,512,-2048,512,0,0)"><stop offset="0" style="stop-color:rgb(00,00,00);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(00,00,00);stop-opacity:1"/></linearGradient><linearGradient id="_Linear2" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(96.5309,0,0,97.4299,30.4868,251.542)"><stop offset="0" style="stop-color:rgb(255,255,255);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(255,255,255);stop-opacity:1"/></linearGradient></defs></svg>`;

function mountPlayer(movieId) {
    window.open("https://reyohoho.github.io/reyohoho/#" + movieId, '_blank');
}

function mountPlayerTail(movieId) {
    const playerTile = document.createElement('div');
    playerTile.id = playerTailId;
    playerTile.innerHTML = tailImage;
    playerTile.addEventListener('click', () => mountPlayer(movieId));
    playerTile.addEventListener('mouseover', () => { playerTile.style.top = '0px' });
    playerTile.addEventListener('mouseout', () => { playerTile.style.top = '-32px' });

    setTimeout(() => {
        playerTile.style.top = '-32px';
    }, 100);

    document.body.appendChild(playerTile);
}

function removeElement(elementId) {
    if (document.contains(document.getElementById(elementId))) {
        document.getElementById(elementId).remove();
    }
}

function kinopoiskPageHandler() {
    const pathname = window.location.pathname.substr(1).split('/');
    const movieId = pathname[1];
    const movieType = pathname[0];
    const isMovieIdNum = /^\d+$/.test(movieId);

    if (typeof movieId === 'undefined'
        || typeof movieType === 'undefined'
        || !isMovieIdNum
    ) {
        console.error('Watch kinopoisk wrong movie data');
        removeElement(playerTailId);

        return;
    }

    console.log('Watch kinopoisk movie id: ' + movieId);
    if (movieTypes.includes(movieType)) {
        mountPlayerTail(movieId);
    } else {
        removeElement(playerTailId);
    }
}

window.addEventListener('load', kinopoiskPageHandler)
let prevUrl = undefined;
setInterval(() => {
  const currUrl = window.location.href;
  if (currUrl != prevUrl && (currUrl.indexOf('film',)!=-1 || currUrl.indexOf('series')!=-1)) {
    prevUrl = currUrl;
    kinopoiskPageHandler();
  }
}, 1000);

window.addEventListener('popstate',()=>
{
        history.go();
        kinopoiskPageHandler();
})
