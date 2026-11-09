# myPrj - Next.js & Node.js 웹 애플리케이션

**Next.js**(리액트 기반 웹 프레임워크) 프론트엔드와 **Node.js**(Express.js 기반) 백엔드로 구성된 풀스택 웹 애플리케이션 프로젝트입니다.

---

## 1. 프로젝트 구조

```
myPrj/
├── backend/                          # Node.js 백엔드 서버 (Port: 5000)
│   ├── package.json
│   ├── server.js                     # Express.js API 서버 (/api/welcome)
│   └── .gitignore
├── frontend/                         # Next.js 프론트엔드 클라이언트 (Port: 3000)
│   ├── package.json
│   ├── next.config.mjs
│   ├── app/
│   │   ├── layout.js                 # 기본 HTML 레이아웃
│   │   ├── page.js                   # Hello World & 버튼 클릭 비동기 연동 화면
│   │   └── globals.css               # 스타일 정의
│   └── .gitignore
├── PROJECT_PLAN.md                   # 프로젝트 개발 계획서
└── README.md                         # 프로젝트 안내 문서 (본 문서)
```

---

## 2. 주요 기능 및 동작 흐름

1. **초기 화면**: 브라우저에서 `http://localhost:3000` 접속 시 화면 중앙에 `"hello world!!"` 문구와 `"click"` 버튼 표시
2. **버튼 클릭**: 사용자가 `"click"` 버튼을 클릭하면 프론트엔드에서 백엔드 `http://localhost:5000/api/welcome` 엔드포인트로 **HTTP Request**(웹 통신 요청) 전송
3. **백엔드 응답**: 백엔드 서버가 `{ "message": "Welcome to the My Project" }` **JSON**(경량 데이터 포맷) 응답 반환
4. **화면 갱신**: 프론트엔드가 응답값을 수신하여 화면의 문구를 `"Welcome to the My Project"`로 즉시 변경

---

## 3. 실행 방법 (Windows PowerShell 기준)

### 백엔드 서버 실행
```powershell
cd D:\AntiGravity\Workspace\myPrj\backend
npm start
# 또는: node server.js
# 서버 주소: http://localhost:5000
```

### 프론트엔드 개발 서버 실행
```powershell
cd D:\AntiGravity\Workspace\myPrj\frontend
npm run dev
# 접속 주소: http://localhost:3000
```
