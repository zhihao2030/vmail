import { LoaderFunction } from "@remix-run/node";

const getClientIP = (request: Request): string => {
  // Cloudflare 提供的真实客户端 IP（最准确）
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  
  // 其他代理头作为备选
  const xForwardedFor = request.headers.get("x-forwarded-for");
  const xRealIP = request.headers.get("x-real-ip");
  const vercelIP = request.headers.get("x-vercel-forwarded-for");
  
  if (cfConnectingIP) return cfConnectingIP;
  if (xForwardedFor) return xForwardedFor.split(',')[0].trim();
  if (xRealIP) return xRealIP;
  if (vercelIP) return vercelIP;
  
  return 'unknown';
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const userAgent = request.headers.get("User-Agent");
  const referer = request.headers.get("Referer");
  
  // 获取真实的客户端 IP
  const clientIP = getClientIP(request);
  
  // 记录所有相关的 IP 信息用于调试
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  const xForwardedFor = request.headers.get("x-forwarded-for");
  const xRealIP = request.headers.get("x-real-ip");
  const vercelIP = request.headers.get("x-vercel-forwarded-for");
  
  console.log('=== 微信域名验证访问日志 ===');
  console.log('访问时间:', new Date().toISOString());
  console.log('请求路径:', url.pathname);
  console.log('真实客户端IP:', clientIP);
  console.log('--- IP 调试信息 ---');
  console.log('cf-connecting-ip:', cfConnectingIP);
  console.log('x-forwarded-for:', xForwardedFor);
  console.log('x-real-ip:', xRealIP);
  console.log('x-vercel-forwarded-for:', vercelIP);
  console.log('User-Agent:', userAgent);
  console.log('Referer:', referer);
  console.log('--- 所有请求头 ---');
  console.log(JSON.stringify(Object.fromEntries(request.headers.entries()), null, 2));
  console.log('========================');

  const verificationContent = "e44a1a61524f27e8f4a0ef1dfc91f74a";
  
  return new Response(verificationContent, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
};