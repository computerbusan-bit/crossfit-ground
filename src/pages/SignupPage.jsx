import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Paper, Typography, TextField, Button, Divider, Alert,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', confirm: '', name: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSignup = () => {
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (form.password.length < 4) {
      setError('비밀번호는 4자 이상이어야 합니다.');
      return;
    }
    setSuccess(true);
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'background.default',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Paper elevation={0} sx={{
        width: 400,
        p: 5,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}>
        {/* 로고 */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <FitnessCenterIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h5" fontWeight={700} color="text.primary">
            크로스핏 그라운드
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            회원가입
          </Typography>
        </Box>

        {success ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            회원가입이 완료됐습니다! 로그인 페이지로 이동합니다.
          </Alert>
        ) : (
          <>
            <TextField
              fullWidth name="name" label="이름"
              value={form.name} onChange={handleChange}
              sx={{ mb: 2 }} size="small"
            />
            <TextField
              fullWidth name="email" label="이메일" type="email"
              value={form.email} onChange={handleChange}
              sx={{ mb: 2 }} size="small"
            />
            <TextField
              fullWidth name="password" label="비밀번호" type="password"
              value={form.password} onChange={handleChange}
              sx={{ mb: 2 }} size="small"
            />
            <TextField
              fullWidth name="confirm" label="비밀번호 확인" type="password"
              value={form.confirm} onChange={handleChange}
              onKeyDown={e => e.key === 'Enter' && handleSignup()}
              sx={{ mb: 1 }} size="small"
            />
            {error && (
              <Typography variant="body2" color="error" sx={{ mb: 2, mt: 0.5 }}>
                {error}
              </Typography>
            )}
            <Button
              fullWidth variant="contained" color="primary"
              onClick={handleSignup}
              sx={{ mt: 2, py: 1.2, fontSize: '1rem' }}
            >
              가입하기
            </Button>
          </>
        )}

        <Divider sx={{ my: 3 }} />

        <Button
          fullWidth variant="outlined" color="primary"
          onClick={() => navigate('/login')}
          sx={{ py: 1.2, fontSize: '1rem' }}
        >
          로그인으로 돌아가기
        </Button>
      </Paper>
    </Box>
  );
};

export default SignupPage;
