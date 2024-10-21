import {axiosApi}  from "../axios/axios_config";

async function storeDetails({id}) {
  try {
    const { data, response } = await axiosApi({
      endpoint: `store?storeId=${id}`,
      method: "GET",
    });
    // console.log(response)
    return { data, response };
  } catch (err) {
    throw err;
  }
}
async function getServices({id}) {
    // console.log("working")
  try {
    const { data, response } = await axiosApi({
      endpoint: `services?storeId=${id}&isPackage=false`,
      method: "GET",
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}
async function getOneService(id) {
    // console.log("working")
  try {
    const { data, response } = await axiosApi({
      endpoint: `services?serviceId=${id}`,
      method: "GET",
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}
async function getPackages({id}) {
    // console.log("working")
  try {
    const { data, response } = await axiosApi({
      endpoint: `services?storeId=${id}&isPackage=true`,
      method: "GET",
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}
async function getEmployees({id}) {
    // console.log("working")
  try {
    const { data, response } = await axiosApi({
      endpoint: `merchant/get?storeId=${id}`,
      method: "GET",
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}
async function getReviews({id}) {
    // console.log("working")
  try {
    const { data, response } = await axiosApi({
      endpoint: `reviews/store?storeId=${id}`,
      method: "GET",
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}
async function getReviewStats({id}) {
    // console.log("working")
  try {
    const { data, response } = await axiosApi({
      endpoint: `reviews/store/stats?storeId=${id}`,
      method: "GET",
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export{
  storeDetails,
  getServices,
  getOneService,
  getPackages,
  getEmployees,
  getReviews,
  getReviewStats,
}