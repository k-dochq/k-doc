'use client';

import { useGlobalScrollGradient, GLOBAL_GRADIENT_COLORS } from '../hooks/useGlobalScrollGradient';

/**
 * 전체 브라우저 높이 기반 연속 그라데이션 효과 예제
 * 전체 스크롤 컨테이너의 높이를 100%로 하여 자연스럽게 이어지는 그라데이션
 */
export function GlobalScrollGradientExample() {
  const { gradient, scrollProgress } = useGlobalScrollGradient({
    colors: GLOBAL_GRADIENT_COLORS.purple,
    intensity: 1.0,
  });

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">전체 스크롤 기반 연속 그라데이션 예제</h3>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">동작 방식:</h4>
        <ul className="text-sm space-y-1">
          <li>• 전체 브라우저 높이를 100%로 하여 연속적인 그라데이션</li>
          <li>• 스크롤 위치에 따라 모든 메시지가 동일한 그라데이션 적용</li>
          <li>• 자연스럽게 이어지는 긴 그라데이션 효과</li>
          <li>• 180도 Y축 방향 (위에서 아래로)</li>
          <li>• requestAnimationFrame으로 성능 최적화</li>
        </ul>
      </div>

      {/* 현재 스크롤 진행률 표시 */}
      <div className="bg-gray-100 p-3 rounded">
        <p className="text-sm">전체 스크롤 진행률: {(scrollProgress * 100).toFixed(1)}%</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-100"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* 현재 그라데이션 미리보기 */}
      <div className="space-y-2">
        <h4 className="font-semibold">현재 적용된 그라데이션:</h4>
        <div 
          className="h-16 rounded-lg flex items-center justify-center text-white font-semibold"
          style={{ background: gradient }}
        >
          현재 그라데이션 색상
        </div>
      </div>

      {/* 색상 프리셋 예제 */}
      <div className="space-y-2">
        <h4 className="font-semibold">사용 가능한 색상 프리셋:</h4>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 border rounded">
            <div className="text-sm font-medium mb-1">Purple (기본)</div>
            <div className="flex space-x-1">
              {GLOBAL_GRADIENT_COLORS.purple.map((color, index) => (
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
              {GLOBAL_GRADIENT_COLORS.blue.map((color, index) => (
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
              {GLOBAL_GRADIENT_COLORS.sunset.map((color, index) => (
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
              {GLOBAL_GRADIENT_COLORS.ocean.map((color, index) => (
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
      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">사용법:</h4>
        <pre className="text-sm bg-white p-2 rounded overflow-x-auto">
{`// 1. MessageListContent에서 자동 적용
useGlobalScrollGradient({
  colors: GLOBAL_GRADIENT_COLORS.purple,
  scrollContainer: scrollContainerRef.current,
  intensity: 1.0,
});

// 2. CSS 변수로 자동 적용
// --global-scroll-gradient 변수가 자동으로 업데이트됨

// 3. MessageBubble에서 사용
<MessageBubble 
  variant="user" 
  enableScrollGradient={true}
/>`}
        </pre>
      </div>

      {/* 성능 최적화 정보 */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">성능 최적화:</h4>
        <ul className="text-sm space-y-1">
          <li>• requestAnimationFrame으로 60fps 유지</li>
          <li>• CSS Custom Properties로 GPU 가속</li>
          <li>• 16ms 간격으로 업데이트 제한</li>
          <li>• 리사이즈 이벤트 감지로 높이 변경 대응</li>
        </ul>
      </div>

      {/* 이전 방식과의 차이점 */}
      <div className="bg-red-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">이전 방식과의 차이점:</h4>
        <div className="text-sm space-y-2">
          <div>
            <strong>이전 (메시지별 개별):</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• 각 메시지가 화면 내 위치에 따라 개별 그라데이션</li>
              <li>• 메시지마다 다른 색상</li>
              <li>• Intersection Observer 사용</li>
            </ul>
          </div>
          <div>
            <strong>현재 (전체 연속):</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• 전체 스크롤 높이를 기준으로 연속 그라데이션</li>
              <li>• 모든 메시지가 동일한 그라데이션</li>
              <li>• 자연스럽게 이어지는 긴 그라데이션</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
