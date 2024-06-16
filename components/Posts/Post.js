import React, { useRef, useCallback, useEffect, memo, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import axios from 'axios';
import { WindowWidthContext } from '../hooks/WindowWidthContext'; 

const PostContainer = styled.div`
  width: 300px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(120, 120, 120);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 10px;
`;

const CarouselContainer = styled.div`
  position: relative;
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  position: relative;
`;

const CarouselItem = styled.div`
  flex: 0 0 auto;
  scroll-snap-align: start;
`;

const Image = styled.img`
  width: 280px;
  height: auto;
  max-height: 300px;
  padding: 10px;
`;

const Content = styled.div`
  padding: 10px;
  & > h2 {
    margin-bottom: 16px;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  color: #000;
  font-size: 20px;
  cursor: pointer;
  height: 50px;
`;

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`; 

const Post = memo(({ post }) => {
  const carouselRef = useRef(null);
  const [images, setImages] = React.useState([]); 
  const { isSmallerDevice } = useContext(WindowWidthContext);

  // fetching dummy images from the API Url
  const fetchImages = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/albums/1/photos',
      );
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // updated next click button
  const handleNextClick = useCallback(() => {
    if (carouselRef.current) {
      const width = carouselRef.current.firstChild?.clientWidth || 0;
      carouselRef.current.scrollBy({ left: width, behavior: 'smooth' });
    }
  }, []);

// updated previous click button
  const handlePrevClick = useCallback(() => {
    if (carouselRef.current) {
      const width = carouselRef.current.firstChild?.clientWidth || 0;
      carouselRef.current.scrollBy({ left: -width, behavior: 'smooth' });
    }
  }, []);


  const userName = 'Leanne Graham';
  const userEmail = 'sincere@april.biz';
  const initials = userName
    .split(' ')
    .map(name => name[0])
    .join('');

  return (
    <PostContainer>
      <UserContainer>
        <Logo>{initials}</Logo>
        <div>
          <div style={{ fontWeight: 'bold' }}>{userName}</div>
          <div>{userEmail}</div>
        </div>
      </UserContainer>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={image.title} loading="lazy" />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
      {isSmallerDevice && <div>Viewing on a smaller device</div>}
    </PostContainer>
  );
});

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;