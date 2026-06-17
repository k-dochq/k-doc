// 피그마(7515:20340) "CEO인사말" 섹션은 도입부와 마무리 사이에
// K-DOC 서울 지사(건물 이미지 + 타이틀) 블록이 삽입되는 구조다.
// 그래서 ceoGreeting.content 를 두 영역으로 나눠 각 컴포넌트가 나눠 렌더한다.
//   - 도입부(content[0..2]): AboutCeoGreetingV2
//   - 마무리(content[3..]) : AboutSeoulOfficeV2
const SEOUL_OFFICE_CONTENT_START = 3;

export interface CeoGreetingContentParts {
  /** content[0..2] — CEO 인사말 도입부 */
  intro: string[];
  /** content[3..] — 서울 지사 섹션 마무리(본문 + 맺음말 + 서명) */
  closing: string[];
}

export function splitCeoGreetingContent(content: string[]): CeoGreetingContentParts {
  return {
    intro: content.slice(0, SEOUL_OFFICE_CONTENT_START),
    closing: content.slice(SEOUL_OFFICE_CONTENT_START),
  };
}
