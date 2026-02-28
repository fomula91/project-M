# Project M - 사쿠라 학원

Monogatari 엔진 기반 웹 비주얼 노벨 게임. 사쿠라 학원을 배경으로 5일간의 학원 생활을 플레이합니다.

## 스토리

봄 신학기, 사쿠라 학원에 전학 온 플레이어가 캐릭터들과 만나며 이야기가 전개됩니다.

| 캐릭터 | 설명 |
|--------|------|
| **하루** | 전학생 (플레이어) |
| **소라** | 조용하고 단정한 학급위원 |
| **하나** | 밝고 활발한 동급생 |
| **유우** | 작년에 졸업한 선배 (Day 4~5 등장) |

5일(Day 1~5) 동안 선택지에 따라 호감도가 변화하며, 최종적으로 다른 엔딩으로 분기합니다.

### 엔딩

**Day 3 조기 엔딩 (3개)**

- **소라 고백 엔딩** - "조용한 봄의 시작"
- **하나 고백 엔딩** - "벚꽃빛 귀갓길"
- **히든 엔딩** - "벚꽃 아래의 약속" (소라·하나 호감도 ≥4)

**Day 5 엔딩 (5개)**

- **소라 트루 러브** - "과학실의 노을"
- **소라 따뜻한 엔딩** - "천천히 피는 봄"
- **하나 트루 러브** - "수영장의 노을"
- **하나 따뜻한 엔딩** - "새 계절의 시작"
- **트루 엔딩** - "이어지는 봄" (함께 루트)

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
│       ├── day1/
│       │   ├── day1-common.js
│       │   ├── day1-sora.js
│       │   └── day1-hana.js
│       ├── day2/
│       │   ├── day2-common.js
│       │   ├── day2-sora.js
│       │   └── day2-hana.js
│       ├── day3/
│       │   ├── day3-common.js
│       │   ├── day3-sora.js
│       │   ├── day3-hana.js
│       │   └── day3-together.js
│       ├── day4/
│       │   ├── day4-common.js
│       │   ├── day4-sora.js
│       │   ├── day4-hana.js
│       │   └── day4-together.js
│       └── day5/
│           ├── day5-sora.js
│           ├── day5-hana.js
│           └── day5-together.js
├── assets/
│   ├── characters/         # 캐릭터 스프라이트
│   ├── scenes/             # 배경 이미지
│   ├── icons/              # PWA 아이콘
│   ├── ui/                 # UI 에셋
│   ├── music/              # BGM
│   ├── sounds/             # 효과음
│   └── voices/             # 음성
├── style/
│   ├── main.css            # 메인 스타일
│   ├── character-actions.css
│   ├── character-position.css
│   ├── choice-stats.css
│   ├── settings.css
│   └── text-box.css
└── engine/                 # Monogatari v2.0.2 엔진
```

## 브랜치 전략

| 브랜치 | 용도 |
|--------|------|
| `main` | 프로덕션 - push 시 Vercel 자동 배포 |
| `develop` | 개발 - 작업 후 main으로 PR 머지 |

## 플레이 시간

약 20~30분
