import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const Nav = () => {
  const [markLocation, setMarkLocation] = useState('');
  // 마커로 나타내는 위치의 값을 state로 저장

  return (
    <Container>
      <Title>
        <TitleText>OnDemand 충전서비스</TitleText>
      </Title>
      <Location>
        <LocationIconContainer>
          <LocationIcon />
        </LocationIconContainer>
        <LocationText>
          {/* state.findOf('제주특별자치도') ? {markLocation} : '주소를 찾고있습니다 ...' */}
          주소를 찾고있습니다.
        </LocationText>
      </Location>
    </Container>
  );
};

export default Nav;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 52px;
  background-color: #5277ff;
`;

const TitleText = styled.span`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
`;

const Location = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

const LocationIconContainer = styled.div`
  width: 15px;
  height: 15px;
`;

const LocationIcon = styled.div`
  background: url('./marker.png');
`;

const LocationText = styled.span`
  font-size: 14px;
`;
