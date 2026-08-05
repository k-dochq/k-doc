import 'server-only';

import { readFile } from 'node:fs/promises';

export interface ImageSize {
  width: number;
  height: number;
}

/**
 * 이미지 파일 헤더에서 크기만 읽는다. 픽셀은 디코딩하지 않는다.
 *
 * 왜 필요한가
 *   img 에 width/height 를 주지 않으면 로드 전 높이가 0이라, 이미지가 하나씩 도착할 때마다
 *   아래 내용이 밀려 내려간다(레이아웃 시프트). 그렇다고 크기를 코드에 손으로 적어두면
 *   이미지를 교체할 때 같이 고쳐야 하고, 안 고치면 조용히 어긋난다.
 *   → 파일에서 직접 읽어 그 문제를 없앤다.
 *
 * 헤더 앞부분(64바이트)만 읽으므로 파일 크기와 무관하게 비용이 일정하다.
 */
export async function readImageSize(absolutePath: string): Promise<ImageSize> {
  const buf = await readFile(absolutePath);
  const size = parseWebp(buf) ?? parsePng(buf) ?? parseJpeg(buf);
  if (!size) throw new Error(`이미지 크기를 읽지 못했다: ${absolutePath}`);
  return size;
}

/**
 * WebP — RIFF 컨테이너. 인코딩 방식에 따라 청크가 셋으로 갈리고 크기 위치도 다르다.
 *   VP8   손실     프레임 헤더에 14비트씩
 *   VP8L  무손실   비트 단위로 촘촘히 packing (각 14비트, -1 저장)
 *   VP8X  확장     캔버스 크기를 24비트 LE 로 (-1 저장)
 */
function parseWebp(b: Buffer): ImageSize | null {
  if (b.length < 30) return null;
  if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return null;

  const chunk = b.toString('ascii', 12, 16);

  if (chunk === 'VP8 ') {
    return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
  }
  if (chunk === 'VP8L') {
    const bits = b.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === 'VP8X') {
    const read24 = (o: number) => b[o] | (b[o + 1] << 8) | (b[o + 2] << 16);
    return { width: read24(24) + 1, height: read24(27) + 1 };
  }
  return null;
}

function parsePng(b: Buffer): ImageSize | null {
  if (b.length < 24 || b.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}

/** JPEG — SOF 마커를 만날 때까지 세그먼트를 건너뛴다 */
function parseJpeg(b: Buffer): ImageSize | null {
  if (b.length < 4 || b.readUInt16BE(0) !== 0xffd8) return null;
  let o = 2;
  while (o + 9 < b.length) {
    if (b[o] !== 0xff) return null;
    const marker = b[o + 1];
    // SOF0~SOF15 중 DHT(c4)·JPG(c8)·DAC(cc) 는 크기 정보가 아니다
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: b.readUInt16BE(o + 5), width: b.readUInt16BE(o + 7) };
    }
    o += 2 + b.readUInt16BE(o + 2);
  }
  return null;
}
