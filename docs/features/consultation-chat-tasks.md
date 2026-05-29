# K-DOC 상담 채팅 — 태스크 목록

> 이 파일은 작업할 때마다 진행 상태를 업데이트한다.
> 상태: `[ ]` 미시작 · `[~]` 진행중 · `[x]` 완료 · `[-]` 스킵/보류
>
> **전략**: UI 플로우 순서대로 화면을 보면서 진행. API 없는 부분은 mock으로 채우고 나중에 실제 연결.

**착수일**: 2026-06-01 (Day 1)
**완료 목표**: 2026-06-16 (Day 10)
**요구사항 문서**: [consultation-chat-requirements.md](./consultation-chat-requirements.md)

---

## 사전 준비 (Day 0)

- [ ] P0-1 슬랙 신규 상담 알림 채널 결정 + incoming webhook URL 발급 (운영팀)
- [ ] P0-2 VAPID 키 생성 (`web-push generate-vapid-keys`) + Vercel 환경변수 등록
- [ ] P0-3 운영시간 최종 확정 (한국 공휴일 자동 적용 여부)
- [ ] P0-4 운영팀 P1 결정 합의 일정 (상담 배정 룰 / 메모 UX — D5까지)

---

## Phase 1 — 사용자 UI 플로우 (화면 보면서 진행)

> 이 Phase는 mock 데이터 기반으로 화면을 먼저 완성한다.
> Prisma 스키마 / API 연결은 Phase 2에서 붙인다.

### UI-01 · 플로팅 버튼 (`features/kdoc-consultation-floating`)
- [x] UI-01-1 `floating-cooldown.ts` — localStorage cooldown 유틸
  - `isDismissed(): boolean` (3시간 이내 숨김 여부)
  - `dismiss(): void` (현재 시각 저장)
- [x] UI-01-2 `KdocFloatingButton.tsx` — 메인 버튼 컴포넌트
  - 기존 `ContactKIcon` 재사용 (동일 디자인)
  - X 닫기 클릭 시 `dismiss()` 호출, 버튼 숨김
  - cooldown 중이면 렌더 안 함
  - 클릭 시 `/[lang]/kdoc-chat` 라우트로 이동
- [x] UI-01-3 `MainPageLayoutV2.tsx` 수정
  - `{(lang === 'th' || lang === 'tl') && <ContactFloatingButton />}` 제거
  - 모든 언어에서 `<KdocFloatingButton lang={lang} />` 노출로 교체

### UI-02 · K-DOC 상담 랜딩 (`app/[lang]/kdoc-chat`)
- [x] UI-02-1 라우트 생성: `app/[lang]/kdoc-chat/page.tsx`
- [x] UI-02-2 `KdocChatLanding.tsx` — 환영 카드 + CTA
  - K 로고/일러스트
  - 타이틀: "K-DOC 무료 상담"
  - 설명 텍스트
  - "무료 상담 시작하기" 버튼 → 카테고리 선택으로 이동
  - 기존 상담내역 있으면 "이전 상담 이어가기" 링크도 노출 (mock)

### UI-03 · 카테고리 선택 (`features/kdoc-consultation-chat/ui/CategorySelect.tsx`)
- [x] UI-03-1 4개 카테고리 칩 UI
  - Plastic Surgery / Dermatology & Aesthetic / Concierge & Reservation / Other Inquiry
  - 선택 시 강조(보라색 테두리)
  - "다음" 버튼 → 회원이면 채팅창 / 비회원이면 게스트 폼으로
- [x] UI-03-2 회원/비회원 분기 (`KdocChatFlow.tsx` — `useAuth` + `is_anonymous` + `user_metadata.nationality`)
  - 회원 + 국적 있음(5a) → 채팅창 바로
  - 회원 + 국적 없음(5b) → 국적 입력 1필드
  - 비회원(5c) → 게스트 폼

### UI-04 · 게스트 정보 폼 (`features/kdoc-consultation-chat/ui/GuestInfoForm.tsx`)
- [x] UI-04-1 이름 / 이메일 / 국적 3필드 입력 폼
  - 모두 필수 — 하나라도 비면 "시작하기" 버튼 비활성(회색), 모두 채우면 보라색 활성
  - 국적은 자유 텍스트
- [x] UI-04-2 5b 케이스: 국적 1필드만 입력하는 간소화 화면 (`NationalityForm.tsx`)

### UI-05 · 채팅창 (`features/kdoc-consultation-chat/ui/KdocChatMain.tsx`)
- [x] UI-05-1 채팅창 레이아웃 — 헤더 + 메시지 목록 + 입력창
  - 헤더: "K-DOC 상담" 타이틀 + 카테고리 + 운영중 뱃지 (mock)
  - 메시지 목록: 기존 `MessageList`, `UserMessage`, `HospitalMessage` 컴포넌트 재사용
  - 입력창: 기존 `ChatInput` 재사용
