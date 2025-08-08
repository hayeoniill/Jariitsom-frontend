import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom'; // 꼭 필요

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  background: #f0f0f0;
  position: relative;
`;

const Box = styled.div`
  position: relative;
  margin: 0 auto;
  width: 390px;
  height: 844px;
  background: #fff;
  display: flex;
  flex-direction: column;
  cursor: default;
`;

const Layout = () => {
    return (
        <Container>
            <Box>
                <Outlet />
            </Box>
        </Container>
    );
};

export default Layout;
