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

## Phase 1 — 사용자 UI 플로우

### UI-01 · 플로팅 버튼 ✅ 2026-06-01 완료
- [x] UI-01-1 `floating-cooldown.ts` — 3시간 cooldown 유틸
- [x] UI-01-2 `KdocFloatingButton.tsx` — pill 형태 버튼 (Figma 기반)
- [x] UI-01-3 `MainPageLayoutV2.tsx` — 모든 언어에서 KdocFloatingButton으로 교체

### UI-02 · 채팅 라우트 ✅ 2026-06-01 완료
- [x] UI-02-1 라우트 생성: `app/[lang]/kdoc-chat/page.tsx`
- [x] UI-02-2 `KdocChatPage.tsx` — 전체 레이아웃 (GNB + 메시지 영역 + 입력창)

### UI-03 · 채팅 초기 흐름 — 카테고리 + 게스트 폼 ✅ 2026-06-02 완료
- [x] UI-03-1 K-DOC 자동 웰컴 메시지 버블
- [x] UI-03-2 카테고리 칩 퀵리플라이 (성형 상담 / 피부 시술 상담 / 컨시어지 문의 / 기타)
- [x] UI-03-3 회원/비회원 분기
  - [x] 비회원(5c) → 카테고리 선택 → 이름/이메일/국적 인라인 폼 → thread 생성 → 채팅
  - [x] 회원 → 카테고리 선택 후 바로 thread 생성 → 채팅
  - [ ] 회원 + 국적 없음(5b) → 국적 1필드만 입력 후 채팅 ← **미구현**
- [x] UI-03-4 비회원 인라인 폼 (이름/이메일/국적 3필드 모두 필수, 저장 버튼)

