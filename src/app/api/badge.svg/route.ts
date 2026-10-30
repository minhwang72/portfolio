import { getStatus } from '../../lib/status';

export const dynamic = 'force-dynamic';

/** GitHub 프로필 README 용 상태 배지 SVG — shields 를 거치지 않아 GitHub 이미지 프록시 시간 초과가 없음 */
export async function GET() {
  const { services } = await getStatus({ wait: false });
  const up = services.filter((s) => s.up).length;
  const color = up === services.length ? '#2EA043' : up > 0 ? '#D29922' : '#CF222E';
  const label = 'SERVICES';
  const msg = `${up}/${services.length} UP`;
  // shields for-the-badge 모양을 흉내낸 고정 폭 배지(글자 수가 거의 안 바뀜)
  const lw = 92;
  const mw = 74;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${lw + mw}" height="28" role="img" aria-label="${label}: ${msg}">
<title>${label}: ${msg}</title>
<rect width="${lw}" height="28" fill="#555"/><rect x="${lw}" width="${mw}" height="28" fill="${color}"/>
<g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="10" letter-spacing="1">
<text x="${lw / 2}" y="17.5">${label}</text><text x="${lw + mw / 2}" y="17.5" font-weight="bold">${msg}</text>
</g></svg>`;
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
  });
}
