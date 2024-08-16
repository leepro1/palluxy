# 공통 프로젝트 Pet:Luxy

## 프로젝트 개요

팰럭시는 소중한 반려동물을 떠나보낼 때 겪는 슬픈 감정, 즉 펫로스 증후군을 개선하는 데 도움이 될 수 있는 서비스들을 제공하는 웹 페이지입니다. 저희 팀은 다양한 기사와 논문을 조사하여, 반려동물을 기르는 가구 수가 증가하고 있음에도 불구하고, 반려동물의 죽음으로 인한 비애가 사회적으로 충분히 인정받지 못하고 있는 실태를 파악했습니다. 이에, 반려인들의 상처를 치유하고 반려동물을 기르지 않는 사람들에게도 펫로스 증후군에 대한 관심을 불러일으킬 수 있는 서비스를 만들기 위해, '극복'과 '소통'이라는 키워드를 중심으로 프로젝트를 구상하였습니다.

사별을 경험한 사람은 누구나 정신적인 고통을 겪지만 이에 대한 대처에 따라 슬픔을 쉽게 극복할 수도 있고, 반대로 치유되지 못하여 오랜 기간동안 힘든 시간을 보낼 수도 있습니다. 팰럭시는 반려동물을 떠나보낸 슬픔을 겪고 있는 사람들이 자신의 감정을 표현하고, 비슷한 경험을 가진 이들과 소통하며 슬픔을 극복할 수 있도록 돕는 것을 목표로 합니다. 이러한 과정을 통해 펫로스 증후군이 더 이상 혼자서 감내해야 할 고통이 아니라, 사회적으로 이해되고 치유될 수 있는 문제로 인식되기를 바랍니다. 팰럭시는 반려동물을 잃은 사람들에게 위로와 희망을 제공하고, 그들의 소중한 추억을 영원히 간직할 수 있는 공간이 될 것입니다.

## 주요 기능

팰럭시의 주요 기능은 '추억공간'과 '치유모임'입니다.

**추억공간**에서는 사용자가 떠나보낸 반려동물의 사진을 입력하면 AI가 그 사진을 3D 모델로 변환해 줍니다. 이 3D 모델은 가상 공간에서 관리할 수 있으며, 추억공간에는 사진을 저장할 수 있는 액자 기능도 있습니다. 또한, 반려동물에게 편지를 쓰면 AI가 답장을 보내주는 편지 쓰기 기능도 제공됩니다. 추억공간은 반려동물과의 추억을 담은 공간을 만들어, 반려동물의 죽음을 마주하고 그것을 극복하는 데 도움을 줍니다.

**치유모임 기능**은 반려인들끼리 화상통화를 통해 서로의 감정을 나누고 위로할 수 있는 장을 마련합니다. 모임을 만드는 사용자가 모임 시간을 정해 공고를 올리고 관리자가 그것을 확인하고 승인하면, 다른 사용자들과 화상통화를 할 수 있습니다. 치유모임은 다른 반려인들과의 소통을 통해 슬픔을 공유하고 반려동물과의 추억을 나누어 펫로스 증후군을 치유하는데 도움을 줍니다.

## 개발 기간

- 2024-07-01 ~ 2024-08-14

## Team Info

