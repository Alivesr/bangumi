import axios from "axios";
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

  const { code } = req.query;

  if (!code || typeof code !== "string" || code.length < 10) {
    return res.status(400).json({ error: "无效的 code 参数" });
  }

  try {
    const form = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
      redirect_uri: process.env.REDIRECT_URI,
    });

    const tokenRes = await axios.post(
      "https://bgm.tv/oauth/access_token",
      form.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    const { access_token, user_id } = tokenRes.data;

    if (!access_token || !user_id) {
      throw new Error("OAuth 返回数据不完整");
    }

    // 写入 HttpOnly Cookie，有效期 1 小时
    res.setHeader("Set-Cookie", [
      cookie.serialize("token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      }),
      cookie.serialize("user_id", String(user_id), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      }),
    ]);

    // 重定向前端成功页
    res.redirect("http://localhost:5173/callback-success");
    // res.redirect(`${process.env.FRONTEND_URL}/callback-success`);
  } catch (err) {
    console.error("Callback error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Token 获取失败",
      details: err.response?.data || err.message,
    });
  }
}
