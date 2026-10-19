const player = document.getElementById('yt-player');

// 유튜브 링크에서 영상 ID(11자리)를 꺼낸다
// 지원: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, youtube.com/embed/ID
function getVideoId(link) {
    const match = link.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/);
    return match ? match[1] : null;
}

// yedit.html에서 저장한 링크로 재생
const saved = localStorage.getItem('ytLink');
const videoId = saved && getVideoId(saved);
if (videoId) {
    player.innerHTML =
        '<iframe src="https://www.youtube.com/embed/' + videoId + '" ' +
        'allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
}
