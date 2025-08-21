import axios from "axios";
import cookie from "cookie";

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "缺少 code 参数" });
  }

  try {
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

    const { access_token, user_id } = tokenRes.data;

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
    // res.redirect(`${process.env.FRONTEND_URL}/callback-success`);
    res.redirect("http://localhost:5173/callback-success");
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Token 获取失败" });
  }
}
