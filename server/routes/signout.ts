import { serialize } from "cookie";

export default async function signout(req, res, redirectTo: string) {
  // res.clearCookie("authToken");
  res.setHeader(
    "Set-Cookie",
    serialize("authToken", "", {
      path: "/",
      httpOnly: true,
      maxAge: 0,
    })
  );
  if (req.xhr) {
    return res.status(200).json({ status: "success" });
  }
  res.writeHead(302, {
    Location: redirectTo,
  });
  res.end();
}
