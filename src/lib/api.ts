export type CccdItem = {
  id: string;
  frontImageUrl: string | null;
  backImageUrl: string | null;
  cccd: string | null;
  name: string | null;
  hometown: string | null;
  currentAddress: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CccdListResponse = {
  data: CccdItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

const baseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  console.warn("BASE_URL is not defined. Set BASE_URL in your environment.");
}

export async function fetchCccds(): Promise<CccdItem[]> {
  const url = `${baseUrl}/cccd`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch CCCD list: ${res.status}`);
  }
  const json = (await res.json()) as CccdListResponse;
  return json.data || [];
}

export async function fetchCccdDetail(id: string): Promise<CccdItem> {
  const url = `${baseUrl}/cccd/${id}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch CCCD detail: ${res.status}`);
  }
  const json = (await res.json()) as CccdItem;
  return json;
}
