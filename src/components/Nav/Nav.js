import styled from 'styled-components';
import { flex } from '../../styles/Mixin';

const Nav = () => {
  return (
    <Container>
      <Title>
        <TitleText>OnDemand 충전서비스</TitleText>
      </Title>
      <Location>
        <LocationIconContainer>
          <LocationIcon />
        </LocationIconContainer>
        <LocationText id="centerAddr" />
        {/* Fix me: 지도 이동 감지 시 분기 처리를 통해'주소를 찾고 있습니다 ..' 문자 나타내기 */}
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
  ${flex('center', 'center')};
  height: 52px;
  background-color: #5277ff;
`;

const TitleText = styled.span`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
`;

const Location = styled.div`
  ${flex('center', 'center')};
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
