'use client';

import { VIEWPORT_GRADIENT_COLORS } from '../hooks/useViewportGradient';

/**
 * 뷰포트 기반 연속 그라데이션 효과 예제
 * 채팅이 보이는 구간(뷰포트)을 100%로 하여 자연스럽게 이어지는 그라데이션
 */
export function ViewportGradientExample() {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">뷰포트 기반 연속 그라데이션 예제</h3>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">동작 방식:</h4>
        <ul className="text-sm space-y-1">
          <li>• <strong>채팅이 보이는 구간(뷰포트)만을 100%로 계산</strong></li>
          <li>• 화면 상단에 있는 메시지는 첫 번째 색상</li>
          <li>• 화면 하단에 있는 메시지는 마지막 색상</li>
          <li>• 메시지가 아무리 쌓여도 보이는 구간만 계산</li>
          <li>• 180도 Y축 방향 (위에서 아래로)</li>
          <li>• Intersection Observer로 성능 최적화</li>
        </ul>
      </div>

      {/* 시각적 설명 */}
      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">시각적 설명:</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-16 h-8 bg-purple-500 rounded"></div>
            <span>화면 <strong>상단</strong>의 메시지 (보라색)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-8 bg-purple-400 rounded"></div>
            <span>화면 <strong>중간</strong>의 메시지 (보라+핑크)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-8 bg-pink-400 rounded"></div>
            <span>화면 <strong>중하단</strong>의 메시지 (핑크)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-8 bg-blue-600 rounded"></div>
            <span>화면 <strong>하단</strong>의 메시지 (파란색)</span>
          </div>
        </div>
      </div>

      {/* 색상 프리셋 예제 */}
      <div className="space-y-2">
        <h4 className="font-semibold">사용 가능한 색상 프리셋:</h4>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 border rounded">
            <div className="text-sm font-medium mb-1">Purple (기본)</div>
            <div className="flex space-x-1">
              {VIEWPORT_GRADIENT_COLORS.purple.map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: `rgb(${color.join(',')})` }}
                />
              ))}
            </div>
          </div>
          
          <div className="p-2 border rounded">
            <div className="text-sm font-medium mb-1">Blue</div>
            <div className="flex space-x-1">
              {VIEWPORT_GRADIENT_COLORS.blue.map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: `rgb(${color.join(',')})` }}
                />
              ))}
            </div>
          </div>
          
          <div className="p-2 border rounded">
            <div className="text-sm font-medium mb-1">Sunset</div>
            <div className="flex space-x-1">
              {VIEWPORT_GRADIENT_COLORS.sunset.map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: `rgb(${color.join(',')})` }}
                />
              ))}
            </div>
          </div>
          
          <div className="p-2 border rounded">
            <div className="text-sm font-medium mb-1">Ocean</div>
            <div className="flex space-x-1">
              {VIEWPORT_GRADIENT_COLORS.ocean.map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: `rgb(${color.join(',')})` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 사용법 안내 */}
      <div className="bg-purple-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">사용법:</h4>
        <pre className="text-sm bg-white p-2 rounded overflow-x-auto">
{`// 1. UserMessage에서 자동 적용
const { gradient, ref } = useViewportGradient({
  colors: VIEWPORT_GRADIENT_COLORS.purple,
  scrollContainer: scrollContainerRef.current,
});

// 2. ref를 메시지 컨테이너에 연결
<div ref={ref}>
  <MessageBubble customGradient={gradient} />
</div>

// 3. 뷰포트 위치에 따라 자동으로 그라데이션 적용
// - 화면 상단(0%): 첫 번째 색상
// - 화면 하단(100%): 마지막 색상`}
        </pre>
      </div>

      {/* 성능 최적화 정보 */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">성능 최적화:</h4>
        <ul className="text-sm space-y-1">
          <li>• Intersection Observer로 화면에 보이는 메시지만 계산</li>
          <li>• requestAnimationFrame으로 60fps 유지</li>
          <li>• GPU 가속을 위한 will-change 속성</li>
          <li>• 50px 여유를 두고 미리 계산</li>
        </ul>
      </div>

      {/* 이전 방식과의 차이점 */}
      <div className="bg-red-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">이전 방식과의 차이점:</h4>
        <div className="text-sm space-y-2">
          <div>
            <strong>이전 (전체 스크롤 높이):</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• 전체 스크롤 높이를 100%로 계산</li>
              <li>• 메시지가 쌓일수록 그라데이션 변화가 미미함</li>
              <li>• 모든 메시지가 동일한 색상</li>
            </ul>
          </div>
          <div>
            <strong>현재 (뷰포트 높이):</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• <strong>보이는 구간(뷰포트)만을 100%로 계산</strong></li>
              <li>• <strong>메시지가 아무리 쌓여도 뷰포트 내에서 그라데이션</strong></li>
              <li>• <strong>화면 상단부터 하단까지 자연스러운 색상 변화</strong></li>
            </ul>
          </div>
        </div>
      </div>

      {/* 핵심 개념 */}
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">핵심 개념:</h4>
        <div className="text-sm space-y-2">
          <p>
            <strong>뷰포트(Viewport)</strong>란 현재 화면에 보이는 채팅 영역을 의미합니다.
          </p>
          <ul className="ml-4 mt-1 space-y-1">
            <li>• 스크롤을 해도 뷰포트는 항상 화면 크기만큼 유지</li>
            <li>• 각 메시지는 뷰포트 내 위치에 따라 그라데이션 색상 결정</li>
            <li>• 인스타그램 DM과 동일한 방식</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
