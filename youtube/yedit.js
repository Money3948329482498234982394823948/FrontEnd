const form = document.getElementById('yedit-form');
const input = document.getElementById('yedit-input');
const error = document.getElementById('yedit-error');
const cancel = document.getElementById('yedit-cancel');

// youtube.js와 같은 규칙으로 링크가 유효한지 확인
function isYoutubeLink(link) {
    return /(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/.test(link);
}

// 입력하기: 링크를 저장하고 영상 화면으로 이동 (youtube.js가 ytLink를 읽어서 재생)
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const link = input.value.trim();

    if (!isYoutubeLink(link)) {
        error.textContent = '올바른 유튜브 링크가 아닙니다';
        return;
    }

    localStorage.setItem('ytLink', link);
    location.href = 'youtube.html';
});

// 취소하기: 이전 화면으로 돌아가기
cancel.addEventListener('click', function () {
    history.back();
});
