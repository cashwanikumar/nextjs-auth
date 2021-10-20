import crypto from "crypto";
import { serialize } from "cookie";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};

const KEY = "shhhhh";

export default async function signin(req, res, redirectTo: string) {
  const { email, password } = req.body;
  let user = null;
  if (email === "admin@gmail.com" && password === "admin") {
    user = {
      id: 1,
      name: "admin",
      email: "admin@gmail.com",
      role: "admin",
    };
  }
  if (user) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    /* Sign token */
    const authToken = jwt.sign(payload, KEY, {
      expiresIn: 31556926,
    });
    // const authToken = generateAuthToken();

    // // Store authentication token
    // authTokens[authToken] = user;

    // // Setting the auth token in cookies
    res.setHeader(
      "Set-Cookie",
      serialize("authToken", authToken, {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      })
    );
    const response = {
      token: authToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
    if (req.xhr) {
      return res.status(200).json({ status: "success", data: response });
    }
    res.writeHead(302, {
      Location: redirectTo,
    });
    res.end();
  } else {
    if (req.xhr) {
      return res
        .status(402)
        .json({ status: "error", error: "Password incorrect" });
    }
    res.writeHead(302, {
      Location: "/login",
    });
    res.end();
  }
}
