import jwt from "jsonwebtoken";

const generateRessetToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

export default generateRessetToken;