- **[이보경](https://github.com/kyeong8139) (팀장 - BE)**

  > **BE**  
  > openvidu, claude api의 비동기 통신 구현  
  > 치유모임 / 편지 / 공지사항 / 신고 기능 rest api 구현  
  > blender를 이용한 3d 모델링  
  > 프로젝트 발표 ppt 제작 및 발표

- **[이희주](https://github.com/leepro1) (BE팀장 - BE)**

  > **BE**  
  > 스프링 시큐리티 및 JWT 인증, 인가 관리  
  > 이메일 / 펫 정보 rest api 구현  
  > redis 캐시와 mysql 인덱스 설정으로 DB 성능 향상

  ***

  > **Infra**  
  > 젠킨스 CI/CD  
  > 그라파나, 프로메테우스로 서버 모니터링

- **[박진형](https://github.com/dyunames21) (팀원 - BE)**

  > **BE**  
  > 3d 모델 생성을 위한, springboot django 간 Reactive Streams 파일 통신 적용  
  > 추억공간과 관련 엔티티(앨범, 방명록) Rest API 구현  
  > UCC 기획 및 제작

- **[최홍석](https://github.com/k-redstone) (FE팀장 - FE)**

  > **FE**  
  > Three.js를 사용하여 추억공간 페이지 구현  
  > 추억공간 모아보기 페이지 구현  
  > FE 코드 리팩토링
  > Figma 디자인

  ***

  > **Infra**  
  > OpenVidu 배포용 서버  
  > S3 버킷  
  > DRF를 이용한 AI모델 서버 구축

- **[임가현](https://github.com/kyeong8139) (팀원 - FE)**

  > **FE**  
  > 사용자 인증 및 계정 관리 기능  
  > 사용자 프로필 페이지 및 사용자 치유모임 관리  
  > Openvidu 실시간 채팅 구현

- **[차재훈](https://github.com/chajaeh) (팀원 - FE)**
  > **FE**  
  > Openvidu 를 이용한 client 간의 P2P 통신 구현  
  > 치유모임 모아보기 Card component UI와 pagination 구현  
  > 어드민 페이지 구성

## TECH

### FE

  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"/>
  <img src="https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"/>
  <img src="https://img.shields.io/badge/three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
  <img src="https://img.shields.io/badge/openvidu-73BA25?style=for-the-badge&logo=zustand&logoColor=white">

### FE State Management

  <img src="https://img.shields.io/badge/zustand-orange?style=for-the-badge&logo=zustand&logoColor=white">
  <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>

### FE Style

  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>

### FE Bundler

  <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>

---

### BE

  <img src="https://img.shields.io/badge/openjdk-000000?style=for-the-badge&logo=openjdk&logoColor=white"/>
  <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>
  <img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"/>
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Redis-FF4438?style=for-the-badge&logo=zustand&logoColor=white">

### BE-AI

  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white"/>
  <img src="https://img.shields.io/badge/pytorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white"/>

### Infra

  <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white"/>
  <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"/>
  <img src="https://img.shields.io/badge/prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white"/>
  <img src="https://img.shields.io/badge/grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white"/>
  <img src="https://img.shields.io/badge/googlecloud-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white"/>
  <img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"/>
  <img src="https://img.shields.io/badge/oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white"/>

## 실행 환경

### FE

- Node : 20.12.0
- React : 18.3.1
- react-router : 6.24.1
- react-query: 5.51.11

### Backend

- JDK : 17.x
- Spring Security : 6.x
- Spring Boot : 3.x
- MySQL : 8.x
- Redis

### Backend-AI

- python : 3.9
- Django : 4.12
- DRF : 3.15.2
- torch : 2.3.1

###

## Infra

- ![Infra 구성도](./docs/images/PALLUXY_Infra.png)

## 데이터 베이스 모델링(ERD)

- ![ERD 이미지](./docs/images/PALLUXY_ERD.png)

## 서비스 구현 화면

> 치유모임

![healing](./docs/images/service_healing.png)

> 치유모임 모아보기

![healingOverview](./docs/images/service_healingOverview.png)

> 추억공간

![memoryspace](./docs/images/service_memory.png)

> 추억공간 탐방

![memoryspaceOverview](./docs/images/service_memoryOverview.png)

> 펫에게 편지 보내기
> ![memoryspaceOverview](./docs/images/service_memoryPost.png)

## API 명세서

> Swaager 사용

## 프로젝트를 하면서 느낀점

> 이보경
>
> - 처음으로 6인 규모의 프로젝트를 진행하면서 프로젝트의 규모가 커졌는데, 이 과정에서 많이 배울 수 있었습니다. 의존성 최적화를 위해 서비스 레이어를 나눠보기도 하고, JPA를 적용하며 객체지향적인 설계에 대해서도 고민을 하면서 단순히 구현을 넘어 어떻게 하면 효율적인 서버를 구축할 수 있을지 고민해보는 시간이었습니다. 그리고 이 과정에서 다른 팀원들은 어떻게 코드를 작성했는지도 많이 참고하였는데, 항상 함께 고민해준 팀원들에게 감사함을 표합니다.

> 이희주
>
> - 프로젝트를 시작할 때 배우고 싶은 기술들이 너무 많았습니다. 평소에 관심을 가지고 있었던 기술들을 나열하며 적용해 보려 했지만, 서비스를 개발하는 데 있어 그 기술의 필요성과 적합성을 고려하는 것이 얼마나 중요한지 깨닫게 되었습니다. 이번 프로젝트를 통해 전체적인 소프트웨어 개발 프로세스를 경험할 수 있었던 점도 큰 의미가 있었습니다.

> 박진형
>
> - 기존 해왔던 프로젝트와는 다르게, 6인으로 개발을 진행하다 보니 내가 신경 써야 할 부분에 더 신경 쓸 수 있어서 좋았습니다.
>   상대적으로 더 할 일이 많았던 인프라와 프론트에게 고마웠습니다.
>   기술적으로는 서버간 통신에서 인터페이스 기반 설계의 중요성을 느꼈고, webflux를 사용하면서 reactive programming을 학습 및 적용할 좋은 기회가 생겨서 만족스러웠습니다.

> 임가현
>
> - 프로젝트를 진행하면서 컴포넌트 기반 아키텍처의 중요성과 라이브러리 설치 최소화의 필요성을 깨달았고, React의 개념과 사용법을 익히며 프론트엔드 개발에 대한 이해를 높일 수 있었습니다. 리액트를 처음 접하며 개념 이해와 상태 관리, 최적화에 어려움을 겪었지만, 팀원들의 도움을 통해 문제를 해결할 수 있었습니다.

> 차재훈
>
> - 7주라는 길다면 긴 시간 동안 협업을 하며 팀원들에게 감사함을 많이 느꼈습니다. 처음으로 프론트엔드로서 프로젝트를 진행하며 스스로 부족한 점도 많이 깨달았는데, 훌륭한 팀원들 덕분에 잘 마무리 지을 수 있었던 것 같습니다. OpenVidu에 치이고, React에 치이면서 고생을 조금 했지만 배울 점이 많은 프로젝트였습니다.

> 최홍석
>
> - 프로젝트를 기간안에 완성하기 위해 빠르게 달려온 것 같습니다. 빠르게 지나간 만큼 코드의 구조적 디테일을 놓친부분이 많았고, 처음 세팅시 잡은 구조를 지키지 못한 점 이 있었습니다. 이번 프로젝트를 통해 JS의 3D 라이브러리인 Three.js를 다뤄볼 수 있어서 의미가 있었던 경험이었다.
