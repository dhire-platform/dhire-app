// an axios post request
import axios from 'axios';

export const postApi = async (url: string, data: any) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
