import { getStatus } from '../../lib/status';

export const dynamic = 'force-dynamic';

/** shields.io endpoint 배지(GitHub 프로필 README 용) — 운영 중 서비스 수 */
export async function GET() {
  const { services } = await getStatus();
  const up = services.filter((s) => s.up).length;
  return Response.json(
    {
      schemaVersion: 1,
      label: 'services',
      message: `${up}/${services.length} up`,
      color: up === services.length ? '34D399' : up > 0 ? 'FBBF24' : 'F87171',
    },
    { headers: { 'Cache-Control': 'public, max-age=300' } }
  );
}
