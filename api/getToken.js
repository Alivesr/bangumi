import cookie from "cookie";

export default async function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || "");

  const token = cookies.token;
  const user_id = cookies.user_id;

  if (!token) return res.status(401).json({ error: "未登录" });

  res.status(200).json({ access_token: token, user_id });
}
