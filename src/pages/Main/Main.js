/* global kakao */
import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';

const Main = () => {
  const [map, setMap] = useState({});
  const [centerLocation, setCenterLocation] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    kakaomap();
    // changedCenter();
  }, []);

  function kakaomap() {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    function locationLoadSuccess(pos) {
      // 현재 위치 받아오기
      var currentPos = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      map.panTo(currentPos);
    }

    function locationLoadError(pos) {
      alert('위치 정보를 가져오는데 실패했습니다.');
    }

    function getCurrentPosBtn() {
      navigator.geolocation.getCurrentPosition(locationLoadSuccess, locationLoadError);
    }
    // 지도 위에서 마커를 사용하는것이 아닌 그냥 앱솔로 마커 가운데 박아두고
    // 지도를 통해서 전달되는 데이터가 제주도라면 마커를 파란색에 이벤트가 가능하도록 적용
    // 그것이 아니라면 그냥 빨간색으로 적용

    setMap(new kakao.maps.Map(container, options));
  }

  function changedCenter() {
    kakao.maps.event.addListener(map, 'center_changed', function () {
      // 지도의  레벨을 얻어옵니다
      var level = map.getLevel();

      // 지도의 중심좌표를 얻어옵니다
      var latlng = map.getCenter();

      var message = '<p>지도 레벨은 ' + level + ' 이고</p>';
      message += '<p>중심 좌표는 위도 ' + latlng.getLat() + ', 경도 ' + latlng.getLng() + '입니다</p>';

      var resultDiv = document.getElementById('result');
      resultDiv.innerHTML = message;
    });
  }

  const goToSearch = () => {
    navigate('/search');
  };

  return (
    <>
      <Nav />
      <Container>
        <MapContainer>
          <MapApi id="map"></MapApi>
        </MapContainer>
        {/* state.findOf !== '제주특별자치도' ? <Alert>위치정보 조회에 실패했습니다 다시 시도해주세요</Alert> : none */}
        <Alert>
          위치정보 조회에 실패했습니다.
          <br /> 다시 시도해주세요.
        </Alert>
        <Mark />
        {/* <CurrentLocation onClick={currentLocation}>현위치</CurrentLocation> */}
        <SearchLocation>
          <SearchLocationIcon>아이콘</SearchLocationIcon>
          <SearchLocationInput value="위치를 검색해주세요 :)" onClick={goToSearch}></SearchLocationInput>
        </SearchLocation>
      </Container>
    </>
  );
};

export default Main;

const Container = styled.div`
  width: 100vw;
`;

const MapContainer = styled.div`
  position: relative;
  width: 1450px;
  height: 725px;
  overflow: hidden;
  z-index: 1;
`;

const MapApi = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Alert = styled.div`
  position: absolute;
  top: 13%;
  display: flex;
  align-items: center;
  width: 1400px;
  height: 50px;
  margin: 10px;
  background-color: #ff5d5d;
  border-radius: 10px;
  z-index: 999;
  color: #ffffff;
  font-size: 12px;
  padding-left: 10px;
`;

const Mark = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: red;
  top: 50%;
  left: 50%;
  z-index: 999;
`;

const CurrentLocation = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  bottom: 20%;
  right: 5%;
  z-index: 999;
`;

const SearchLocation = styled.div`
  position: absolute;
  bottom: 1%;
  display: flex;
  align-items: center;
  width: 1400px;
  height: 60px;
  margin: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  z-index: 999;
`;

const SearchLocationIcon = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 10px;
`;

const SearchLocationInput = styled.input`
  height: 45px;
  border: none;
  outline: none;
  font-size: 15px;
`;
