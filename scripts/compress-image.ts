import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// 압축하려는 이미지 경로
const inputPath = './public/images/shared/default_thumbnail.jpg';
// 저장될 파일명 (압축된 버전)
const outputPath = './public/images/shared/default_thumbnail_optimized.jpg';

async function compressImage() {
  try {
    // 입력 파일이 존재하는지 확인
    if (!fs.existsSync(inputPath)) {
      console.error('❌ 입력 파일을 찾을 수 없습니다:', inputPath);
      return;
    }

    // 원본 이미지 정보 확인
    const originalStats = fs.statSync(inputPath);
    const originalSize = (originalStats.size / 1024).toFixed(2);
    console.log('📁 원본 파일 크기:', originalSize, 'KB');

    // 이미지 압축 실행
    await sharp(inputPath)
      .resize({
        width: 400,
        height: 400,
        fit: 'inside', // 비율 유지하면서 크기 조정
        withoutEnlargement: true, // 원본보다 크게 만들지 않음
      })
      .jpeg({
        quality: 85, // JPEG 품질 (0-100)
        progressive: true, // 점진적 로딩
        mozjpeg: true, // mozjpeg 엔진 사용 (더 나은 압축)
      })
      .toFile(outputPath);

    // 압축된 파일 크기 확인
    const compressedStats = fs.statSync(outputPath);
    const compressedSize = (compressedStats.size / 1024).toFixed(2);
    const compressionRatio = ((1 - compressedStats.size / originalStats.size) * 100).toFixed(1);

    console.log('✅ 압축 완료!');
    console.log('📁 압축된 파일 크기:', compressedSize, 'KB');
    console.log('📊 압축률:', compressionRatio + '%');
    console.log('💾 저장 위치:', outputPath);
  } catch (error) {
    console.error('❌ 이미지 압축 중 오류 발생:', error);
  }
}

// 스크립트 실행
compressImage();
