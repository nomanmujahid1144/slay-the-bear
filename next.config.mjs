/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
      // baseURL: 'http://localhost:3000',
      baseURL: 'https://slaythebear.vercel.app',
      alphaVantageNewsApi: '581897853a99438cb1364282fbf02644',
      alphaVantageStockApi: '7WF63JCXA8P71C8D',
    }
  };
  
  export default nextConfig;
  