- [x] UI-05-2 mock 메시지 + 사용자 메시지 입력 로컬 state로 렌더링

### UI-06 · 진입 흐름 전체 연결
- [x] UI-06-1 `KdocChatFlow.tsx` — 플로팅 버튼 → 랜딩 → 카테고리 → (분기) → 채팅창 전체 step 기반 라우팅
- [x] UI-06-2 뒤로가기 버튼 — 각 step에서 이전 step으로 이동
- [ ] UI-06-3 "새 상담" 중복 경고 모달 — Phase 2 API 연결 후 구현

---

## Phase 2 — 백엔드 스키마 + API 연결

### DB-01 · Prisma 스키마
- [ ] DB-01-1 `KdocThreadStatus` enum: `ACTIVE` / `PENDING` / `CLOSED`
- [ ] DB-01-2 `KdocChatCategory` enum: `PLASTIC_SURGERY` / `DERMATOLOGY_AESTHETIC` / `CONCIERGE_RESERVATION` / `OTHER_INQUIRY`
- [ ] DB-01-3 `KdocChatThread` 모델 — id, status, category, guestName, guestEmail, guestNationality, userId(→User?), signupInviteSentAt, createdAt, updatedAt
- [ ] DB-01-4 `KdocChatMessage` 모델 — id, threadId(→Thread), senderType, content, adminName, isRead, readAt, createdAt
- [ ] DB-01-5 `KdocChatMeta` 모델 (1:1 with Thread) — referrerPage, deviceType, os, browser, utmCampaign, utmMedium, firstResponseAt, lastResponseAt, autoCloseAt
- [ ] DB-01-6 `AdminBookmarkedHospital` 모델 — adminUserId + hospitalId (unique)
- [ ] DB-01-7 `RecommendationTemplate` 모델 — name, hospitalIds[], createdBy
- [ ] DB-01-8 `PushSubscription` 모델 — userId?, threadId?, endpoint, p256dh, auth
- [ ] DB-01-9 `User` 모델에 `consultationPushEnabled`, `consultationEmailEnabled` 컬럼 추가
- [ ] DB-01-10 마이그레이션 실행

### DB-02 · 사용자 API
- [ ] DB-02-1 `POST /api/kdoc-chat/thread` — thread 생성 (카테고리 + 게스트 정보 + 메타 저장)
- [ ] DB-02-2 `GET /api/kdoc-chat/thread` — 현재 사용자 활성 thread 목록
- [ ] DB-02-3 `GET /api/kdoc-chat/thread/[id]/messages` — 메시지 목록 (커서 페이지네이션)
- [ ] DB-02-4 `POST /api/kdoc-chat/thread/[id]/messages` — 메시지 발송
- [ ] DB-02-5 게스트 인증 헬퍼 — Supabase `signInAnonymously()` (`shared/lib/auth/guest-auth.ts`)
- [ ] DB-02-6 이메일 머지 로직 — 회원가입 완료 시 guestEmail 매칭 thread → userId 업데이트

### DB-03 · Realtime 구독
- [ ] DB-03-1 `useKdocRealtimeChat.ts` — Supabase realtime 구독 훅 (기존 `useRealtimeChat.ts` 패턴)
- [ ] DB-03-2 게스트(anonymous) RLS 정책 설정 — 본인 threadId만 접근 허용
- [ ] DB-03-3 UI-05 채팅창에 realtime 연결

---

## Phase 3 — 어드민 UI

### ADMIN-01 · thread 목록
- [ ] ADMIN-01-1 어드민 라우트 `app/admin/kdoc-consultations/page.tsx`
- [ ] ADMIN-01-2 어드민 API `GET /api/admin/kdoc-chat/threads`
- [ ] ADMIN-01-3 목록 UI — 3탭(진행중/보류중/종료됨) + 카드 리스트

### ADMIN-02 · 상세 패널 + 메타
- [ ] ADMIN-02-1 어드민 API `GET /api/admin/kdoc-chat/threads/[id]`
- [ ] ADMIN-02-2 `AdminKdocChatMain.tsx` — 채팅 패널 (기존 `AdminConsultationChat` 패턴)
- [ ] ADMIN-02-3 `KdocChatMetaPanel.tsx` — 우측 메타데이터 사이드바
- [ ] ADMIN-02-4 매니저 답변 API `POST /api/admin/kdoc-chat/threads/[id]/messages`

