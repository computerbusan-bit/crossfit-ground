import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    // 임시 로그인 처리 (나중에 Supabase 연동 예정)
    if (email === 'test@test.com' && password === '1234') {
      setError('');
      navigate('/posts');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 400,
          p: 5,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        {/* 로고 영역 */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <FitnessCenterIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h5" fontWeight={700} color="text.primary">
            크로스핏 그라운드
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            CROSSFIT GROUND
          </Typography>
        </Box>

        {/* 이메일 입력 */}
        <TextField
          fullWidth
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{ mb: 2 }}
          size="small"
        />

        {/* 비밀번호 입력 */}
        <TextField
          fullWidth
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{ mb: 1 }}
          size="small"
        />

        {/* 오류 메시지 */}
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2, mt: 0.5 }}>
            {error}
          </Typography>
        )}

        {/* 로그인 버튼 */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mt: 2, py: 1.2, fontSize: '1rem' }}
        >
          로그인
        </Button>

        <Divider sx={{ my: 3 }} />

        {/* 회원가입 버튼 */}
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          sx={{ py: 1.2, fontSize: '1rem' }}
        >
          회원가입
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
