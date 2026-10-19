const form = document.getElementById('yt-form');
const input = document.getElementById('yt-input');
const error = document.getElementById('yt-error');
const player = document.getElementById('yt-player');

// 유튜브 링크에서 영상 ID(11자리)를 꺼낸다
// 지원: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, youtube.com/embed/ID
function getVideoId(link) {
    const match = link.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/);
    return match ? match[1] : null;
}

function play(videoId) {
    player.innerHTML =
        '<iframe src="https://www.youtube.com/embed/' + videoId + '" ' +
        'allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const videoId = getVideoId(input.value.trim());

    if (!videoId) {
        error.textContent = '올바른 유튜브 링크가 아닙니다';
        return;
    }

    error.textContent = '';
    play(videoId);
    localStorage.setItem('ytLink', input.value.trim());
});

// 새로고침해도 마지막 링크 유지
const saved = localStorage.getItem('ytLink');
if (saved) {
    input.value = saved;
    play(getVideoId(saved));
}
