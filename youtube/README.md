# 유튜브 딴짓 화면

몰래 딴짓하는 사이트에서 **우측 상단 유튜브 영상**과 **유튜브 주소 입력 화면**을 담당하는 폴더입니다.

## 파일 구성

| 파일 | 설명 |
| --- | --- |
| `yedit.html` / `yedit.css` / `yedit.js` | 유튜브 주소 입력 화면 (좌측 상단 광고의 X를 누르면 가운데에 뜨는 화면) |
| `youtube.html` / `youtube.css` / `youtube.js` | 우측 상단에 고정되는 유튜브 영상 박스 |

## 동작

1. 좌측 상단 광고의 X를 누르면 `yedit.html`로 이동합니다.
2. 유튜브 링크를 넣고 **입력하기**를 누르면 링크를 저장(`localStorage`의 `ytLink`)하고 `youtube.html`로 이동합니다.
   - 유튜브 링크가 아니면 "올바른 유튜브 링크가 아닙니다"가 뜹니다.
   - **취소하기**를 누르면 이전 화면으로 돌아갑니다.
3. `youtube.html`은 저장된 링크를 읽어서 우측 상단 박스에서 영상을 재생합니다. 박스 안에서 링크를 바로 바꿀 수도 있습니다.

지원하는 링크 형식: `youtube.com/watch?v=`, `youtu.be/`, `youtube.com/shorts/`, `youtube.com/embed/`

## 실행 방법

HTML 파일을 더블클릭(`file://`)으로 열면 유튜브 영상이 재생되지 않을 수 있습니다. 로컬 서버로 열어 주세요.

- VS Code: Live Server로 `youtube/yedit.html` 열기
- 또는 저장소 최상위 폴더에서 `python -m http.server 5500` 실행 후 http://localhost:5500/youtube/yedit.html 접속

## 메인 페이지와 합칠 때

- 광고 X 버튼이 `youtube/yedit.html`로 이동하도록 연결합니다.
- 메인 페이지로 돌아가야 하면 `yedit.js`의 `location.href = 'youtube.html'`을 메인 페이지 주소로 바꿉니다.
- 메인 페이지의 우측 상단 칸에 `.yt-box`를 넣고 `youtube.css`, `youtube.js`를 연결합니다.