### UI-04 · 채팅창 본체 UI ✅ 2026-06-01~02 완료
- [x] UI-04-1 GNB 픽셀 수준 구현 (Figma 직접 확인)
- [x] UI-04-2 K-DOC 버블 / 유저 버블 스타일
- [x] UI-04-3 카테고리 칩 스타일
- [x] UI-04-4 입력창 (카메라 + placeholder + 전송 아이콘)
- [x] UI-04-5 게스트 폼 Figma 일치 수정 (2026-06-02)
  - input: border-bottom → full rounded border (`border border-[#e5e5e5] rounded-lg`)
  - 버튼: 폼 카드 밖 텍스트링크 → 카드 안 full-width 버튼
  - 버튼 텍스트: "상담 시작하기" → "저장" (비활성 #e5e5e5, 활성 #7657ff)
  - K-DOC 안내 메시지: 개인정보 안내문 추가

### UI-05 · 게스트 저장 후 채팅 진입 플로우 ✅ 2026-06-02 완료
- [x] UI-05-1 `guest_submitted` phase — KdocGuestInfoCard + "정보가 저장되었습니다" 버블 + 입력창
- [x] UI-05-2 첫 메시지 전송 시 `guest_submitted` → `chat` phase 자동 전환 (`transitionToChat`)
- [x] UI-05-3 `chat` phase 진입 후 KdocGuestInfoCard 상단 고정 유지
- [x] UI-05-4 새로고침 시 localStorage에서 threadId + guestInfo + categoryLabel 복원 → 카드 유지

---

## Phase 2 — 백엔드 스키마 + API 연결

### DB-01 · Prisma 스키마 ✅ 2026-06-01 완료
- [x] `KdocThreadStatus`, `KdocChatCategory` enum 추가
- [x] `KdocChatThread`, `KdocChatMessage` 모델 추가
- [x] 마이그레이션 완료

### DB-02 · 사용자 API ✅ 2026-06-01 완료 (일부 미구현)
- [x] `POST /api/kdoc-chat/thread` — thread 생성
- [x] `GET /api/kdoc-chat/thread` — 활성 thread 목록
- [x] `GET /api/kdoc-chat/thread/[id]/messages` — 메시지 목록 (커서 페이지네이션)
- [x] `POST /api/kdoc-chat/thread/[id]/messages` — 메시지 발송
- [x] 비회원: `signInAnonymously()` → thread 생성 → 채팅
- [ ] DB-02-6 이메일 머지 로직 — 회원가입 시 guestEmail 매칭 thread.userId 업데이트

### DB-03 · Realtime 구독 ✅ 2026-06-01 완료 (일부 미구현)
- [x] `useKdocRealtimeChat.ts` — Postgres Changes (INSERT on KdocChatMessage by threadId)
- [x] UI 실제 API 연결 완료
- [ ] DB-03-2 RLS 정책 설정 — 본인 threadId만 접근 허용

---

## Phase 2.5 — 다국어 처리

### I18N-01 · 다국어 9개 ✅ 2026-06-02 완료
- [x] I18N-01-1 `kdocChat` 섹션 키 설계 (gnb / welcome / categories / guestForm / input / loading)
- [x] I18N-01-2 9개 언어 JSON 추가 (en/ko/th/tl/ja/zh-Hant/ar/ru/hi)
- [x] I18N-01-3 `page.tsx` → `getDictionary` 호출 → `dict` prop 주입
- [x] I18N-01-4 전체 UI 컴포넌트 dict 기반으로 변경
  - `KdocChatGnb`, `KdocCategoryChips`, `KdocChatInput`, `KdocGuestInfoForm`, `KdocChatPage`
  - `chat-constants.ts`: 정적 label 제거, key 배열만 유지
  - `useKdocChatFlow`: `handleCategorySelect(category, label)` 시그니처 + `selectedCategoryLabel` state
- [ ] I18N-01-5 푸시 알림 텍스트 / 회원가입 유도 메시지 9개 언어 ← Phase 4 때 추가

---

## Phase 3 — 어드민 UI

### ADMIN-01 · thread 목록 ✅ 2026-06-02 완료
- [x] ADMIN-01-1 상담관리 페이지에 기존 상담 / K-DOC 상담 탭 2개로 통합 (`app/admin/consultations/page.tsx`)
- [x] ADMIN-01-2 어드민 API `GET /api/admin/kdoc-chat/threads` (status 필터 + 페이지네이션)
- [x] ADMIN-01-3 목록 UI — 3탭(진행중/보류중/종료됨) + 카드 리스트 (`features/kdoc-consultations/`)

### ADMIN-02 · 상세 패널 + 메타 ✅ 2026-06-02 완료
- [x] ADMIN-02-1 어드민 API `GET /api/admin/kdoc-chat/threads/[id]`
- [x] ADMIN-02-2 `AdminKdocChatMain.tsx` — 채팅 패널 (`AdminKdocConsultationChat` + `KdocAdminMessageList` + `KdocAdminChatInput`)
- [x] ADMIN-02-3 `KdocChatMetaPanel.tsx` — 우측 메타데이터 사이드바 (상태·카테고리·시각·이름·이메일·국적·회원여부)
- [x] ADMIN-02-4 매니저 답변 API `POST /api/admin/kdoc-chat/threads/[id]/messages`
- [x] `useKdocAdminChat.ts` — TanStack Query + 낙관적 업데이트 + Supabase Realtime 구독
- [x] `/admin/consultations/kdoc/[threadId]` 상세 페이지 라우트

### ADMIN-03 · 상태 변경 ✅ 2026-06-02 완료
- [x] ADMIN-03-1 `PATCH /api/admin/kdoc-chat/threads/[id]/status`
- [x] ADMIN-03-2 "보류" 버튼 + 사유 드롭다운 (병원 확인 중 / 내부 검토 / 기타)
- [x] ADMIN-03-3 "상담 완료" 버튼 + 사용자 자동 완료 메시지 발송
- [x] `KdocStatusButtons.tsx` — 보류/완료 모달 + "진행중으로 복귀" 버튼
- [x] `useKdocStatusChange.ts` — mutation + autoMessage 캐시 즉시 반영

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

## Phase 5 — 파일 첨부 확장 + QA

### FILE-01 · 파일 첨부 다중 5장
- [ ] FILE-01-1 `useChatMultiUpload.ts` — 최대 5장, 10MB, 동영상 미지원, 게스트 지원
- [ ] FILE-01-2 파일 선택 미리보기 트레이 UI
- [ ] FILE-01-3 여러 파일을 하나의 메시지 content에 저장

### QA-01 · E2E + 배포
- [ ] QA-01-1 비회원 전체 플로우 시나리오
- [ ] QA-01-2 회원 5a/5b/5c 분기 시나리오
- [ ] QA-01-3 어드민 플로우 시나리오
- [ ] QA-01-4 웹푸시 + cron 시나리오
- [ ] QA-01-5 Vercel 환경변수 + 마이그레이션 + 프로덕션 배포

---

## 버그 수정 이력

### BUG-01 · 메시지 중복 표시 ✅ 2026-06-02 수정
- **원인**: `useSendKdocMessage.onSuccess`에서 실제 메시지를 캐시에 재추가 → optimistic + real + Realtime 3중 추가로 중복 발생
- **수정**: `lib/queries/kdoc-chat.ts` — `useSendKdocMessage.onSuccess` 제거. Realtime subscription이 optimistic → real 단일 교체로 처리

### BUG-02 · chat phase 전환 시 히스토리 소실 ✅ 2026-06-02 수정
- **원인**: `guest_submitted` → `chat` phase 전환 시 로컬 메시지(카테고리 버블·안내문·저장완료)가 사라지고 DB 첫 메시지(카테고리)가 중복 노출
- **수정**: `KdocChatPage.tsx` — `chat` phase에서도 pre-chat 히스토리 로컬 렌더 유지, DB 첫 카테고리 메시지 중복 필터링

---

## 진행 현황

| Phase | 태스크 | 상태 |
|---|---|---|
| 사전 준비 | P0-1 ~ P0-4 | `[ ]` 운영팀 대기 |
| Phase 1 (사용자 UI) | UI-01 ~ UI-05 | `[x]` 완료 (회원 5b 분기만 미구현) |
| Phase 2 (백엔드) | DB-01 ~ DB-03 | `[x]` 완료 (머지 로직·RLS 제외) |
| Phase 2.5 (다국어) | I18N-01 | `[x]` kdocChat 9개 언어 완료 |
| Phase 3 (어드민 UI) | ADMIN-01 ~ ADMIN-05 | `[~]` ADMIN-01·02·03 완료, ADMIN-04 착수 예정 |
| Phase 4 (알림/자동화) | NOTIFY-01 ~ NOTIFY-04 | `[ ]` 미시작 |
| Phase 5 (파일/QA) | FILE-01, QA-01 | `[ ]` 미시작 |

## 다음 세션 시작점

**ADMIN-04** — 추천 병원 카드 패널 (어드민 레포 `/Users/leegibbeum/repos/admin`)
- ADMIN-04-1 `AdminBookmarkedHospital` / `RecommendationTemplate` CRUD API
- ADMIN-04-2 "병원 추천" 버튼 → 3탭 패널 (검색/템플릿/즐겨찾기)
- ADMIN-04-3 선택 트레이 + 일괄 발송 UI
- ADMIN-04-4 카드 캐러셀 메시지 페이로드 + 사용자 채팅창 렌더링
