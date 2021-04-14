import axios from "axios";

export type Method = "GET" | "POST" | "PATCH" | "PUT";

interface AReq {
  endpoint: string;
  method: Method;
  body?: object;
}

// const backend = import.meta.env.DEV ? import.meta.env.VITE_APP_DEV_URL : "/api";

// interface Rtype<T>

const sendReq = async <Type>(req: AReq): Promise<Type> => {
  const { endpoint, method, body } = req;
  try {
    if (!method) throw Error("Method is required");

    const headers: any = {
      "Content-Type": "application/json",
    };

    let response;

    switch (method) {
      case "GET":
        response = await axios.get(`/api${endpoint}`, { headers });
        break;
      case "POST":
        response = await axios.post(`/api${endpoint}`, body, {
          headers,
        });
        break;
      case "PATCH":
        response = await axios.patch(`/api${endpoint}`, body, {
          headers,
        });
      case "PUT":
        response = await axios.put(`/api${endpoint}`, body, {
          headers,
        });
        break;
      default:
        break;
    }

    let data = response?.data;

    return data;
  } catch (error) {
    if (error?.response?.data?.errors) {
      throw error.response.data.errors;
    }

    if (typeof error === "string") throw error;

    throw new Error("Error");
  }
};

export { sendReq };
