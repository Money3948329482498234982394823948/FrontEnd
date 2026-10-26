const form = document.getElementById('yedit-form');
const input = document.getElementById('yedit-input');
const error = document.getElementById('yedit-error');
const recent = document.getElementById('yedit-recent');

const RECENT_MAX = 5;

// 최근 링크 목록을 불러온다 (없으면 빈 배열)
function loadRecent() {
    return JSON.parse(localStorage.getItem('ytRecent')) || [];
}

// 최근 링크 목록을 화면에 그린다. 링크를 클릭하면 다시 입력
function showRecent() {
    recent.innerHTML = '';
    loadRecent().forEach(function (link) {
        const li = document.createElement('li');
        li.textContent = link;
        li.addEventListener('click', function () {
            input.value = link;
            form.requestSubmit();
        });
        recent.appendChild(li);
    });
}

// 맨 앞에 추가하고, 같은 링크는 중복 제거, 최대 5개까지 저장
function addRecent(link) {
    const list = loadRecent().filter(function (item) {
        return item !== link;
    });
    list.unshift(link);
    localStorage.setItem('ytRecent', JSON.stringify(list.slice(0, RECENT_MAX)));
    showRecent();
}

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
    addRecent(link);

    // TODO: 영상이 재생되는 페이지(또는 메인 화면)로 이동 (경로는 프로젝트 구조에 맞게 수정하세요)
    // 예: window.location.href = '../index.html';
});

showRecent();