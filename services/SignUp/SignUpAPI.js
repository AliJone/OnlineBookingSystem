import axiosApi from "../axios_config";

export async function SignUpAPI  (creds) {
  try {
    const { data, response } = await axiosApi({
      endpoint: 'admin/signup',
      method: "POST",
      bodyData: creds,
    });
    console.log(data)
    return {data, response};
  } catch (err) {
    throw err;
  }

// console.log(data)
}


export default SignUpAPI