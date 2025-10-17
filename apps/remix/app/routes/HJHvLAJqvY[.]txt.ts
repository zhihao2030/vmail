import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  // 记录微信验证请求的访问信息
  const url = new URL(request.url);
  const userAgent = request.headers.get("User-Agent");
  const referer = request.headers.get("Referer");

  // 在 Vercel 上获取真实IP的方法（优先级：x-vercel-forwarded-for > x-forwarded-for > x-real-ip）
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const vercelIP = request.headers.get("x-vercel-forwarded-for");
  const clientIP = vercelIP || (forwarded ? forwarded.split(',')[0] : realIP) || 'unknown';

  // 获取其他有用的请求头信息
  const acceptLanguage = request.headers.get("Accept-Language");
  const accept = request.headers.get("Accept");
  const connection = request.headers.get("Connection");

  console.log('=== 微信域名验证访问日志 ===');
  console.log('访问时间:', new Date().toISOString());
  console.log('请求路径:', url.pathname);
  console.log('完整URL:', url.href);
  console.log('微信验证服务IP:', clientIP);
  console.log('User-Agent:', userAgent);
  console.log('Referer:', referer);
  console.log('Accept-Language:', acceptLanguage);
  console.log('Accept:', accept);
  console.log('Connection:', connection);
  console.log('--- 所有请求头 ---');
  console.log(JSON.stringify(Object.fromEntries(request.headers.entries()), null, 2));
  console.log('========================');

  // 返回微信验证文件内容
  // 注意：你需要从微信公众平台获取具体的验证文件内容
  const verificationContent = "e44a1a61524f27e8f4a0ef1dfc91f74a"; // 这里应该是微信提供的验证内容

  return new Response(verificationContent, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600", // 缓存1小时
    },
  });
};
