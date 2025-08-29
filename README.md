<<<<<<< HEAD
# K-Doc

K-Doc 프로젝트는 Feature-Sliced Design (FSD) 아키텍처를 기반으로 한 Next.js 애플리케이션입니다.

## 기술 스택

- **Framework**: Next.js 15.4.6
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack Query
- **Database**: Prisma
- **Authentication**: Supabase
- **UI Components**: Radix UI
- **Animation**: Framer Motion, GSAP

## 프로젝트 구조

```
k-doc/
├── app/                    # Next.js App Router
├── shared/                 # 공통 인프라
│   ├── ui/                # 공통 UI 컴포넌트
│   ├── lib/               # 공통 유틸리티
│   └── model/             # 공통 모델
├── entities/              # 비즈니스 엔티티
├── features/              # 사용자 상호작용 기능
├── widgets/               # 복합 UI 블록
└── public/                # 정적 파일
```

## 시작하기

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

### 빌드

```bash
pnpm build
```

### 린트

```bash
pnpm lint
```

### 포맷팅

```bash
pnpm format
```

## 아키텍처 원칙

- **Feature-Sliced Design (FSD)**: 계층별 의존성 규칙 준수
- **Clean Architecture**: 비즈니스 로직과 인프라 분리
- **Type Safety**: TypeScript를 통한 타입 안전성 보장
- **Component Composition**: 재사용 가능한 컴포넌트 설계
=======
# k-doc
>>>>>>> ba043a5dfc7f514670a3dc28bddc8fb4cc70d806
