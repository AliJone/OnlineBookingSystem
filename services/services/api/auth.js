import { axios_Without_Token } from "../axios/axios_Without_Token";

export async function signup(credentials) {
  try {
    const { data, response } = await axios_Without_Token({
      endpoint: `merchant/signup`,
      method: "POST",
      bodyData: credentials,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function otp(otp) {
  try {
    const { data, response } = await axios_Without_Token({
      endpoint: `merchant/email-verification`,
      method: "POST",
      bodyData: otp,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function resendOtp(userId) {
  try {
    const { data, response } = await axios_Without_Token({
      endpoint: `merchant/resend-otp?userId=${userId}`,
      bodyData: null,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function login(credentials) {
  try {
    const { data, response } = await axios_Without_Token({
      endpoint: `merchant/login`,
      method: "POST",
      bodyData: credentials,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function forgetPassword(email) {
  try {
    const { data, response } = await axios_Without_Token({
      endpoint: `merchant/forget-password`,
      method: "POST",
      bodyData: email,
    });

    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function resetPassword(updatedPassword) {
  try {
    const { data, response } = await axios_Without_Token({
      endpoint: `merchant/reset-password`,
      method: "PUT",
      bodyData: updatedPassword,
    });

    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function kycForm(kycData) {
  try {
    const { data, response } = await axios_Without_Token({
      endpoint: `merchant/kyc-form`,
      method: "POST",
      bodyData: kycData,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function logout() {
  try {
    const { data, response } = await axios_Without_Token({
      endpoint: `merchant/logout`,
      bodyData: null,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function getUserInfo(email) {
  try {
    const { data, response } = await axios_Without_Token({
      endpoint: `merchant/me?email=${email}`,
      bodyData: null,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function getStripeOnBoardingLinkAndSubmitKYCDetails(
  accountId,
  formData
) {
  try {
    const { data, response } = await axios_Without_Token({
      endpoint: `merchant/stripe-onboarding-link?accountId=${accountId}`,
      method: "POST",
      bodyData: formData,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function updatedkycForm(kycData) {
  try {
    const { data, response } = await axios_Without_Token({
      endpoint: `merchant/kyc-form`,
      method: "PATCH",
      bodyData: kycData,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function updatePassword(passwordData) {
  try {
    const { data, response } = await axios_Without_Token({
      endpoint: `merchant/updatePassword`,
      method: "PATCH",
      bodyData: passwordData,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function updateMerchant(merchantData) {
  try {
    const { data, response } = await axios_Without_Token({
      endpoint: `merchant/updateMerchant`,
      method: "PATCH",
      bodyData: merchantData,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}


