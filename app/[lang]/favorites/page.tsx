export default async function FavoritesPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-8 text-3xl font-bold text-gray-900'>즐겨찾기</h1>

        <div className='rounded-lg border bg-white p-8 text-center shadow-sm'>
          <div className='text-gray-500'>
            <p className='mb-4 text-lg'>즐겨찾기한 병원이 없습니다</p>
            <p className='text-sm'>관심 있는 병원을 즐겨찾기에 추가해보세요</p>
          </div>
        </div>
      </div>
    </div>
  );
}
