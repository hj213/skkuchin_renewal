import React from 'react';
import { useRouter } from 'next/router';
import PostDetail from '../../components/SkkuChat/PostDetail';

const PostDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  return <PostDetail postId={id} />
};

export default PostDetailPage;
