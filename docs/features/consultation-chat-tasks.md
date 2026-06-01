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

### UI-01 · 플로팅 버튼 (`features/kdoc-consultation-floating`) ✅ 2026-06-01 완료
- [x] UI-01-1 `floating-cooldown.ts` — localStorage cooldown 유틸
  - `isDismissed(): boolean` (3시간 이내 숨김 여부)
  - `dismiss(): void` (현재 시각 저장)
- [x] UI-01-2 `KdocFloatingButton.tsx` — pill 형태 버튼 (Figma 기반)
  - 그라디언트 배경: linear-gradient(94deg, #3E57E2 → #B133FF → #FF5DCA)
  - 채팅 아이콘 SVG (`KdocChatFloatingIcon.tsx`) + "Free Consultation / with K-DOC" 텍스트
  - X 닫기 클릭 시 `dismiss()` 호출, 버튼 숨김 (3시간 cooldown)
  - 클릭 시 `/[lang]/kdoc-chat` 라우트로 이동
  - 위치: `fixed bottom-[88px] left-[max(20px,calc(50vw-230px))]`
- [x] UI-01-3 `MainPageLayoutV2.tsx` 수정
  - th/tl 전용 `ContactFloatingButton` 제거
  - 모든 언어에서 `<KdocFloatingButton lang={lang} />` 노출로 교체

### UI-02 · 채팅 라우트 + 자동 진입 흐름 (`app/[lang]/kdoc-chat`) ✅ 2026-06-01 완료
> ⚠️ Figma 확인 결과 별도 "환영 카드 랜딩 페이지" 없음. 플로팅 버튼 클릭 → 채팅창 바로 오픈.
> 채팅 시작 시 K-DOC 자동 메시지로 카테고리 선택 → 비회원 정보 수집 → 실제 채팅 순으로 진행.

- [x] UI-02-1 라우트 생성: `app/[lang]/kdoc-chat/page.tsx`
- [x] UI-02-2 `KdocChatPage.tsx` — 채팅창 전체 레이아웃
  - 헤더: ← 뒤로가기 + "K-DOC" 타이틀 + X 닫기
  - 날짜 구분선
  - 메시지 목록 영역
  - 입력창 (비회원 정보 수집 단계에서는 form, 이후 일반 텍스트 입력)

### UI-03 · 채팅 초기 흐름 — 카테고리 + 게스트 폼 (채팅 안에서) ✅ 2026-06-01 완료
> Figma: 카테고리 선택과 게스트 정보 수집이 모두 채팅 버블 안에서 이루어짐.

- [x] UI-03-1 K-DOC 자동 웰컴 메시지 버블
  - "안녕하세요, 고객님 😊 K-DOC 1:1 채팅 상담입니다."
  - 운영시간 안내 (평일 09:00-18:00 KST, 토일공휴일 제외)
- [x] UI-03-2 카테고리 칩 퀵리플라이 (채팅 버블 하단)
  - 성형 상담 / 피부 시술 상담 / 컨시어지 문의 / 기타
  - 선택 시 사용자 버블로 전송, 칩 비활성화
- [ ] UI-03-3 회원/비회원 분기 (현재 mock — Phase 2 API 연결 후 실제 분기)
  - 회원 + 국적 있음(5a) → 카테고리 선택 후 바로 실제 채팅
  - 회원 + 국적 없음(5b) → 국적 입력 인라인 폼 1필드
  - 비회원(5c) → 이름/이메일/국적 인라인 폼 (채팅 안)
- [x] UI-03-4 비회원 인라인 폼
  - 이름 / 이메일 / 국적 3필드 (모두 필수)
  - 제출 버튼 → 실제 채팅 시작

### UI-04 · 채팅창 본체 (`features/kdoc-consultation-chat/ui/KdocChatPage.tsx`) ✅ 2026-06-01 완료
- [x] UI-04-1 GNB: h-58px px-5, K_purple+K_pink 겹침 아이콘(40×40), 16px semibold, 12px #a3a3a3
- [x] UI-04-2 K-DOC 버블: bg-[#f5f5f5] rounded-xl, 32px 아바타, pl-[38px] 들여쓰기
- [x] UI-04-3 카테고리 칩: content-width items-start, bg-[#f1eeff] border-[#c0bfff]
- [x] UI-04-4 유저 버블: gradient #8b45f6→#6544fa, text-[#fafafa]
- [x] UI-04-5 입력창: 카메라 아이콘 + placeholder + 전송 아이콘(그라디언트)
- [x] UI-04-6 Figma 직접 확인으로 픽셀 수준 보정 완료 (2026-06-01)

---

## Phase 2 — 백엔드 스키마 + API 연결

### DB-01 · Prisma 스키마 ✅ 2026-06-01 완료
- [x] `KdocThreadStatus`, `KdocChatCategory` enum 추가
- [x] `KdocChatThread`, `KdocChatMessage` 모델 추가 (admin/prisma/schema.prisma)
- [x] 마이그레이션 완료 (사용자 직접 실행)

### DB-02 · 사용자 API ✅ 2026-06-01 완료
- [x] `POST /api/kdoc-chat/thread` — thread 생성 (anonymous signIn 포함)
- [x] `GET /api/kdoc-chat/thread` — 활성 thread 목록
- [x] `GET /api/kdoc-chat/thread/[id]/messages` — 메시지 목록 (커서 페이지네이션)
- [x] `POST /api/kdoc-chat/thread/[id]/messages` — 메시지 발송
- [x] 비회원: 카테고리 선택 → `signInAnonymously()` → thread 생성 → 채팅
- [ ] DB-02-6 이메일 머지 로직 — 회원가입 시 guestEmail 매칭 thread.userId 업데이트

### DB-03 · Realtime 구독 ✅ 2026-06-01 완료
- [x] `useKdocRealtimeChat.ts` — Postgres Changes 방식 (INSERT on KdocChatMessage filtered by threadId)
- [x] UI 실제 API 연결 완료 (mock state 제거)
- [ ] DB-03-2 RLS 정책 설정 — 본인 threadId만 접근 허용

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
