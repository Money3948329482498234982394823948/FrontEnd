// 가짜 웹사이트 설정 페이지 - 순수 JavaScript (React 사용 안 함)
// 팀원과 약속한 저장 키: contentLink (문자열), isAbsolute ('true' / 'false')
const form = document.querySelector('#content-edit-form');
const input = document.querySelector('#Content-input');
const checkbox = document.querySelector('#absoluteCheck');
const message = document.querySelector('#content-edit-message');
const recent = document.querySelector('#content-edit-recent');

const RECENT_MAX = 5;

// 최근 저장한 주소 목록 (저장 키: contentRecent)
function loadRecent() {
  return JSON.parse(localStorage.getItem('contentRecent')) || [];
}

// 목록을 그린다. 주소를 클릭하면 그 주소로 다시 저장
function showRecent() {
  recent.innerHTML = '';
  loadRecent().forEach((link) => {
    const li = document.createElement('li');
    li.textContent = link;
    li.addEventListener('click', () => {
      input.value = link;
      form.requestSubmit();
    });
    recent.appendChild(li);
  });
}

// 맨 앞에 추가하고, 같은 주소는 중복 제거, 최대 5개까지 저장
function addRecent(link) {
  const list = loadRecent().filter((item) => item !== link);
  list.unshift(link);
  localStorage.setItem('contentRecent', JSON.stringify(list.slice(0, RECENT_MAX)));
  showRecent();
}

function loadSavedSettings() {
  input.value = localStorage.getItem('contentLink') || '';
  checkbox.checked = localStorage.getItem('isAbsolute') === 'true';
}

function normalizeWebsiteAddress(rawAddress) {
  let address = rawAddress.trim();
  if (!address) return null;
  if (!/^https?:\/\//i.test(address)) address = `https://${address}`;

  try {
    const url = new URL(address);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    if (!url.hostname.includes('.') || /\s/.test(address)) return null;
    return url.href;
  } catch {
    return null;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!input.value.trim()) {
    alert('링크를 입력해주세요');
    input.focus();
    return;
  }

  const contentLink = normalizeWebsiteAddress(input.value);
  if (!contentLink) {
    alert('올바른 웹사이트 주소를 입력해주세요');
    input.focus();
    return;
  }

  const isAbsolute = checkbox.checked;
  localStorage.setItem('contentLink', contentLink);
  localStorage.setItem('isAbsolute', String(isAbsolute));
  input.value = contentLink;
  message.textContent = '설정이 저장되었습니다.';
  addRecent(contentLink);

  // 같은 창의 다른 코드에서도 값 변경을 구독할 수 있는 이벤트입니다.
  window.dispatchEvent(new CustomEvent('siteConfigChanged', {
    detail: { contentLink, isAbsolute }
  }));
});

loadSavedSettings();
showRecent();
