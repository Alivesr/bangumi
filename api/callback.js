import axios from "axios";
import cookie from "cookie";
import { cors, runMiddleware } from "./cors";

export default async function handler(req, res) {
  const { code } = req.query;

  // 运行 CORS 中间件
  await runMiddleware(req, res, cors);

  if (!code) {
    return res.status(400).json({ error: "缺少 code 参数" });
  }

  // Check if code parameter is valid (not expired, etc.)
  if (typeof code !== 'string' || code.length < 10) {
    return res.status(400).json({ error: "无效的 code 参数" });
  }

  try {
    // Log the environment variables for debugging
    console.log("CLIENT_ID:", process.env.CLIENT_ID ? "SET" : "NOT SET");
    console.log("CLIENT_SECRET:", process.env.CLIENT_SECRET ? "SET" : "NOT SET");
    console.log("REDIRECT_URI:", process.env.REDIRECT_URI);
    console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
    console.log("NODE_ENV:", process.env.NODE_ENV);

    const form = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: String(code),
      redirect_uri: process.env.REDIRECT_URI,
    });

    const tokenRes = await axios.post(
      "https://bgm.tv/oauth/access_token",
      form.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    // Check if we got a valid response
    if (!tokenRes.data) {
      throw new Error("Invalid response from OAuth server");
    }

    const { access_token, user_id } = tokenRes.data;

    // Check if we got the required data
    if (!access_token || !user_id) {
      throw new Error("Missing access_token or user_id in OAuth response");
    }

    // 写入 HttpOnly Cookie，有效期 1 小时
    res.setHeader("Set-Cookie", [
      cookie.serialize("token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60, // 1 小时
      }),
      cookie.serialize("user_id", String(user_id), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      }),
    ]);

    // 重定向前端，不带 token
    res.redirect(`${process.env.FRONTEND_URL}/callback-success`);
  } catch (err) {
    console.error("Callback error:", err.response?.data || err.message);
    console.error("Error stack:", err.stack);
    
    // Return a more detailed error response
    res.status(500).json({ 
      error: "Token 获取失败",
      details: err.response?.data || err.message,
      code: err.response?.status
    });
  }
}
