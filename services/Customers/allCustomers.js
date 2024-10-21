import axiosApi from "../services/axios/axios_config";

async function AllCustomers () {
  try {
    const { data, response } = await axiosApi({
      endpoint: `customer/get-all-customers`,
      method: "GET",
    });
    console.log(response)
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export default AllCustomers