import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Divider,
  Button,
  TextField,
  IconButton,
  Stack,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// 임시 게시물 데이터
const MOCK_POST = {
  id: 1,
  title: '오늘 WOD 후기 공유합니다',
  author: '김철수',
  createdAt: '2026-06-24',
  content: `안녕하세요! 오늘 박스에서 WOD를 마치고 후기 공유하러 왔습니다.

오늘의 WOD는 Fran이었는데요,
21-15-9 Thrusters (43kg) + Pull-ups 조합이었습니다.

개인 기록: 4분 32초 (PR 갱신!)

처음 크로스핏 시작했을 때는 10분도 넘게 걸렸는데,
꾸준히 하다 보니 이렇게 줄었네요 :)

여러분들의 기록도 공유해주세요!`,
  views: 128,
  likes: 24,
};

const MOCK_COMMENTS = [
  { id: 1, author: '이영희', content: '축하드려요! 저도 Fran PR 목표로 달리고 있어요 💪', createdAt: '2026-06-24' },
  { id: 2, author: '박민준', content: '4분대면 정말 대단하시네요. 저는 아직 7분대인데...', createdAt: '2026-06-24' },
];

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(MOCK_POST.likes);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(MOCK_COMMENTS);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: comments.length + 1,
      author: '나',
      content: commentText,
      createdAt: '2026-06-24',
    };
    setComments([...comments, newComment]);
    setCommentText('');
  };

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
        {/* 뒤로가기 */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/posts')}
          sx={{ mb: 2, color: 'text.secondary' }}
          size="small"
        >
          목록으로
        </Button>

        {/* 게시물 본문 */}
        <Paper sx={{ p: 4, border: '1px solid', borderColor: 'divider' }} elevation={0}>
          <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
            {MOCK_POST.title}
          </Typography>

          {/* 메타 정보 */}
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {MOCK_POST.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {MOCK_POST.createdAt}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <VisibilityIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">{MOCK_POST.views}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <ChatBubbleOutlineIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">{comments.length}</Typography>
            </Stack>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          {/* 본문 내용 */}
          <Typography variant="body1" color="text.primary" sx={{ whiteSpace: 'pre-line', lineHeight: 2 }}>
            {MOCK_POST.content}
          </Typography>

          <Divider sx={{ mt: 4, mb: 2 }} />

          {/* 좋아요 버튼 */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <IconButton onClick={handleLike} sx={{ color: liked ? 'error.main' : 'text.secondary' }}>
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body1" color={liked ? 'error.main' : 'text.secondary'} fontWeight={600}>
              {likeCount}
            </Typography>
          </Box>
        </Paper>

        {/* 댓글 영역 */}
        <Paper sx={{ p: 3, mt: 2, border: '1px solid', borderColor: 'divider' }} elevation={0}>
          <Typography variant="subtitle1" fontWeight={600} color="text.primary" sx={{ mb: 2 }}>
            댓글 {comments.length}개
          </Typography>

          {/* 댓글 목록 */}
          {comments.map((comment, idx) => (
            <Box key={comment.id}>
              <Box sx={{ py: 2 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 0.5 }}>
                  <Typography variant="body2" fontWeight={600} color="primary.main">
                    {comment.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {comment.createdAt}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.primary">
                  {comment.content}
                </Typography>
              </Box>
              {idx < comments.length - 1 && <Divider />}
            </Box>
          ))}

          {/* 댓글 작성 */}
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              placeholder="댓글을 입력하세요"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleCommentSubmit()}
              size="small"
              multiline
              maxRows={3}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCommentSubmit}
              sx={{ minWidth: 72, alignSelf: 'flex-start' }}
            >
              등록
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default PostDetailPage;
