'use client';

import { useScrollGradient, INSTAGRAM_GRADIENT_COLORS } from '../hooks/useScrollGradient';

/**
 * 스크롤 그라데이션 효과 사용 예제
 * 개발자가 다른 색상 조합을 테스트할 때 사용
 */
export function ScrollGradientExample() {
  // 다양한 그라데이션 색상 조합 예제
  const purpleGradient = useScrollGradient({
    colors: INSTAGRAM_GRADIENT_COLORS.purple,
    intensity: 0.7,
  });

  const blueGradient = useScrollGradient({
    colors: INSTAGRAM_GRADIENT_COLORS.blue,
    intensity: 0.5,
  });

  const sunsetGradient = useScrollGradient({
    colors: INSTAGRAM_GRADIENT_COLORS.sunset,
    intensity: 0.8,
  });

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">스크롤 그라데이션 예제</h3>
      
      {/* 현재 스크롤 진행률 표시 */}
      <div className="bg-gray-100 p-3 rounded">
        <p>Purple Gradient Progress: {(purpleGradient.scrollProgress * 100).toFixed(1)}%</p>
        <p>Blue Gradient Progress: {(blueGradient.scrollProgress * 100).toFixed(1)}%</p>
        <p>Sunset Gradient Progress: {(sunsetGradient.scrollProgress * 100).toFixed(1)}%</p>
      </div>

      {/* 그라데이션 미리보기 */}
      <div className="space-y-2">
        <div 
          className="h-16 rounded-lg flex items-center justify-center text-white font-semibold"
          style={{ background: purpleGradient.currentGradient }}
        >
          Purple Gradient
        </div>
        
        <div 
          className="h-16 rounded-lg flex items-center justify-center text-white font-semibold"
          style={{ background: blueGradient.currentGradient }}
        >
          Blue Gradient
        </div>
        
        <div 
          className="h-16 rounded-lg flex items-center justify-center text-white font-semibold"
          style={{ background: sunsetGradient.currentGradient }}
        >
          Sunset Gradient
        </div>
      </div>

      {/* 사용법 안내 */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">사용법:</h4>
        <pre className="text-sm bg-white p-2 rounded overflow-x-auto">
{`// 1. 훅 사용
const gradient = useScrollGradient({
  colors: INSTAGRAM_GRADIENT_COLORS.purple,
  intensity: 0.7,
});

// 2. CSS 변수로 자동 적용
// --scroll-gradient 변수가 자동으로 업데이트됨

// 3. 컴포넌트에서 사용
<MessageBubble 
  variant="user" 
  enableScrollGradient={true}
/>`}
        </pre>
      </div>
    </div>
  );
}
