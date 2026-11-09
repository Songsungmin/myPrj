const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS 설정: 모든 도메인(또는 Next.js 개발 서버 3000 포트)에서의 요청 허용
app.use(cors());
app.use(express.json());

// 헬스 체크 엔드포인트
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 핵심 요구 기능: 버튼 클릭 시 환영 문구 반환 엔드포인트
app.get('/api/welcome', (req, res) => {
  res.json({ message: 'Welcome to the My Project' });
});

// POST 요청 호환
app.post('/api/welcome', (req, res) => {
  res.json({ message: 'Welcome to the My Project' });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
