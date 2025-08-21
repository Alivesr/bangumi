import cookie from "cookie";
import { cors, runMiddleware } from "./cors";

export default async function handler(req, res) {
  // 运行 CORS 中间件
  await runMiddleware(req, res, cors);

  const cookies = cookie.parse(req.headers.cookie || "");

  const token = cookies.token;
  const user_id = cookies.user_id;

  if (!token) {
    res.status(401).json({ error: "未登录" });
    return;
  }

  // Set proper headers for CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  
  res.status(200).json({ access_token: token, user_id });
}
