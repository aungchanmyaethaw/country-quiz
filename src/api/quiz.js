import axios from "axios";

const BASE_URL = "https://countriesnow.space/api/v0.1/countries/";

// https://countriesnow.space/api/v0.1/countries/capital
// https://countriesnow.space/api/v0.1/countries/flag/images

export const getCountriesWithCapital = async () => {
  try {
    const res = await axios.get(`${BASE_URL}capital`);
    return res.data.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCountriesWithFlag = async () => {
  try {
    const res = await axios.get(`${BASE_URL}flag/images`);
    return res.data.data;
  } catch (e) {
    throw new Error(e.message);
  }
};
