/* global kakao */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { flex } from '../../styles/Mixin';
import Nav from '../../components/Nav/Nav';

const Main = () => {
  const [map, setMap] = useState({});
  const [currentLocation, setCurrentLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    serviceMap();
  }, []);

  const serviceMap = () => {
    var mapContainer = document.getElementById('map'),
      // 지도 초기 값 설정
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 2,
      };

    // 지도를 생성
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성
    var geocoder = new kakao.maps.services.Geocoder();

    // 중심 좌표나 확대 수준이 변경 이벤트 발생 시 주소 제공
    kakao.maps.event.addListener(map, 'idle', function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    // 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');
        setCurrentLocation(infoDiv.innerHTML);

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로 기입
          if (result[i].region_type === 'H') {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    }
  };

  const locationLoadSuccess = (pos) => {
    // 현재 위치 받아오기
    var currentPos = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    map.panTo(currentPos);
  };

  const goToReserve = () => {
    currentLocation.includes('제주특별자치도') && navigate('/reserve');

    // Fix me: 조건 부합 시 fetch함수를 이용하여 서버로 좌표, 주소 전달 후
    // status code 200, 201 라면 예약신청 페이지로 이동

    // currentLocation.includes('제주특별자치도') &&
    //   fetch('서버 URL', {
    //     method: 'post',
    //     headers: {},
    //     body: formData,
    //   }).then((res) => {
    //     if (res.status === 201 || res.status === 200) {
    //       navigate('/reserve');
    //     }
    //   });

    // const formData = new FormData();
    // formData.append('LatLng', (x, y));
    // formData.append('Address', address);
  };

  return (
    <>
      <Container>
        <Nav />
        <Contents>
          <MapApi id="map" />
          <Alert alert={currentLocation.includes('제주특별자치도')}>
            <AlertText>
              {/* Fix me: 지도 level 을 조건으로 잡고 10 이상으면 충전 서비스 이용불가 문자열 10 이하라면 위치정보 조회 실패 문자열  */}
              다시 시도해주세요. 충전 서비스 이용불가!
              <br /> 제주도 본섬만 이용 가능합니다.
            </AlertText>
          </Alert>
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
            {/* Fix me:아이콘을 대체하여 임시 문자 */}
          </Current>
          <StyledLink to="/search">
            <SearchLocation>
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
  background-color: #ff5d5d;
  color: #ffffff;
  border-radius: 10px;
  z-index: 100;
  cursor: pointer;
`;

const AlertText = styled.span`
  padding: 0 20px;
  font-size: 12px;
  line-height: 18px;
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
  ${flex('center', 'center')};
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
  ${flex('center', 'center')};
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
  ${flex('center', 'center')};
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
