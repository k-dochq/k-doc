import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// 이미지 압축 설정 (퀄리티 유지)
const images = [
  {
    input: './notice.png',
    output: './public/images/main/notice.png',
    name: 'Notice 아이콘 이미지',
  },
];

async function compressImage(inputPath: string, outputPath: string, imageName: string) {
  try {
    // 입력 파일이 존재하는지 확인
    if (!fs.existsSync(inputPath)) {
      console.error(`❌ ${imageName} 입력 파일을 찾을 수 없습니다:`, inputPath);
      return;
    }

    // 출력 디렉토리 생성
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 원본 이미지 정보 확인
    const originalStats = fs.statSync(inputPath);
    const originalSize = (originalStats.size / 1024).toFixed(2);
    console.log(`📁 ${imageName} 원본 파일 크기:`, originalSize, 'KB');

    // 이미지 압축 실행 (퀄리티 유지하면서 적당히 압축)
    await sharp(inputPath)
      .resize({
        width: 154, // Notice 아이콘 크기 (HeartBackground와 동일)
        height: 123,
        fit: 'inside', // 비율 유지하면서 크기 조정
        withoutEnlargement: true, // 원본보다 크게 만들지 않음
      })
      .png({
        quality: 85, // PNG 품질을 높게 유지
        compressionLevel: 6, // PNG 압축 레벨을 중간으로 설정
        progressive: true, // 점진적 로딩
      })
      .toFile(outputPath);

    // 압축된 파일 크기 확인
    const compressedStats = fs.statSync(outputPath);
    const compressedSize = (compressedStats.size / 1024).toFixed(2);
    const compressionRatio = ((1 - compressedStats.size / originalStats.size) * 100).toFixed(1);

    console.log(`✅ ${imageName} 압축 완료!`);
    console.log(`📁 압축된 파일 크기:`, compressedSize, 'KB');
    console.log(`📊 압축률:`, compressionRatio + '%');
    console.log(`💾 저장 위치:`, outputPath);
    console.log('---');
  } catch (error) {
    console.error(`❌ ${imageName} 이미지 압축 중 오류 발생:`, error);
  }
}

async function compressAllImages() {
  console.log('🚀 Notice 이미지 압축 시작...\n');

  for (const image of images) {
    await compressImage(image.input, image.output, image.name);
  }

  console.log('🎉 모든 이미지 압축 완료!');
}

// 스크립트 실행
compressAllImages();
