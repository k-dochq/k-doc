/**
 * Prisma(DB) 기준으로 public/sitemap_*.xml 및 sitemap.xml 을 재생성합니다.
 * 실행: DATABASE_URL 이 설정된 상태에서 `pnpm generate:sitemaps`
 */
import { createWriteStream, existsSync, readFileSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const BASE_URL = 'https://www.k-doc.kr';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

/** sitemap 파일명 접미사 → URL 경로 로케일 */
const LOCALE_FILES: { fileSuffix: string; pathLocale: string }[] = [
  { fileSuffix: 'en', pathLocale: 'en' },
  { fileSuffix: 'th', pathLocale: 'th' },
  { fileSuffix: 'ja', pathLocale: 'ja' },
  { fileSuffix: 'zh-Hant', pathLocale: 'zh-Hant' },
  { fileSuffix: 'hi', pathLocale: 'hi' },
  { fileSuffix: 'tl', pathLocale: 'tl' },
  { fileSuffix: 'ar', pathLocale: 'ar' },
  { fileSuffix: 'ru', pathLocale: 'ru' },
];

const HOSPITAL_LIST_CATEGORIES = [
  'EYES',
  'NOSE',
  'LIFTING',
  'FACIAL_CONTOURING',
  'BREAST',
  'LIPOSUCTION',
  'HAIR_TRANSPLANT',
  'STEM_CELL',
  'DERMATOLOGY',
] as const;

function loadDotEnv() {
  for (const name of ['.env.local', '.env']) {
    const p = path.join(process.cwd(), name);
    if (!existsSync(p)) continue;
    const lines = readFileSync(p, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function urlEntry(loc: string, priority: string, lastmodIso: string): string {
  return `<url>
  <loc>${escapeXml(loc)}</loc>
  <lastmod>${lastmodIso}</lastmod>
  <priority>${priority}</priority>
</url>`;
}

function writeUrlsetStream(
  outPath: string,
  urls: { loc: string; priority: string }[],
  lastmodIso: string,
) {
  return new Promise<void>((resolve, reject) => {
    const stream = createWriteStream(outPath, { encoding: 'utf8' });
    stream.on('error', reject);
    stream.write(`<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`);
    for (const { loc, priority } of urls) {
      stream.write(`\n${urlEntry(loc, priority, lastmodIso)}\n`);
    }
    stream.write('</urlset>\n');
    stream.end(() => resolve());
  });
}

async function main() {
  loadDotEnv();
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL 이 없습니다. .env 또는 .env.local 을 확인하세요.');
    process.exit(1);
  }

  const prisma = new PrismaClient();
  const lastmodIso = new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00');

  const approvedHospitals = await prisma.hospital.findMany({
    where: {
      approvalStatusType: 'APPROVED',
      OR: [{ isActive: null }, { isActive: true }],
    },
    select: { id: true },
    orderBy: { id: 'asc' },
  });
  const hospitalIds = approvedHospitals.map((h) => h.id);

  const doctors = await prisma.doctor.findMany({
    where: {
      hospitalId: { in: hospitalIds },
      approvalStatusType: 'APPROVED',
      stop: false,
    },
    select: { id: true },
    orderBy: { id: 'asc' },
  });

  const reviews = await prisma.review.findMany({
    where: {
      hospitalId: { in: hospitalIds },
      OR: [{ isActive: null }, { isActive: true }],
    },
    select: { id: true },
    orderBy: { id: 'asc' },
  });

  const notices = await prisma.notice.findMany({
    where: { isActive: true },
    select: { id: true },
    orderBy: { createdAt: 'desc' },
  });

  const tips = await prisma.insightArticle.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true },
    orderBy: { slug: 'asc' },
  });

  console.log(
    `DB: hospitals=${hospitalIds.length}, doctors=${doctors.length}, reviews=${reviews.length}, notices=${notices.length}, tips=${tips.length}`,
  );

  for (const { fileSuffix, pathLocale } of LOCALE_FILES) {
    const urls: { loc: string; priority: string }[] = [];

    const p = (suffix: string) => `${BASE_URL}/${pathLocale}${suffix}`;

    urls.push({ loc: p('/main'), priority: '1.00' });
    urls.push({ loc: p('/hospitals'), priority: '0.80' });
    for (const c of HOSPITAL_LIST_CATEGORIES) {
      urls.push({ loc: `${p('/hospitals')}?category=${c}`, priority: '0.80' });
    }
    urls.push({ loc: p('/reviews'), priority: '0.80' });
    urls.push({ loc: p('/tips'), priority: '0.80' });
    urls.push({ loc: p('/about'), priority: '0.80' });
    urls.push({ loc: p('/contact'), priority: '0.80' });

    urls.push({ loc: p('/notices'), priority: '0.70' });
    for (const n of notices) {
      urls.push({ loc: p(`/notices/${n.id}`), priority: '0.70' });
    }

    for (const slug of tips.map((t) => t.slug)) {
      urls.push({ loc: p(`/tip/${slug}`), priority: '0.80' });
    }

    for (const id of hospitalIds) {
      urls.push({ loc: p(`/hospital/${id}`), priority: '0.80' });
      urls.push({ loc: p(`/hospital/${id}/reviews`), priority: '0.85' });
    }

    for (const d of doctors) {
      urls.push({ loc: p(`/doctor/${d.id}`), priority: '0.75' });
    }

    for (const r of reviews) {
      urls.push({ loc: p(`/review/${r.id}`), priority: '0.65' });
    }

    const outName = `sitemap_${fileSuffix}.xml`;
    const outPath = path.join(PUBLIC_DIR, outName);
    await writeUrlsetStream(outPath, urls, lastmodIso);
    console.log(`Wrote ${outName} (${urls.length} urls)`);
  }

  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${LOCALE_FILES.map(
  ({ fileSuffix }) => `  <sitemap>
    <loc>${BASE_URL}/sitemap_${fileSuffix}.xml</loc>
    <lastmod>${lastmodIso}</lastmod>
  </sitemap>`,
).join('\n')}
</sitemapindex>
`;
  await writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), indexXml, 'utf8');
  console.log('Wrote sitemap.xml (index)');

  await mkdir(path.join(PUBLIC_DIR, 'en'), { recursive: true });
  await mkdir(path.join(PUBLIC_DIR, 'th'), { recursive: true });
  await writeFile(path.join(PUBLIC_DIR, 'en', 'sitemap_en.xml'), readFileSync(path.join(PUBLIC_DIR, 'sitemap_en.xml'), 'utf8'), 'utf8');
  await writeFile(path.join(PUBLIC_DIR, 'th', 'sitemap_th.xml'), readFileSync(path.join(PUBLIC_DIR, 'sitemap_th.xml'), 'utf8'), 'utf8');
  console.log('Synced public/en/sitemap_en.xml, public/th/sitemap_th.xml');

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
