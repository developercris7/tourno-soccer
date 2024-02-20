const User = require("../models/users");
const sendEmail = require("./sendMail");
const bcrypt = require("bcrypt");

const createResetToken = async (email) => {
  const verificationCode = generateResetToken();
  const verificationCodeExpiration = Date.now() + 3600000;
  await User.findOneAndUpdate(
    { email: email },
    {
      resetToken: verificationCode,
      resetTokenExpiration: verificationCodeExpiration,
    },
    { new: true }
  );

  const subject = "Verification for password reset";
  const content = `<p>Your verification code is</p> <h1>${verificationCode}</h1>`;

  await sendEmail(email, subject, content);
};

const generateResetToken = () => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return code;
};

const updateNewPassword = async (email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await User.findOneAndUpdate(
    { email: email },
    { password: hashedPassword },
    { new: true }
  );
};

module.exports = { createResetToken, updateNewPassword };
