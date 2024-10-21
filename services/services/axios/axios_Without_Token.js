import axios from "axios";
import { API_URL } from "./API_URL";

export async function axios_Without_Token({
  endpoint,
  method,
  bodyData,
  contentType = null,
}) {
  try {
    const result = await axios.request({
      url: `${API_URL}/${endpoint}`,
      method,
      ...(method !== "DELETE" && {
        data:
          method === "PUT" || method === "POST" || method === "PATCH"
            ? bodyData
            : null,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": contentType ? contentType : "application/json",
      },
    });

    const { data, ...response } = result;
    return { data, response };
  } catch (error) {
    const { response, request, message } = error;
    if (response.status === 403) {
      window.location.href = "/auth/login";
      // Cookies.remove('userInfo');
    } else if (error.request) {
      console.log("The request was made but no response was received");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(message);
    }
    throw error;
  }
}
