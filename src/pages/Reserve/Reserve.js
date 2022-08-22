/* global kakao */

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { flex } from '../../styles/Mixin';

const Reserve = () => {
  const [map, setMap] = useState({});

  useEffect(() => {
    selectLocation();
  }, []);

  const selectLocation = () => {
    var mapContainer = document.getElementById('selectMap'),
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        // Fix me: POST 메서드를 이용해 서버로 전달된 좌표 값을 위의 좌표 값에 기입
        level: 2,
      };
    var map = new kakao.maps.Map(mapContainer, mapOption);
    var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    // Fix me: POST 메서드를 이용해 서버로 전달된 좌표 값을 위의 좌표 값에 기입

    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  };

  return (
    <>
      <Container>
        <Header>
          <HeaderTitle>충전 예약신청</HeaderTitle>
        </Header>
        <Contents>
          <ReserveLocation>
            <ReserveLocationText id="selectAddr">
              제주시 한림읍 귀덕리 745
              {/* Fix me: 통신하여 메인 화면에서 선택 된 주소 state에 저장하여 값 기입 */}
            </ReserveLocationText>
            <ReserveLocationMap id="selectMap"></ReserveLocationMap>
          </ReserveLocation>
          <PhoneAuth>
            <PhoneAuthText>휴대폰번호 인증</PhoneAuthText>
            <PhoneAuthBox>
              <PhoneAuthInput type="number" placeholder='"-"없이 숫자만 입력해주세요.'></PhoneAuthInput>
              {/* Fix me: 정규식을 통해 콤마 및 번호 조건 걸어주기 */}
              <PhoneAuthButton disabled="disabled">인증번호 발송</PhoneAuthButton>
              {/* Fix me: 위의 input 값이 정규식에 맞게 작성되었다면, button on 후 클릭 시 하위 조건 즉, 인증번호 란 오픈 */}
            </PhoneAuthBox>
          </PhoneAuth>
        </Contents>
      </Container>
    </>
  );
};

export default Reserve;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f9f9f8;
`;

const Header = styled.div`
  ${flex('flex-start', 'center')};
  width: 100vw;
  height: 56px;
  background-color: #ffffff;
  border-bottom: 1px lightgray solid;
`;

const HeaderTitle = styled.span`
  padding-left: 45px;
  font-size: 18px;
  line-height: 18px;
`;

const Contents = styled.ul`
  ${flex('flex-start', 'center')};
  flex-direction: column;
  height: 100vh;
  padding: 30px;
  overflow: scroll;
`;

const ReserveLocation = styled.li`
  ${flex('center', 'flex-start')};
  flex-direction: column;
  width: calc(100vw - 100px);
  min-height: 150px;
  margin-bottom: 30px;
  padding: 30px;
  overflow: hidden;
  background-color: #ffffff;
`;

const ReserveLocationText = styled.span`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 30px;
`;

const ReserveLocationMap = styled.div`
  width: calc(100vw - 160px);
  height: 250px;
`;

const PhoneAuth = styled(ReserveLocation)``;

const PhoneAuthText = styled(ReserveLocationText)``;

const PhoneAuthBox = styled.div`
  ${flex('space-between', 'center')};
`;

const PhoneAuthInput = styled.input`
  width: calc(100vw - 160px - 100px);
  height: 34px;
  margin-right: 10px;
  border: none;
  border-bottom: 1px black solid;
  outline: none;
`;

const PhoneAuthButton = styled.button`
  width: 100px;
  height: 34px;
  /* :disabled { 
    border: none;
  } */
  background-color: #5277ff;
  color: #ffffff;
`;