### ADMIN-03 · 상태 변경
- [ ] ADMIN-03-1 `PATCH /api/admin/kdoc-chat/threads/[id]/status`
- [ ] ADMIN-03-2 "보류" 버튼 + 사유 드롭다운 (병원 확인 중 / 내부 검토 / 기타)
- [ ] ADMIN-03-3 "상담 완료" 버튼 + 사용자 자동 완료 메시지 발송

### ADMIN-04 · 추천 병원 카드 패널
- [ ] ADMIN-04-1 `AdminBookmarkedHospital` / `RecommendationTemplate` CRUD API
- [ ] ADMIN-04-2 "병원 추천" 버튼 → 3탭 패널 (검색/템플릿/즐겨찾기)
- [ ] ADMIN-04-3 선택 트레이 + 일괄 발송 UI
- [ ] ADMIN-04-4 카드 캐러셀 메시지 페이로드 + 사용자 채팅창 렌더링

### ADMIN-05 · 회원가입 유도 버튼
- [ ] ADMIN-05-1 `[회원가입 유도]` 버튼 (비회원 thread만 활성)
- [ ] ADMIN-05-2 UTM 링크 빌더 + 자동 메시지 발송 API
- [ ] ADMIN-05-3 발송 후 "발송됨" 상태 표시 + 재발송 확인 모달

---

## Phase 4 — 알림/자동화

### NOTIFY-01 · 슬랙 신규 상담 알림
- [ ] NOTIFY-01-1 `shared/lib/slack/send-kdoc-chat-notification.ts`
- [ ] NOTIFY-01-2 thread 생성 API에서 슬랙 알림 호출
- [ ] NOTIFY-01-3 환경변수 `SLACK_KDOC_CHAT_WEBHOOK_URL` 등록

### NOTIFY-02 · 웹푸시 인프라
- [ ] NOTIFY-02-1 `public/manifest.json` + `public/sw.js` Service Worker
- [ ] NOTIFY-02-2 VAPID 키 + `PushSubscription` 저장 API
- [ ] NOTIFY-02-3 `usePushSubscription.ts` — 구독 훅
- [ ] NOTIFY-02-4 매니저 답변 시 웹푸시 발송 + 이메일 fallback

### NOTIFY-03 · 소프트 프롬프트
- [ ] NOTIFY-03-1 `push-prompt-tracker.ts` — localStorage 시도 횟수 추적
- [ ] NOTIFY-03-2 `PushPermissionPrompt.tsx` — 인앱 다이얼로그 (1차: 첫 메시지 직후)
- [ ] NOTIFY-03-3 2차 프롬프트 — 운영시간 외 + 1차 거부자

### NOTIFY-04 · Vercel Cron 상태 머신
- [ ] NOTIFY-04-1 48h 보류 자동 전환 cron
- [ ] NOTIFY-04-2 7일 자동 종료 cron + D-1 알림
- [ ] NOTIFY-04-3 사용자 재메시지 시 PENDING → ACTIVE 복귀

---

## Phase 5 — 파일 첨부 확장 + 다국어 + QA

### FILE-01 · 파일 첨부 다중 5장
- [ ] FILE-01-1 `useChatMultiUpload.ts` — 최대 5장, 10MB, 동영상 미지원, 게스트 지원
- [ ] FILE-01-2 파일 선택 미리보기 트레이 UI
- [ ] FILE-01-3 여러 파일을 하나의 메시지 content에 저장

### I18N-01 · 다국어 9개
- [ ] I18N-01-1 신규 텍스트 키 추출 + ko/en 작성
- [ ] I18N-01-2 AI 자동 번역 7개 언어 + xlsx sync
- [ ] I18N-01-3 푸시 알림 텍스트 / 회원가입 유도 메시지 9개 언어

### QA-01 · E2E + 배포
- [ ] QA-01-1 비회원 전체 플로우 시나리오
- [ ] QA-01-2 회원 5a/5b/5c 분기 시나리오
- [ ] QA-01-3 어드민 플로우 시나리오
- [ ] QA-01-4 웹푸시 + cron 시나리오
- [ ] QA-01-5 Vercel 환경변수 + 마이그레이션 + 프로덕션 배포

---

## 진행 현황

| Phase | 태스크 | 상태 |
|---|---|---|
| 사전 준비 | P0-1 ~ P0-4 | `[ ]` |
| Phase 1 (사용자 UI) | UI-01 ~ UI-06 | `[x]` 완료 |
| Phase 2 (백엔드) | DB-01 ~ DB-03 | `[ ]` |
| Phase 3 (어드민 UI) | ADMIN-01 ~ ADMIN-05 | `[ ]` |
| Phase 4 (알림/자동화) | NOTIFY-01 ~ NOTIFY-04 | `[ ]` |
| Phase 5 (파일/다국어/QA) | FILE-01, I18N-01, QA-01 | `[ ]` |
