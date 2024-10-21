import {axios_Without_Token} from "../services/axios/axios_Without_Token"

export async function ChangePasswordAPI  (creds) {
  try {
    const { data, response } = await axios_Without_Token({
      endpoint: 'admin/reset-password',
      method: "PUT",
      bodyData: creds,
    });
    console.log(data)
    return {data, response};
  } catch (err) {
    console.log(response)
    throw err;
  }

// console.log(data)
}


export default ChangePasswordAPI