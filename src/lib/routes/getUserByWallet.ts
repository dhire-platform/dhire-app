import axios from 'axios';

export default async function getUserByWallet(walletId: string) {
  try {
    const res = await axios.get(`/api/user/${walletId}`);
    console.log('user by wallet', res);
    return res.data;
  } catch (error) {
    console.log('get user by wallet error - ', error);
    return error;
  }
}
