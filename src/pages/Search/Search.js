/* global kakao */
import styled from 'styled-components';
import { useEffect, useState } from 'react';

// Fix me:
// 키워드 검색후 목록에서 키워드 클릭 시 전달 받는 좌표, 주소를 state를 통해 저장하여
// fetch함수 또는 통신 API 를 이용하여 상태값 post, 이후 status code 200 또는 201 전달 시 navigate

// 또는 state 값을 전역으로 관리하여 setState 함수를 통해
// 값이 들어와 변경되면 useNavigate Hook을 이용해 main 페이지로 가고

// 메인 페이지에서 useEffect Hook 내부에서 분기처리를 통해 search 페이지의 state 값이
// 있다면 초기 값을 state에 저장된 값으로 변경하여 마운트 처리 한다.

const Search = () => {
  const [map, setMap] = useState({});

  // useEffect(() => {
  //   var markers = [];

  //   var mapContainer = document.getElementById('searchMap'),
  //     mapOption = {
  //       center: new kakao.maps.LatLng(37.566826, 126.9786567),
  //       level: 3,
  //     };

  //   var map = new kakao.maps.Map(mapContainer, mapOption);

  //   var ps = new kakao.maps.services.Places();

  //   var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  //   searchPlaces();

  //   function searchPlaces() {
  //     var keyword = document.getElementById('keyword').value;

  //     if (!keyword.replace(/^\s+|\s+$/g, '')) {
  //       alert('키워드를 입력해주세요!');
  //       return false;
  //     }

  //     ps.keywordSearch(keyword, placesSearchCB);
  //   }

  //   function placesSearchCB(data, status, pagination) {
  //     if (status === kakao.maps.services.Status.OK) {
  //       // 정상적으로 검색이 완료됐으면
  //       // 검색 목록과 마커를 표출합니다
  //       displayPlaces(data);

  //       displayPagination(pagination);
  //     } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
  //       alert('검색 결과가 존재하지 않습니다.');
  //       return;
  //     } else if (status === kakao.maps.services.Status.ERROR) {
  //       alert('검색 결과 중 오류가 발생했습니다.');
  //       return;
  //     }
  //   }

  //   function displayPlaces(places) {
  //     var listEl = document.getElementById('placesList'),
  //       menuEl = document.getElementById('menu_wrap'),
  //       fragment = document.createDocumentFragment(),
  //       bounds = new kakao.maps.LatLngBounds(),
  //       listStr = '';

  //     removeAllChildNods(listEl);

  //     removeMarker();

  //     for (var i = 0; i < places.length; i++) {
  //       // 마커를 생성하고 지도에 표시합니다
  //       var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
  //         marker = addMarker(placePosition, i),
  //         itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

  //       // LatLngBounds 객체에 좌표를 추가합니다
  //       bounds.extend(placePosition);

  //       // (function (marker, title) {
  //       //   kakao.maps.event.addListener(marker, 'mouseover', function () {
  //       //     displayInfowindow(marker, title);
  //       //   });

  //       //   kakao.maps.event.addListener(marker, 'mouseout', function () {
  //       //     infowindow.close();
  //       //   });

  //       //   itemEl.onmouseover = function () {
  //       //     displayInfowindow(marker, title);
  //       //   };

  //       //   itemEl.onmouseout = function () {
  //       //     infowindow.close();
  //       //   };
  //       // })(marker, places[i].place_name);

  //       fragment.appendChild(itemEl);
  //     }

  //     listEl.appendChild(fragment);
  //     menuEl.scrollTop = 0;

  //     map.setBounds(bounds);
  //   }

  //   function getListItem(index, places) {
  //     var el = document.createElement('li'),
  //       itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' + '<div class="info">' + '   <h5>' + places.place_name + '</h5>';

  //     if (places.road_address_name) {
  //       itemStr += '    <span>' + places.road_address_name + '</span>' + '   <span class="jibun gray">' + places.address_name + '</span>';
  //     } else {
  //       itemStr += '    <span>' + places.address_name + '</span>';
  //     }

  //     itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>';

  //     el.innerHTML = itemStr;
  //     el.className = 'item';

  //     return el;
  //   }

  //   function addMarker(position, idx, title) {
  //     var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
  //       imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
  //       imgOptions = {
  //         spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
  //         spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
  //         offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
  //       },
  //       markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
  //       marker = new kakao.maps.Marker({
  //         position: position, // 마커의 위치
  //         image: markerImage,
  //       });

  //     marker.setMap(map);
  //     markers.push(marker);

  //     return marker;
  //   }

  //   function removeMarker() {
  //     for (var i = 0; i < markers.length; i++) {
  //       markers[i].setMap(null);
  //     }
  //     markers = [];
  //   }

  //   function displayPagination(pagination) {
  //     var paginationEl = document.getElementById('pagination'),
  //       fragment = document.createDocumentFragment(),
  //       i;

  //     while (paginationEl.hasChildNodes()) {
  //       paginationEl.removeChild(paginationEl.lastChild);
  //     }

  //     for (i = 1; i <= pagination.last; i++) {
  //       var el = document.createElement('a');
  //       el.href = '#';
  //       el.innerHTML = i;

  //       if (i === pagination.current) {
  //         el.className = 'on';
  //       } else {
  //         el.onclick = (function (i) {
  //           return function () {
  //             pagination.gotoPage(i);
  //           };
  //         })(i);
  //       }

  //       fragment.appendChild(el);
  //     }
  //     paginationEl.appendChild(fragment);
  //   }

  //   function displayInfowindow(marker, title) {
  //     var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

  //     infowindow.setContent(content);
  //     infowindow.open(map, marker);
  //   }

  //   function removeAllChildNods(el) {
  //     while (el.hasChildNodes()) {
  //       el.removeChild(el.lastChild);
  //     }
  //   }
  // }, []);

  return <Container id="searchMap"></Container>;
};

export default Search;

const Container = styled.div`
  width: 1000px;
  height: 1000px;
`;
