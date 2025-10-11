'use client';

import { useMessageGradient, MESSAGE_GRADIENT_COLORS } from '../hooks/useMessageGradient';

/**
 * Y축 기반 개별 메시지 그라데이션 효과 예제
 * 각 메시지가 화면 내 위치에 따라 개별적으로 그라데이션 적용
 */
export function YAxisGradientExample() {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Y축 기반 개별 메시지 그라데이션 예제</h3>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">동작 방식:</h4>
        <ul className="text-sm space-y-1">
          <li>• 각 메시지가 화면 내 Y축 위치에 따라 개별적으로 그라데이션 적용</li>
          <li>• 화면 상단에 가까울수록 첫 번째 색상, 하단에 가까울수록 마지막 색상</li>
          <li>• 180도 Y축 그라데이션 (위에서 아래로)</li>
          <li>• Intersection Observer로 성능 최적화</li>
          <li>• 스크롤 시 실시간으로 그라데이션 변화</li>
        </ul>
      </div>

      {/* 색상 프리셋 예제 */}
      <div className="space-y-2">
        <h4 className="font-semibold">사용 가능한 색상 프리셋:</h4>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 border rounded">
            <div className="text-sm font-medium mb-1">Purple (기본)</div>
            <div className="flex space-x-1">
              {MESSAGE_GRADIENT_COLORS.purple.map((color, index) => (
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
              {MESSAGE_GRADIENT_COLORS.blue.map((color, index) => (
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
              {MESSAGE_GRADIENT_COLORS.sunset.map((color, index) => (
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
              {MESSAGE_GRADIENT_COLORS.ocean.map((color, index) => (
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
{`// 1. UserMessage 컴포넌트에서 자동 적용
<UserMessage 
  message={message} 
  enableScrollGradient={true}
  scrollContainer={scrollContainerRef.current}
/>

// 2. 개별 메시지에 Y축 기반 그라데이션 적용
const { gradient, ref } = useMessageGradient({
  colors: MESSAGE_GRADIENT_COLORS.purple,
  scrollContainer,
  intensity: 0.8,
  range: 1.0,
});

// 3. MessageBubble에 커스텀 그라데이션 전달
<MessageBubble 
  variant="user" 
  enableScrollGradient={true}
  customGradient={gradient}
/>`}
        </pre>
      </div>

      {/* 성능 최적화 정보 */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">성능 최적화:</h4>
        <ul className="text-sm space-y-1">
          <li>• Intersection Observer로 화면에 보이는 메시지만 계산</li>
          <li>• 50px 여유를 두고 미리 계산하여 부드러운 전환</li>
          <li>• GPU 가속을 위한 will-change 속성 적용</li>
          <li>• requestAnimationFrame으로 60fps 유지</li>
        </ul>
      </div>
    </div>
  );
}
