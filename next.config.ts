import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: false,
    env: {
        NEXT_PUBLIC_BASE_URL: 'https://slaythebear.vercel.app',
        NEXT_PUBLIC_ALPHA_VANTAGE_NEWS_API: '581897853a99438cb1364282fbf02644',
        NEXT_PUBLIC_ALPHA_VANTAGE_STOCK_API: '7WF63JCXA8P71C8D',
    }
}

export default nextConfig