import React, { useState, useEffect, memo } from 'react';
import styled from '@emotion/styled';

// updated styles for sticky bar
const Navbar = styled.nav`
  background-color: #333;
  color: #fff;
  width: 100%;
  position: ${({ isSticky }) => (isSticky ? 'fixed' : 'absolute')};
  top: 0;
  left: 0;
  z-index: 1000;
`;

const ListItem = styled.li`
  display: inline-block;
  margin-right: 20px;
  font-size: 18px;
  cursor: pointer;
`;

const Link = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const TopNavbar = memo(() => {
  const [isSticky, setIsSticky] = useState(false);
  // handling scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.pageYOffset > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar isSticky={isSticky}>
      <ul>
        <ListItem>
          <Link href="/">Home</Link>
        </ListItem>
        <ListItem>
          <Link href="/users">Users</Link>
        </ListItem>
      </ul>
    </Navbar>
  );
});

export default TopNavbar;
