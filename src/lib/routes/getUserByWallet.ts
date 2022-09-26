import { getByWalletResponse } from '@/interfaces/response.interface';
import axios from 'axios';

export default async function getUserByWallet(
  walletId: string
): Promise<getByWalletResponse | any> {
  try {
    const res = await axios.get(`/api/user/${walletId}`);
    return res.data as getByWalletResponse;
  } catch (error) {
    return error;
  }
}
