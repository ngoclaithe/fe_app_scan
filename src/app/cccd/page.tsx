import Image from "next/image";
import Link from "next/link";
import { fetchCccds } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function CccdListPage() {
  const items = await fetchCccds();

  return (
    <div className="min-h-screen w-full px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Danh sách CCCD</h1>
          <Link href="/" className="text-sm underline hover:no-underline">Trang chủ</Link>
        </header>

        {items.length === 0 ? (
          <p className="text-sm opacity-70">Không có dữ liệu.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li key={item.id} className="group rounded-lg border border-black/[.08] dark:border-white/[.145] p-4 transition-colors hover:bg-[#f8f8f8] dark:hover:bg-[#0f0f0f]">
                <Link href={`/cccd/${item.id}`} className="block">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-mono opacity-70">{new Date(item.createdAt).toLocaleString()}</span>
                    <span className="text-xs font-medium">Xem chi tiết →</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-black/5 dark:bg-white/10">
                      {item.frontImageUrl ? (
                        <Image
                          src={item.frontImageUrl}
                          alt="Ảnh mặt trước CCCD"
                          fill
                          sizes="(max-width: 768px) 50vw, 200px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs opacity-60">Không có ảnh</div>
                      )}
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-black/5 dark:bg-white/10">
                      {item.backImageUrl ? (
                        <Image
                          src={item.backImageUrl}
                          alt="Ảnh mặt sau CCCD"
                          fill
                          sizes="(max-width: 768px) 50vw, 200px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs opacity-60">Không có ảnh</div>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
