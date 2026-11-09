# Next.js & Node.js 기반 웹 애플리케이션 구축 계획서

본 문서는 **Next.js**(리액트 기반의 프론트엔드 웹 프레임워크)와 **Node.js**(크롬 V8 엔진 기반 자바스크립트 실행 환경)를 분리하여 기본 화면 표시 및 버튼 클릭 기반의 백엔드 연동 기능을 구현하기 위한 개발 계획서입니다.

---

## 1. 프로젝트 아키텍처 및 디렉토리 구조

프로젝트 루트 디렉토리(`D:\AntiGravity\Workspace\myPrj`) 하위에 **Frontend**(프론트엔드 - 사용자 화면 영역)와 **Backend**(백엔드 - 서버 및 데이터 처리 영역)를 독립된 디렉토리로 분리 구성합니다.

```
myPrj/
├── backend/                          # Node.js 백엔드 서버 디렉토리
│   ├── package.json                  # 백엔드 의존성 및 실행 스크립트 정의
│   ├── server.js                     # Express.js 기반 웹 서버 진입점 파일 (API 제공)
│   └── .gitignore
├── frontend/                         # Next.js 프론트엔드 앱 디렉토리
│   ├── package.json                  # 프론트엔드 의존성 및 빌드 스크립트 정의
│   ├── next.config.mjs               # Next.js 환경 설정 파일
│   ├── app/                          # App Router(앱 라우터 - Next.js의 파일 기반 라우팅 시스템)
│   │   ├── layout.tsx (또는 layout.js) # 기본 레이아웃 구성 요소
│   │   └── page.tsx (또는 page.js)     # 메인 인터랙티브 화면 (State 및 클릭 이벤트 처리)
│   └── .gitignore
├── PROJECT_PLAN.md                   # 프로젝트 개발 계획서 (본 문서)
└── README.md                         # 전체 프로젝트 개요 및 실행 안내 문서
```

---

## 2. 핵심 동작 시나리오 (사용자 인터랙션 흐름)

```
[사용자 화면 접속]
       │
       ▼
1. 화면 기본 문구: "hello world!!" 출력
2. "click" 버튼 화면에 배치
       │
       ▼ [사용자가 'click' 버튼 클릭]
3. Frontend(프론트엔드)에서 Backend(백엔드)로 HTTP Request(웹 요청 신호) 전송
       │
       ▼
4. Backend(백엔드) 서버에서 신호 수신 후 "Welcome to the My Project" 메시지 반환
       │
       ▼
5. Frontend(프론트엔드)가 응답을 수신하여 State(상태 데이터) 갱신
       │
       ▼
[화면의 텍스트가 "Welcome to the My Project"로 변경 표시]
```

---

## 3. 사전 점검 및 환경 구성 (사전 조건)

현재 로컬 시스템 상태 점검 결과, 개발에 필요한 **Node.js**(자바스크립트 런타임) 및 **npm**(Node.js 기본 패키지 관리자) 실행 환경이 설정되어 있지 않은 상태입니다.

- **사전 작업**: **Node.js**(v20 LTS 장기 지원 안정화 버전) 설치 진행
  - **Winget**(Windows 패키지 관리자) 명령어를 통한 자동 설치:
    ```powershell
    winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
    ```
  - 설치 완료 후 **Node.js** 및 **npm** 버전 정상 인식 확인

---

## 4. 단계별 세부 구현 계획

### 단계 1: Backend(백엔드) 서버 구축
1. `backend/` 폴더 생성 및 **npm**(패키지 관리자) 초기화 (`package.json` 생성)
2. 필수 의존성 설치:
   - **Express.js**(Node.js 웹 애플리케이션 프레임워크)
   - **CORS**(Cross-Origin Resource Sharing - 서로 다른 도메인 간 자원 공유 권한 정책 허용 모듈)
3. `server.js` 작성:
   - **Port**(네트워크 통신 포트) `5000`번 설정
   - **REST API**(웹 표준 데이터 인터페이스) 엔드포인트 `/api/welcome` 구현
   - 프론트엔드의 요청 수신 시:
     `{ message: "Welcome to the My Project" }` 형태의 **JSON**(경량 데이터 교환 포맷) 응답 반환
4. 백엔드 서버 단독 실행 및 **API** 정상 응답 테스트

### 단계 2: Frontend(프론트엔드) Next.js 앱 구축
1. `frontend/` 디렉토리에 **Next.js**(App Router 적용) 프로젝트 초기화
2. 불필요한 기본 보일러플레이트 코드 제거
3. `frontend/app/page.tsx` 클라이언트 컴포넌트 구현:
   - **State**(상태 관리 변수): `const [message, setMessage] = useState("hello world!!")`
   - **Button**(클릭 버튼): 텍스트가 `"click"`인 버튼 컴포넌트 배치
   - **Event Handler**(이벤트 처리기): 버튼 클릭 시 `http://localhost:5000/api/welcome`으로 **Fetch API**(웹 표준 비동기 네트워크 통신 함수) 비동기 호출 수행
   - 수신한 응답의 `data.message`로 `setMessage("Welcome to the My Project")` 실행하여 화면 문구 갱신
4. **CSS**(계층형 스타일 시트)를 적용하여 텍스트와 버튼이 깔끔하게 정렬되도록 구성

### 단계 3: 프론트엔드-백엔드 통합 연동 및 최종 테스트
1. **Backend**(5000번 포트)와 **Frontend**(3000번 포트) 동시 실행
2. 브라우저에서 `http://localhost:3000` 접속
3. **최종 시나리오 검증**:
   - 최초 접속 시 화면에 `"hello world!!"`가 정상 표시되는지 확인
   - `"click"` 버튼 클릭 시 브라우저 **Network**(네트워크 통신 탭)에서 백엔드 서버(5000번)로 신호가 정상 전달되는지 확인
   - 백엔드로부터 응답을 받아 화면 문구가 즉시 `"Welcome to the My Project"`로 정상 변경되는지 확인
