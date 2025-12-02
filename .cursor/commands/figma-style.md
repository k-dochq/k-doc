# Figma MCP 스타일 가져오기 및 Tailwind 변환

## 개요

Figma MCP를 통해 디자인 컨텍스트를 가져와서 Tailwind CSS 코드로 변환합니다.

## 워크플로우

1. **Figma URL에서 정보 추출**
   - 사용자가 제공한 Figma URL에서 `fileKey`와 `nodeId`를 추출합니다
   - URL 형식: `https://www.figma.com/design/{fileKey}/...?node-id={nodeId}`

2. **Figma MCP를 통한 디자인 가져오기**
   - `get_design_context` 도구를 사용하여 디자인 컨텍스트를 가져옵니다
   - `get_screenshot` 도구를 사용하여 시각적 참조를 가져옵니다
   - `get_metadata` 도구를 사용하여 메타데이터를 가져옵니다

3. **SVG 에셋 처리**
   - 이미지 URL이 제공되면, 실제로 SVG 파일인지 확인합니다
   - SVG인 경우 `curl`로 SVG 코드를 가져와서 React 컴포넌트로 변환합니다
   - SVG 컴포넌트는 적절한 위치에 생성합니다

4. **PNG/이미지 에셋 처리**
   - 이미지 URL이 제공되면, 실제 파일 타입을 확인합니다 (Content-Type 헤더 확인)
   - PNG, JPG 등 래스터 이미지인 경우:
     1. `curl` 또는 `fetch`를 사용하여 이미지를 다운로드합니다
     2. 적절한 네이밍 규칙에 따라 파일명을 생성합니다:
        - 컴포넌트명 기반: `{component-name}-{purpose}.png` (예: `hospital-card-thumbnail.png`)
        - 용도 기반: `{usage}-{description}.png` (예: `category-tag-background.png`)
        - kebab-case 사용, 의미 있는 이름 사용
     3. `public/images/figma/` 디렉토리에 저장합니다
        - 필요시 하위 디렉토리 생성 (예: `public/images/figma/hospital-card/`)
     4. 코드에서는 `/images/figma/{filename}.png` 경로로 참조합니다
   - 이미지 최적화가 필요한 경우 고려합니다 (압축, 리사이즈 등)

5. **Tailwind CSS 코드 변환**
   - Figma에서 가져온 스타일을 Tailwind CSS 클래스로 변환합니다
   - 프로젝트의 기존 패턴과 컨벤션을 따릅니다
   - Feature-Sliced Design (FSD) 아키텍처를 준수합니다

## 필수 확인 사항

- [ ] Figma URL에서 `fileKey`와 `nodeId`를 정확히 추출했는가?
- [ ] 디자인 컨텍스트를 성공적으로 가져왔는가?
- [ ] SVG 에셋이 있다면 컴포넌트로 변환했는가?
- [ ] PNG/이미지 에셋이 있다면 다운로드하여 `public/images/figma/`에 저장했는가?
- [ ] 이미지 파일명이 적절한 네이밍 규칙을 따르는가?
- [ ] 코드에서 로컬 이미지 경로를 사용하는가? (외부 URL 대신)
- [ ] Tailwind 클래스가 프로젝트 스타일 가이드를 따르는가?
- [ ] FSD 아키텍처 규칙을 준수하는가?
- [ ] 적절한 레이어에 컴포넌트를 배치했는가?

## 사용 예시

사용자가 다음과 같이 입력하면:

/figma-style https://www.figma.com/design/Y1Tb9v6qwb2aL5lWTcEKMa/...?node-id=21-5236

다음 작업을 수행합니다:

1. URL에서 `fileKey: Y1Tb9v6qwb2aL5lWTcEKMa`, `nodeId: 21:5236` 추출
2. Figma MCP로 디자인 가져오기
3. SVG 에셋 처리: SVG인 경우 컴포넌트로 변환
4. PNG/이미지 에셋 처리: 래스터 이미지인 경우 다운로드하여 `public/images/figma/`에 저장
5. Tailwind CSS 코드로 변환
6. 적절한 위치에 컴포넌트 생성

## 이미지 네이밍 예시

- `hospital-card-thumbnail.png` - 병원 카드 썸네일 이미지
- `category-tag-background.png` - 카테고리 태그 배경 이미지
- `search-bar-icon.png` - 검색 바 아이콘 이미지
- `quick-menu-eye-icon.png` - QuickMenu 눈 아이콘 이미지
