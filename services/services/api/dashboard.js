import { axiosApi } from "../axios/axios_config";

export async function getStats() {
  try {
    const { data, response } = await axiosApi({
      endpoint: `admin/todays-joinees`,
      method: "GET",
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function getGraph(criteria) {
  try {
    const { data, response } = await axiosApi({
      endpoint: `admin/merchants-customers-graph?criteria=${criteria}`,
      method: "GET",
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}


export async function getTransactions() {
  try {
    const { data, response } = await axiosApi({
      endpoint: `transaction?all=true`,
      method: "GET",
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function getAllStores() {
  try {
    const { data, response } = await axiosApi({
      endpoint: `store?all=true`,
      method: "GET",
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function allMerchants() {
  try {
    const { data, response } = await axiosApi({
      endpoint: `merchant/get-all-merchants`,
      method: "GET",
      bodyData: null,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function merchant_detail() {
  try {
    const { data, response } = await axiosApi({
      endpoint: `/getMerchant`,
      method: "GET",
      bodyData: null,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function merchantDetail(id) {
  try {
    const { data, response } = await axiosApi({
      endpoint: `merchant/get-all-merchants?merchantId=${id}`,
      method: "GET",
      bodyData: null,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function allCustomers() {
  try {
    let { data, response } = await axiosApi({
      endpoint: "customer/get-customer",
      method: "GET",
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}
export async function allStores() {
  try {
    let { data, response } = await axiosApi({
      endpoint: "store?all=true",
      method: "GET",
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function customerDetail({ id }) {
  try {
    const { data, response } = await axiosApi({
      endpoint: `customer/get-customer?userId=${id}`,
      method: "GET",
      bodyData: null,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}


export async function KYCApproved({ KYCData }) {
  try {
    console.log("KYCData" , KYCData)
    const { data, response } = await axiosApi({
      endpoint: `merchant/updateMerchant`,
      method: "PATCH",
      bodyData: KYCData,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function KYCReject({ KYCData }) {
  try {
    console.log("KYCData" , KYCData)
    const { data, response } = await axiosApi({
      endpoint: `merchant/updateMerchant`,
      method: "PATCH",
      bodyData: KYCData,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}

export async function merchantStatus() {
  try {
    const { data, response } = await axiosApi({
      endpoint: `admin/merchant-stats`,
      method: "GET",
      bodyData: null,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}


export async function customerFilter() {
  try {
    const { data, response } = await axios_Without_Token({
      endpoint: `customer/filters`,
      method: "GET",
      bodyData: null,
    });
    return { data, response };
  } catch (err) {
    throw err;
  }
}



