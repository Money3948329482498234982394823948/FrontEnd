// 가짜 웹사이트 설정 페이지 - 순수 JavaScript (React 사용 안 함)
// 팀원과 약속한 저장 키: contentLink (문자열), isAbsolute ('true' / 'false')
// 메인 화면에 돌아가려면 MAIN_PAGE에 팀원 메인 파일명을 적으세요. (예: 'index.html')
// 아직 다른 페이지가 없다면 빈 문자열로 두면 저장 후 이 화면에 머뭅니다.
const MAIN_PAGE = '';

const form = document.querySelector('#content-edit-form');
const input = document.querySelector('#Content-input');
const checkbox = document.querySelector('#absoluteCheck');
const message = document.querySelector('#content-edit-message');

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

function returnToMain() {
  if (MAIN_PAGE) window.location.href = MAIN_PAGE;
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

  // 같은 창의 다른 코드에서도 값 변경을 구독할 수 있는 이벤트입니다.
  window.dispatchEvent(new CustomEvent('siteConfigChanged', {
    detail: { contentLink, isAbsolute }
  }));

  returnToMain();
});

loadSavedSettings();
