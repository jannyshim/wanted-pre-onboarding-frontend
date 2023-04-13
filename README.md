# 오늘의 TODO

원티드 프리온보딩 프론트엔드 사전과제를 위해 만든 애플리케이션입니다.
회원가입 & 로그인이 가능하고, TODO 리스트를 작성하는 간단한 애플리케이션입니다.

---

> **[배포링크](https://wanted-pre-onboarding-frontend-rosy.vercel.app/)**

### 테스트용 계정

- 아이디: happy@happy.com
- 비밀번호: 12345678

---

### 프로젝트 실행방법

- 메일 주소로 회원가입을 하고, 로그인을 할 수 있습니다.
- 로그인 한 회원만 TODO 페이지를 이용할 수 있습니다.
- TODO 페이지에서 완료한 todo는 체크박스로 지울 수 있습니다.
- 잘못 눌렀을 경우 다시 체크박스를 눌러서 복귀가 가능합니다.
- 회원가입 시 이메일 주소 형식, 비밀번호 길이, 비밀번호 확인 유효성검사를 합니다.
- 로그아웃이 가능하고, 로그아웃 시 첫 페이지로 돌아갑니다.

---

### 디렉토리 구조

```
📦
src
   ├─ App.js
   ├─ api                       // api 서버요청
   │  └─ API.js
   ├─ assets
   │  └─ global-styles.js
   ├─ components                // todo 페이지용 컴포넌트
   │  ├─ createTodo.js
   │  ├─ todoList.js
   │  └─ todoListItem.js
   ├─ index.js
   ├─ pages                     // 각 페이지
   │  ├─ main.js
   │  ├─ signin.js
   │  ├─ signup.js
   │  └─ todo.js
   └─ util
      └─ validation.js          // 유효성 검사
```

---

### Stack

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"><br/>
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> 
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">

### 고민한 부분

**로그아웃**
API가 한정적이기 때문에, 로컬 스토리지에 저장된 토큰을 삭제하는 방식으로 구현했습니다.

**컴포넌트 구조**
TODO 페이지를 컴포넌트화 해서 유지보수에 용이하도록 구성했습니다.
자주 사용하는 axios 부분을 따로 빼서 api 파일로 재사용에 용이하게 만들었습니다.

**리다이렉션**
로컬 스토리지에 토큰의 유무에 따라, 있는 상태에서는 `/signin`, `/signup`에 접속하면 `/todo`로 리다이렉트 하였습니다. 없는 상태에서 `/todo`에 접속한다면 로그인 하라는 alert창이 뜨며 `/signin`로 리다이렉트 되도록 구현했습니다.

**스타일링**
체크박스 CSS 수정과정에서 `appearance: none`을 이용해 모양과 컬러를 교체하는 방법을 알아내서 적용할 수 있었습니다.
