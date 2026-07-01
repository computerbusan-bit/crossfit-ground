import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Pagination,
  Button,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

// 임시 데이터
const MOCK_POSTS = Array.from({ length: 23 }, (_, i) => ({
  id: 23 - i,
  title: ['오늘 WOD 후기 공유합니다', '박스 추천 부탁드려요!', 'Fran 기록 갱신했어요', '입문자 질문입니다', '크로스핏 식단 공유'][i % 5],
  author: ['김철수', '이영희', '박민준', '최수아', '정도윤'][i % 5],
  createdAt: `2026-06-${String(24 - (i % 20)).padStart(2, '0')}`,
  views: Math.floor(Math.random() * 300) + 10,
}));

const POSTS_PER_PAGE = 10;

const PostListPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(MOCK_POSTS.length / POSTS_PER_PAGE);
  const currentPosts = MOCK_POSTS.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* 상단 네비게이션 */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <FitnessCenterIcon sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
            크로스핏 그라운드
          </Typography>
          <Button color="inherit" onClick={() => navigate('/login')} size="small">
            로그아웃
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* 페이지 헤더 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            커뮤니티
          </Typography>
          <Button variant="contained" color="primary" size="small">
            글쓰기
          </Button>
        </Box>

        {/* 게시물 테이블 */}
        <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#111' }}>
                <TableCell align="center" sx={{ width: 60, color: 'text.secondary', fontWeight: 600 }}>번호</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>제목</TableCell>
                <TableCell align="center" sx={{ width: 100, color: 'text.secondary', fontWeight: 600 }}>작성자</TableCell>
                <TableCell align="center" sx={{ width: 110, color: 'text.secondary', fontWeight: 600 }}>작성일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPosts.map((post) => (
                <TableRow
                  key={post.id}
                  hover
                  onClick={() => navigate(`/posts/${post.id}`)}
                  sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#1f1f1f' } }}
                >
                  <TableCell align="center" sx={{ color: 'text.secondary' }}>{post.id}</TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.primary">
                      {post.title}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color="text.secondary">{post.author}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color="text.secondary">{post.createdAt}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 페이지네이션 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, v) => setPage(v)}
            color="primary"
            shape="rounded"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default PostListPage;
