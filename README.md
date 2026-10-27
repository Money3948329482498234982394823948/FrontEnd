# 가짜 웹사이트 설정 화면 (Vanilla JS)

이 폴더는 **가짜 웹사이트 설정 화면 1개**만 포함합니다. React/Vite가 필요 없습니다.

## 파일
- `fakewebpage.html`: 화면 구성
- `fakewebpage.css`: 화면 스타일
- `fakewebpage.js`: 주소 검사, 저장, 취소, 설정 불러오기

`fakewebpage.html`을 열어 시험할 수 있습니다. GitHub Pages 또는 로컬 서버를 통해 같은 출처에서 실행하면 다른 팀원 페이지와 `localStorage` 값을 공유할 수 있습니다.

## 메인 페이지 연결
메인 페이지에서 `<a href="fakewebpage.html">가짜 웹사이트 설정</a>` 링크를 걸면 됩니다.
`fakewebpage.js`의 맨 위 `const MAIN_PAGE = '';`를 `const MAIN_PAGE = 'index.html';`로 변경하면 저장/취소 후 메인 페이지로 돌아갑니다. 메인 페이지 파일명이 다르면 해당 파일명으로 변경하세요.

## 팀원이 값을 받는 방법 (메인 페이지 JS)
```js
const contentLink = localStorage.getItem('contentLink') || '';
const isAbsolute = localStorage.getItem('isAbsolute') === 'true';

// 예: 메인 페이지의 iframe에 주소 적용
// document.querySelector('#site-frame').src = contentLink;
// 광고 요소 위치 변경은 isAbsolute로 제어
```

`localStorage`는 같은 출처(프로토콜+도메인+포트)에서만 공유됩니다. 서로 다른 GitHub Pages 주소에서는 공유되지 않으므로 팀원 페이지와 이 설정 페이지를 **같은 사이트 경로**에 배포해야 합니다. 다른 웹사이트는 보안 정책 때문에 iframe 안에서 열리지 않을 수 있습니다.

## GitHub 팀 작업 추천
팀원 공동 저장소 안에 위 **3개의 소스 파일**을 넣되, 다른 친구의 `index.html`을 덮어쓰지 마세요.

```bash
git checkout -b feature/content-edit
git add fakewebpage.html fakewebpage.css fakewebpage.js
git commit -m "feat: add website setting page"
git push -u origin feature/content-edit
```
그다음 GitHub에서 `feature/content-edit` 브랜치로 Pull Request를 만들어 팀원에게 병합을 요청하면 됩니다.
