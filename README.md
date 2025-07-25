# 📍 Mapbox 기반 스쿠터 공유 서비스

## 2025.07.23 ~

- Mapbox 기반 실시간 위치 추적 및 지도 렌더링
- 라이딩 경로 실시간 추적 및 경로 보정 (Mapbox Matching API 활용)
- 주변 스쿠터 탐색 및 거리 계산 (Supabase RPC + Turf.js 활용)
- 라이딩 시작 / 종료 및 상태 관리 (React Context API)

####

- React Native 0.79, Expo SDK 53, Expo Router
- Mapbox (@rnmapbox/maps)
- Supabase (인증, DB, RPC)
- Typescript, ESLint, Prettier
- Ky (API 호출), Turf.js (지리 계산)
- @gorhom/bottom-sheet (UI 모달)

---

### 🧑‍💻 구현 사항

- **RideProvider**: 라이딩 상태 관리 및 위치 추적 구현
  - 실시간 위치 업데이트 (30m 간격)
  - Mapbox Directions API 호출해 경로 최적화 및 DB 업데이트
  - 라이딩 시작 및 종료 로직 완성

- **ScooterProvider**: 주변 스쿠터 조회 및 선택된 스쿠터까지 경로 및 거리 계산
  - 위치 기반 1km 이내 스쿠터 목록 가져오기
  - 500m 근접 여부 실시간 판단 및 상태 업데이트

- **Map** 컴포넌트: 지도 렌더링 및 경로, 마커 표시
  - 사용자 위치 추적 및 카메라 따라가기
  - 라이딩 중 경로와 마커 표시 제어

- **LineRoutes** 컴포넌트: 경로 선(LineString) 그리기
- **ActiveRideSheet** 컴포넌트: 라이딩 진행 중 상태 하단 시트 UI

- Mapbox Matching API 호출
  - 경로 좌표 보정 및 거리/시간 정보 수집

## 📌 향후 추가할 것

- 로그인 UI 화면 구현
- 실시간 위치 동기화 최적화
- UI/UX 개선 및 애니메이션 적용
- 스쿠터가 아닌 OpenAPI로 레퍼런스 찾기
