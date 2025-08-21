import cookie from "cookie";
import Cors from "cors";

// 初始化 CORS
const cors = Cors({
  origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
  credentials: true,
});

// 封装函数在 Serverless 中运行中间件
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) reject(result);
      else resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.token;
  const user_id = cookies.user_id;

  if (!token || !user_id) {
    return res.status(401).json({ error: "未登录或 Cookie 失效" });
  }

  res.status(200).json({ access_token: token, user_id });
}
