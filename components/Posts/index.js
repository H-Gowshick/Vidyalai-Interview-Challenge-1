import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { WindowWidthContext } from '../hooks/WindowWidthContext'; // Importing context

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  // custom hook
  const { isSmallerDevice } = useContext(WindowWidthContext);

  const [limit, setLimit] = useState(isSmallerDevice ? 5 : 10);

  // Update limit when isSmallerDevice changes
  useEffect(() => {
    setLimit(isSmallerDevice ? 5 : 10);
  }, [isSmallerDevice]);

  useEffect(() => {
    fetchPost();
  }, [startIndex, limit]);

  // Function to fetch posts from the API
  const fetchPost = async () => {
    const { data: posts } = await axios.get('/api/v1/posts', {
      params: { start: startIndex, limit },
    });
    setPosts(prevPosts => [...prevPosts, ...posts]);
  };

  // Handler for the "Load More" button click
  const handleClick = () => {
    setIsLoading(true);
    setStartIndex(prevStartIndex => prevStartIndex + limit);
    fetchPost().finally(() => setIsLoading(false));
  };

  const hasMorePosts = posts.length % limit === 0;

  return (
    <Container>
      <PostListContainer>
        {/* Render each post using the Post component */}
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </PostListContainer>
      {hasMorePosts && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* Load More button */}
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}
