/* global kakao */
import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';

const Main = () => {
  const [map, setMap] = useState({});
  const [currentLocation, setCurrentLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    serviceMap();
  }, [map]);

  const serviceMap = () => {
    var mapContainer = document.getElementById('map'),
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 2,
      };

    // 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');
        setCurrentLocation(infoDiv.innerHTML);

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === 'H') {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    }
  };

  // const handleCurrentLocation = () => {
  function locationLoadSuccess(pos) {
    // 현재 위치 받아오기
    var currentPos = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    map.panTo(currentPos);
  }
  // };

  // const locationLoadSuccess = (pos) => {
  //   // 현재 위치 받아오기
  //   var currentPos = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
  //   map.panTo(currentPos);
  // };

  const goToReserve = () => {
    currentLocation.includes('제주특별자치도') && navigate('/reserve');
  };

  return (
    <>
      <Container>
        <Nav />
        <Contents>
          <MapApi id="map" />

          {/* <Alert alert={centerLocation.indexOf('제주특별자치도') ? 'hi' : 'nohi'}> */}
          <Alert alert={currentLocation.includes('제주특별자치도')}>
            {/* {currentLocation.includes('제주특별자치도') === true ? 충전 서비스 이용불가!<br />제주도 본섬만 이용 가능합니다 : 위치정보 조회에 실패했습니다.<br />다시 시도해주세요.} */}
            위치정보 조회에 실패했습니다.
            <br /> 다시 시도해주세요.
          </Alert>
          {/* <Contents> */}
          {/* <Alert>{state.findOf !== '제주특별자치도' ? '위치정보 조회에 실패했습니다 다시 시도해주세요' : `${centerLocation}`}</Alert> */}
          {/* <Alert>
            위치정보 조회에 실패했습니다.
            <br /> 다시 시도해주세요.
          </Alert> */}
          {/* 주소가 입력 된 마커의 경우에만 navigate 되도록 조건문 걸어주기  */}
          {/* <Mark onClick={goToSuccess} /> */}
          {/* <Mark markStyle={currentLocation.includes('제주특별자치도')} onClick={goToReserve} /> */}
          {currentLocation.includes('제주특별자치도') ? (
            <ReserveMark onClick={goToReserve}>
              <ReserveMarkTitle>충전장소로 지정</ReserveMarkTitle>
            </ReserveMark>
          ) : (
            <UnreservedMark />
          )}

          <StyledLink to="/support">
            <Support>Sup</Support>
          </StyledLink>
          <Current
            onClick={() => {
              locationLoadSuccess();
            }}
          >
            Cur
          </Current>
          <StyledLink to="/search">
            <SearchLocation>
              {/* <SearchLocationIcon>O</SearchLocationIcon> */}
              {/* <SearchLocationInput value="위치를 검색해주세요 :)" onClick={goToSearch}></SearchLocationInput> */}
              <SearchLocationInput value="위치를 검색해주세요 :)" />
            </SearchLocation>
          </StyledLink>
        </Contents>
      </Container>
    </>
  );
};

export default Main;

const StyledLink = styled(Link)``;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Contents = styled.div`
  position: relative;
  height: calc(100vh - 90px);
`;

const MapApi = styled.div`
  /* position: relative; */
  position: absolute;
  width: 100vw;
  height: calc(100vh - 90px);
`;

const Alert = styled.div`
  position: absolute;
  top: 1%;
  display: ${(props) => (props.alert === true ? 'none' : 'flex')};
  align-items: center;
  width: calc(100vw - 30px);
  height: 55px;
  margin: 0 15px;
  padding: 0 20px;
  background-color: #ff5d5d;
  color: #ffffff;
  border-radius: 10px;
  font-size: 12px;
  line-height: 18px;
  z-index: 100;
  cursor: pointer;
`;

const UnreservedMark = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  width: 30px;
  height: 30px;
  background-color: red;
  border-radius: 50%;
  z-index: 100;
  cursor: pointer;
`;

const ReserveMark = styled.div`
  position: absolute;
  top: 45%;
  left: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  background-color: #5277ff;
  border-radius: 10px;
  z-index: 100;
  cursor: pointer;
`;

const ReserveMarkTitle = styled.span`
  color: #ffffff;
`;

const Support = styled.div`
  position: absolute;
  right: 2%;
  bottom: 22%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  z-index: 100;
  padding: 5px;
`;

const Current = styled.div`
  position: absolute;
  right: 2%;
  bottom: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  padding: 5px;
  border-radius: 50%;
  background: #fff;
  z-index: 100;
  cursor: pointer;
`;

const SearchLocation = styled.div`
  position: absolute;
  bottom: 4%;
  display: flex;
  align-items: center;
  width: calc(100vw - 20px);
  height: 60px;
  margin: 0 10px;
  padding: 0 20px;
  background-color: #ffffff;
  border-radius: 5px;
  z-index: 100;
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
  cursor: pointer;
`;
