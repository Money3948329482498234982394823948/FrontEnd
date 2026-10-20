const form = document.getElementById('yedit-form');
const input = document.getElementById('yedit-input');
const error = document.getElementById('yedit-error');

// 유튜브 링크에서 Video ID를 추출하여 embed 형식으로 변환하는 함수
function convertToEmbedUrl(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }
    return null;
}

// 입력하기: 링크를 embed 형식으로 변환하여 저장하고 화면 이동
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const link = input.value.trim();

    // embed 링크로 변환 시도
    const embedUrl = convertToEmbedUrl(link);

    if (!embedUrl) {
        error.textContent = '올바른 유튜브 링크가 아닙니다';
        return;
    }

    // 에러 메시지 초기화
    error.textContent = '';

    // 변환된 embed 주소를 localStorage에 저장
    localStorage.setItem('ytLink', embedUrl);

    // TODO: 영상이 재생되는 페이지(또는 메인 화면)로 이동 (경로는 프로젝트 구조에 맞게 수정하세요)
    // 예: window.location.href = '../index.html';
});