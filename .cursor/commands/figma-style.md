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

4. **Tailwind CSS 코드 변환**
   - Figma에서 가져온 스타일을 Tailwind CSS 클래스로 변환합니다
   - 프로젝트의 기존 패턴과 컨벤션을 따릅니다
   - Feature-Sliced Design (FSD) 아키텍처를 준수합니다

## 필수 확인 사항

- [ ] Figma URL에서 `fileKey`와 `nodeId`를 정확히 추출했는가?
- [ ] 디자인 컨텍스트를 성공적으로 가져왔는가?
- [ ] SVG 에셋이 있다면 컴포넌트로 변환했는가?
- [ ] Tailwind 클래스가 프로젝트 스타일 가이드를 따르는가?
- [ ] FSD 아키텍처 규칙을 준수하는가?
- [ ] 적절한 레이어에 컴포넌트를 배치했는가?

## 사용 예시

사용자가 다음과 같이 입력하면:

/figma-style https://www.figma.com/design/Y1Tb9v6qwb2aL5lWTcEKMa/...?node-id=21-5236

다음 작업을 수행합니다:

1. URL에서 `fileKey: Y1Tb9v6qwb2aL5lWTcEKMa`, `nodeId: 21:5236` 추출
2. Figma MCP로 디자인 가져오기
3. Tailwind CSS 코드로 변환
4. 적절한 위치에 컴포넌트 생성
