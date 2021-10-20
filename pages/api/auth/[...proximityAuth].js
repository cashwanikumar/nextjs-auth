import ProximityAuth from "../../../server";

export default ProximityAuth({
  path: {
    redirectOnLogin: "/",
    redirectOnLogout: "/logout",
  },
});
