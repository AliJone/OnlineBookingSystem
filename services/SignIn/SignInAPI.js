import { axios_Without_Token } from "../services/axios/axios_Without_Token";

export async function SignInAPI({ values }) {
  try {
    console.log("values" , values)
    const { data, response } = await axios_Without_Token({
      endpoint: "admin/login",
      method: "POST",
      bodyData: values
    });
    // console.log(data)
    return { data, response }
  } catch (err) {
    throw err;
  }
}

export default SignInAPI



