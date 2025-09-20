# 전역 모달 시스템

JavaScript의 `window.alert`와 `window.confirm`처럼 어디서든 호출할 수 있는 전역 모달 시스템입니다.

## 기능

- **Promise 기반 API**: `await confirm()`, `await alert()` 형태로 사용
- **커스텀 컴포넌트 지원**: 원하는 React 컴포넌트를 모달 내용으로 사용 가능
- **TypeScript 완전 지원**: 타입 안전성 보장
- **Zustand 기반**: 가벼운 상태 관리
- **shadcn/ui Dialog**: 접근성과 UX를 고려한 UI

## 사용법

### 1. 간단한 Confirm

```tsx
import { confirm } from 'shared/lib/modal';

const handleDelete = async () => {
  const result = await confirm('정말로 삭제하시겠습니까?');

  if (result) {
    // 사용자가 확인을 클릭한 경우
    console.log('삭제 진행');
  } else {
    // 사용자가 취소를 클릭한 경우
    console.log('삭제 취소');
  }
};
```

### 2. 옵션이 있는 Confirm

```tsx
import { confirm } from 'shared/lib/modal';

const handleDelete = async () => {
  const result = await confirm({
    title: '계정 삭제',
    message: '계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다.',
    confirmText: '삭제',
    cancelText: '취소',
  });

  if (result) {
    // 삭제 로직
  }
};
```

### 3. Alert

```tsx
import { alert } from 'shared/lib/modal';

const showSuccess = async () => {
  await alert('작업이 성공적으로 완료되었습니다.');
  // alert가 닫힌 후 실행될 코드
};

// 옵션이 있는 Alert
await alert({
  title: '성공',
  message: '데이터가 저장되었습니다.',
  confirmText: '확인',
});
```

### 4. 커스텀 컴포넌트 모달

```tsx
import { openModal } from 'shared/lib/modal';

const showCustomModal = () => {
  openModal({
    title: '커스텀 모달',
    description: '설명 텍스트',
    content: (
      <div>
        <p>여기에 원하는 컴포넌트를 넣을 수 있습니다.</p>
        <button onClick={() => console.log('버튼 클릭')}>액션 버튼</button>
      </div>
    ),
  });
};
```

### 5. React 컴포넌트를 모달로 사용

```tsx
import { openModal, closeModal } from 'shared/lib/modal';

const MyCustomComponent = () => {
  const handleSave = () => {
    // 저장 로직
    closeModal(); // 모달 닫기
  };

  return (
    <div>
      <h3>커스텀 폼</h3>
      <input type='text' placeholder='입력하세요' />
      <button onClick={handleSave}>저장</button>
    </div>
  );
};

const showFormModal = () => {
  openModal({
    title: '데이터 입력',
    content: <MyCustomComponent />,
    showCloseButton: false, // X 버튼 숨기기
  });
};
```

## API 레퍼런스

### `confirm(options)`

사용자에게 확인을 요청하는 모달을 표시합니다.

**Parameters:**

- `options`: `string | ConfirmOptions`

**ConfirmOptions:**

```tsx
interface ConfirmOptions {
  title?: string; // 모달 제목
  message?: string | ReactNode; // 메시지 내용
  confirmText?: string; // 확인 버튼 텍스트 (기본: '확인')
  cancelText?: string; // 취소 버튼 텍스트 (기본: '취소')
  showCancel?: boolean; // 취소 버튼 표시 여부 (기본: true)
}
```

**Returns:** `Promise<boolean>` - 확인: `true`, 취소: `false`

### `alert(options)`

사용자에게 알림을 표시하는 모달을 보여줍니다.

**Parameters:**

- `options`: `string | AlertOptions`

**AlertOptions:**

```tsx
interface AlertOptions {
  title?: string; // 모달 제목
  message?: string | ReactNode; // 메시지 내용
  confirmText?: string; // 확인 버튼 텍스트 (기본: '확인')
}
```

**Returns:** `Promise<void>`

### `openModal(options)`

커스텀 컴포넌트를 포함한 모달을 표시합니다.

**Parameters:**

```tsx
interface ModalOptions {
  title?: string; // 모달 제목
  description?: string; // 모달 설명
  content: ReactNode; // 모달 내용 (필수)
  showCloseButton?: boolean; // X 버튼 표시 여부 (기본: true)
}
```

### `closeModal()`

현재 열린 모달을 닫습니다.

## 설치 및 설정

이 시스템은 이미 프로젝트에 통합되어 있습니다. 별도의 설정 없이 바로 사용할 수 있습니다.

## 의존성

- `zustand`: 상태 관리
- `@radix-ui/react-dialog`: 접근성을 고려한 Dialog 컴포넌트
- `lucide-react`: 아이콘

## 주의사항

- 모달은 한 번에 하나만 표시됩니다
- `confirm`과 `alert`는 Promise를 반환하므로 `await`와 함께 사용하는 것을 권장합니다
- 커스텀 컴포넌트에서 모달을 닫으려면 `closeModal()` 함수를 사용하세요
