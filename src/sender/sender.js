export const sendToken = (res, user, message) => {
  try {
    const token = user.getAuthToken();

    const content = {
      accessToken: token,
      customer: {
        user_name: user.user_name,
        email: user.email,
      },
    };
    return res
      .status(200)
      .json({ success: true, title: "Success", message, content });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
