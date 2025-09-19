import Image from "next/image";
import Link from "next/link";
import { fetchCccdDetail } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function CccdDetailPage(props: Promise<{ params: { id: string } }>) {
  const { params } = await props;
  const { id } = params;
  const item = await fetchCccdDetail(id);

  return (
    <div className="min-h-screen w-full px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Chi tiết CCCD</h1>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/cccd" className="underline hover:no-underline">Quay lại danh sách</Link>
            <Link href="/" className="underline hover:no-underline">Trang chủ</Link>
          </nav>
        </header>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-black/[.08] dark:border-white/[.145] bg-black/5 dark:bg-white/10">
            {item.frontImageUrl ? (
              <Image
                src={item.frontImageUrl}
                alt="Ảnh mặt trước CCCD"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm opacity-60">Không có ảnh mặt trước</div>
            )}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-black/[.08] dark:border-white/[.145] bg-black/5 dark:bg-white/10">
            {item.backImageUrl ? (
              <Image
                src={item.backImageUrl}
                alt="Ảnh mặt sau CCCD"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm opacity-60">Không có ảnh mặt sau</div>
            )}
          </div>
        </section>

        <section className="rounded-lg border border-black/[.08] dark:border-white/[.145] p-4">
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs opacity-70">ID</dt>
              <dd className="text-sm font-mono break-all">{item.id}</dd>
            </div>
            <div>
              <dt className="text-xs opacity-70">CCCD</dt>
              <dd className="text-sm">{item.cccd ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs opacity-70">Họ tên</dt>
              <dd className="text-sm">{item.name ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs opacity-70">Quê quán</dt>
              <dd className="text-sm">{item.hometown ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs opacity-70">Địa chỉ hiện tại</dt>
              <dd className="text-sm">{item.currentAddress ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs opacity-70">Tạo lúc</dt>
              <dd className="text-sm">{new Date(item.createdAt).toLocaleString()}</dd>
            </div>
            <div>
              <dt className="text-xs opacity-70">Cập nhật</dt>
              <dd className="text-sm">{new Date(item.updatedAt).toLocaleString()}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
