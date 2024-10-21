import {axios_Without_Token} from "../services/axios/axios_Without_Token"

export async function ForgetPasswordAPI  (cred) {
  try {
    console.log("In Axiosss", cred)
    const { data, response } = await axios_Without_Token({
      endpoint: "admin/forget-password",
      method: "POST",
      bodyData: cred
    });
    console.log(data)
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export default ForgetPasswordAPI



