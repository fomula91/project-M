# Project M - 사쿠라 학원

Monogatari 엔진 기반 웹 비주얼 노벨 게임. 사쿠라 학원을 배경으로 3일간의 학원 생활을 플레이합니다.

## 스토리

봄 신학기, 사쿠라 학원에 전학 온 플레이어가 세 명의 캐릭터와 만나며 이야기가 전개됩니다.

| 캐릭터 | 설명 |
|--------|------|
| **소라** | 조용하고 단정한 학급위원 |
| **하나** | 밝고 활발한 동급생 |
| **하루** | - |

3일(Day 1~3) 동안 선택지에 따라 호감도가 변화하며, 최종적으로 다른 엔딩으로 분기합니다.

### 엔딩

- **소라 엔딩** - 소라 호감도 > 하나 호감도
- **하나 엔딩** - 하나 호감도 > 소라 호감도
- **우정 엔딩** - 호감도 동점

## 기술 스택

- **엔진**: [Monogatari](https://monogatari.io/) v2.0.2
- **배포**: Vercel (정적 사이트)
- **PWA**: Service Worker + Web App Manifest 지원
- **라이선스**: MIT

## 로컬 실행

```bash
# Python
python3 -m http.server 8080

# 또는 yarn
yarn serve
```

브라우저에서 `http://localhost:8080` 접속.

## 프로젝트 구조

```
project-m/
├── index.html              # 진입점
├── manifest.json           # PWA 매니페스트
├── service-worker.js       # 오프라인 캐싱
├── vercel.json             # Vercel 배포 설정
├── js/
│   ├── main.js             # 초기화
│   ├── options.js          # 엔진 설정
│   ├── storage.js          # 게임 변수 (호감도, 플래그)
│   ├── script.js           # 캐릭터/에셋 정의
│   └── scripts/            # 스토리 스크립트
│       ├── day1-common.js  # Day 1 공통
│       ├── day1-sora.js    # Day 1 소라 루트
│       ├── day1-hana.js    # Day 1 하나 루트
│       ├── day2-common.js  # Day 2 공통
│       ├── day2-sora.js    # Day 2 소라 루트
│       ├── day2-hana.js    # Day 2 하나 루트
│       ├── day3-common.js  # Day 3 공통
│       ├── day3-sora.js    # Day 3 소라 루트
│       ├── day3-hana.js    # Day 3 하나 루트
│       └── day3-together.js # Day 3 우정 루트
├── assets/
│   ├── characters/         # 캐릭터 스프라이트 (소라, 하나, 하루)
│   ├── scenes/             # 배경 이미지
│   ├── icons/              # PWA 아이콘
│   ├── ui/                 # UI 에셋
│   ├── music/              # BGM
│   ├── sounds/             # 효과음
│   └── voices/             # 음성
├── style/main.css          # 커스텀 스타일
└── engine/                 # Monogatari v2.0.2 엔진
```

## 브랜치 전략

| 브랜치 | 용도 |
|--------|------|
| `main` | 프로덕션 - push 시 Vercel 자동 배포 |
| `develop` | 개발 - 작업 후 main으로 PR 머지 |

## 플레이 시간

약 10~15분
