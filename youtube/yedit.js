const form = document.getElementById('yedit-form');
const input = document.getElementById('yedit-input');
const error = document.getElementById('yedit-error');
const recent = document.getElementById('yedit-recent');

const RECENT_MAX = 5;

function loadRecent() {
    const list = JSON.parse(localStorage.getItem('ytRecent')) || [];
    return list.map(function (item) {
        return typeof item === 'string' ? { link: item, title: '' } : item;
    });
}

function showRecent() {
    recent.innerHTML = '';
    loadRecent().forEach(function (item) {
        const li = document.createElement('li');
        li.textContent = item.title || item.link;
        li.title = item.link;
        li.addEventListener('click', function () {
            input.value = item.link;
            form.requestSubmit();
        });
        recent.appendChild(li);
    });
}

function addRecent(link, title) {
    const list = loadRecent().filter(function (item) {
        return item.link !== link;
    });
    list.unshift({ link: link, title: title });
    localStorage.setItem('ytRecent', JSON.stringify(list.slice(0, RECENT_MAX)));
    showRecent();
}

function fetchTitle(videoUrl) {
    return fetch('https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent(videoUrl))
        .then(function (res) {
            return res.ok ? res.json() : {};
        })
        .then(function (data) {
            return data.title || '';
        })
        .catch(function () {
            return '';
        });
}

function convertToEmbedUrl(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }
    return null;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const link = input.value.trim();

    const embedUrl = convertToEmbedUrl(link);

    if (!embedUrl) {
        error.textContent = '올바른 유튜브 링크가 아닙니다';
        return;
    }

    error.textContent = '';

    localStorage.setItem('ytLink', embedUrl);

    fetchTitle(embedUrl.replace('/embed/', '/watch?v=')).then(function (title) {
        addRecent(link, title);
    });
});

showRecent();