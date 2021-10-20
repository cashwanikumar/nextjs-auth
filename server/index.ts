import { ProximityAuthOption } from "../types";
import * as routes from "./routes";

const defaultOptions: ProximityAuthOption = {
  path: {
    redirectOnLogin: "/",
    redirectOnLogout: "/login",
  },
};

const getLoginSuccessPath = (option: Pick<ProximityAuthOption, "path">) =>
  option.path?.redirectOnLogin || defaultOptions.path.redirectOnLogin;

const getLogoutSuccessPath = (option: Pick<ProximityAuthOption, "path">) =>
  option.path?.redirectOnLogout || defaultOptions.path.redirectOnLogout;

async function ProximityAuthHandler(req, res, options) {
  return new Promise(async () => {
    if (!req.query.proximityAuth) {
      const error =
        "Cannot find [...proximityAuth].js in pages/api/auth. Make sure the filename is written correctly.";

      return res.status(500).end(`Error: ${error}`);
    }

    const { proximityAuth, action = proximityAuth[0] } = req.query;

    if (req.method === "POST") {
      switch (action) {
        case "signin":
          return routes.signin(req, res, getLoginSuccessPath(options.path));

        case "signout":
          return routes.signout(req, res, getLogoutSuccessPath(options.path));

        default:
      }
    }
    return res
      .status(400)
      .end(`Error: HTTP ${req.method} is not supported for ${req.url}`);
  });
}

export default function ProximityAuth(options: ProximityAuthOption) {
  return (req, res) => ProximityAuthHandler(req, res, options);
}
