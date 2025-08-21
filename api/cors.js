import Cors from "cors";

// 初始化 CORS 中间件
const cors = Cors({
  origin: ["http://localhost:5173", "https://bangumi-alpha.vercel.app"],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
});

// 封装一个帮助函数，用于在 API Route 调用
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) reject(result);
      else resolve(result);
    });
  });
}

export { cors, runMiddleware };
