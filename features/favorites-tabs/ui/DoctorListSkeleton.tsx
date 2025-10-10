export function DoctorListSkeleton() {
  return (
    <div className='w-full space-y-4 p-5'>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className='animate-pulse'>
          <div className='rounded-xl border border-white bg-white/50 p-3 shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] backdrop-blur-[6px]'>
            <div className='flex items-start gap-3'>
              {/* 프로필 이미지 스켈레톤 */}
              <div className='h-[100px] w-[100px] rounded-xl bg-gray-200'></div>

              {/* 의료진 정보 스켈레톤 */}
              <div className='flex-1 space-y-2'>
                {/* 이름과 직책 */}
                <div className='h-4 w-3/4 rounded bg-gray-200'></div>

                {/* 병원명 */}
                <div className='h-3 w-1/2 rounded bg-gray-200'></div>

                {/* 진료부위 태그 */}
                <div className='flex gap-2'>
                  <div className='h-6 w-16 rounded-full bg-gray-200'></div>
                  <div className='h-6 w-20 rounded-full bg-gray-200'></div>
                </div>

                {/* 하단 액션 섹션 */}
                <div className='mt-3 flex items-center justify-between'>
                  <div className='h-4 w-20 rounded bg-gray-200'></div>
                  <div className='h-8 w-8 rounded-full bg-gray-200'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
