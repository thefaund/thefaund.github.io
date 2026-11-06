# theFAUND 웹사이트

정적 HTML 4페이지 사이트입니다. 서버 없이 `index.html`을 더블클릭해도 열리고, 폴더 전체를 그대로 호스팅(카페24, 가비아, Netlify, GitHub Pages 등)에 올리면 됩니다.

## 구조
```
index.html        About (메인)
technology.html   Technology — HA 기초 / DéMORO Planetary Motion / BiViDerma MLC
products.html     Products — DéMORO · BiViDerma 탭 (BiViDerma는 Export/CE 전환)
contact.html      Contact — 문의 폼
css/style.css     공통 스타일 (브랜드 컬러 #471315 / #ECE9E5)
js/main.js        공통 스크립트 (메뉴, 탭, 문의 폼, 회사 정보)
images/           로고(원본 벡터 SVG), 제품 사진, DéMORO 자료 이미지
```

## 꼭 수정할 곳
- **회사 연락처**: `js/main.js` 맨 위 `SITE` 값(email, phone, address)을 바꾸면 모든 페이지에 반영됩니다.
- **문의 폼**: 지금은 방문자의 메일 앱이 열리며 내용이 자동 작성됩니다. 서버로 바로 받으려면 Formspree 등 폼 서비스 주소를 `contact.html`의 `<form>`의 `action`에 넣고 `data-mailto` 속성을 지우세요.
- **개인정보 처리 문구**: contact.html의 Privacy policy 문구를 실제 정책에 맞게 확인하세요.

## 링크 바로가기
- `products.html#demoro`, `products.html#bividerma` — 해당 탭이 열린 상태로 이동
- `products.html#pure`, `#classic`, `#intense`, `#bv-1`, `#bv-3`, `#bv-5`, `#bv-x1`, `#bv-x2` — 해당 제품으로 이동

## 이미지 출처
- 제품 사진(BiViDerma): 제공받은 제품 스크린샷에서 잘라 사용
- DéMORO 제품·기술 이미지와 잔류 HA 그래프 수치: DéMORO 브로슈어(2025.09) PDF
- 분위기 이미지 3장: Unsplash 무료 라이선스, 외부 링크로 불러옴 (index 띠 배너, technology 페트리 디시, contact 상단)
  - https://unsplash.com/photos/ 에서 `photo-1757509022941`, `photo-1631557676757`, `photo-1746132730694`
  - 운영 시에는 내려받아 `images/` 폴더에 넣고 경로를 바꾸는 것을 권장합니다.
- HA 비교 도식, MLC 구조도, 몰딩 테스트 그림: 사이트용으로 새로 그린 SVG (HTML 안에 포함)
