// src/setupProxy.js
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    createProxyMiddleware('/springboot', {
      target: 'http://localhost:8080', // Spring Boot 서버 주소
      pathRewrite: {
        '^/springboot': '', // '/springboot' 부분을 제거하고 요청을 전달
      },
      changeOrigin: true, // CORS 문제를 해결하기 위한 옵션
    })
  );
}
