# FoundDream - 찾아드림

학교/동아리 내에서 발생하는 분실물을 빠르게 공유하고, 습득/반환 상태를 관리해 분실물 회수율을 높이기 위한 게시판 서비스

## 기술 스택

- **Frontend:** React + TypeScript + Vite
- **Backend:** Express + TypeScript
- **Database:** MongoDB + Mongoose
- **Dummy Data:** Chance
- **Test:**
  - Backend: Jest + Supertest + mongodb-memory-server
  - Frontend: Vitest + React Testing Library

## 프로젝트 구조

```
FoundDream/
├── client/         # React 프론트엔드
│   ├── src/
│   │   ├── api/        # API 호출 함수
│   │   ├── components/ # 재사용 컴포넌트
│   │   ├── pages/      # 페이지 컴포넌트
│   │   ├── types/      # TypeScript 타입
│   │   └── test/       # 테스트 설정
│   └── ...
├── server/         # Express 백엔드
│   ├── src/
│   │   ├── controllers/ # 라우트 핸들러
│   │   ├── models/      # Mongoose 모델
│   │   ├── routes/      # Express 라우터
│   │   └── types/       # TypeScript 타입
│   └── scripts/
│       └── seed.ts     # 더미 데이터 생성
└── README.md
```

## 설치 및 실행

### 사전 요구사항
- Node.js 18+
- MongoDB (로컬 또는 원격)

### 1. 서버 설정

```bash
cd server
npm install

# 환경변수 설정 (.env 파일)
# PORT=3001
# MONGODB_URI=mongodb+srv://...

# 개발 서버 실행
npm run dev

# 더미 데이터 생성 (30개)
npm run seed

# 테스트 실행
npm test
```

### 2. 클라이언트 설정

```bash
cd client
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 테스트 실행
npm test

# 빌드
npm run build
```

## API 명세

### 분실물 목록 조회
```
GET /api/items?status=OPEN&place=도서관&q=지갑
```

### 분실물 상세 조회
```
GET /api/items/:id
```

### 분실물 등록
```
POST /api/items
Content-Type: application/json

{
  "title": "검정 지갑 찾습니다",
  "description": "도서관에서 잃어버린 검정 가죽 지갑입니다",
  "place": "도서관",
  "lostAt": "2024-01-15T00:00:00.000Z",
  "status": "OPEN",
  "contact": "010-1234-5678"
}
```

### 분실물 수정
```
PUT /api/items/:id
```

### 분실물 삭제
```
DELETE /api/items/:id
```

### 응답 형식
```json
{
  "ok": true,
  "data": { ... }
}

{
  "ok": false,
  "message": "에러 메시지"
}
```

## DB 스키마

### LostItem
| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| title | String | O | 제목 (2~60자) |
| description | String | O | 설명 (5~500자) |
| place | String | O | 분실 장소 |
| lostAt | Date | O | 분실일 |
| status | String | O | OPEN / RESOLVED |
| contact | String | X | 연락처 |
| createdAt | Date | 자동 | 생성일 |
| updatedAt | Date | 자동 | 수정일 |

## 화면

- `/` - 분실물 목록 (필터/검색/등록 버튼)
- `/new` - 분실물 등록
- `/items/:id` - 분실물 상세 (수정/삭제/상태변경)
- `/items/:id/edit` - 분실물 수정
