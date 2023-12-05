import React from 'react';
import Button from '@mui/material/Button';
import sadRobot from '../../../src/assets/images/sad-robot.png';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    background-color: #0C0C0C;
    color: white;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 72px;
    font-weight: bold;
    text-align: center;
    text-shadow: 3px 3px 0 #b46a09, -1px -1px 0 #f5be0c, 1px -1px 0 #f5be0c, -1px 1px 0 #f5be0c, 1px 1px 0 #f5be0c;
    margin: 0;
`;

const Message = styled.p`
    font-size: 24px;
    text-align: center;
    margin: 40px 0;
`;

const RobotImage = styled.img`
    max-width: 100%;
    margin-top: 50px;
    filter: grayscale(100%) brightness(70%);
`;

const Error404Component = () => {
    const handleGoHome = () => {
        // Redirigir al usuario a la página principal
        window.location.href = '/';
    };
    
    return (
        <Container>
            <Wrapper>
                <Title>Oops!</Title>
                <Message>We couldn't find the page you're looking for.</Message>
                <Button variant="contained" className="btn-color" onClick={handleGoHome}>Go back to home</Button>
                <RobotImage src={sadRobot} alt="Sad robot illustration" />
            </Wrapper>
        </Container>
    );
};

export default Error404Component;
