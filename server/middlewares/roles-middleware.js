const ROLES = {
  ADMIN: "ADMIN",
  COMMUNITY_MANAGER: "COMMUNITY MANAGER",
  MANAGER: "MANAGER",
  DESIGNER: "DESIGNER",
};

const inRole =
  (...roles) =>
  (req, res, next) => {
    const role = roles.some((role) => req.user.roles.includes(role));
    if (!role) {
      return res.status(403).json();
    }
    next();
    return {
      inRole,
      ROLES,
    };
  };
