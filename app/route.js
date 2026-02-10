export async function GET() {
  const RAW_LUA_URL =
    process.env.RAW_LUA_URL ||
    "https://raw.githubusercontent.com/Clarksds/EscapeTsunami/main/loader.lua";

  const res = await fetch(RAW_LUA_URL, {
    headers: { "User-Agent": "vercel-lua-proxy" },
    next: { revalidate: 60 }, // cache on server for 60s
  });

  if (!res.ok) {
    return new Response(`Failed: ${res.status} ${res.statusText}`, {
      status: 502,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const text = await res.text();

  return new Response(text, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
