import axios from 'axios';
import { baseUrl } from '../shared/baseUrl';
import authHeader from './auth-header';


class UserService {
  getPublicContent() {
    return axios.get(baseUrl + 'admin/checkJWTtoken' , { headers: authHeader() });
  }

  getUserBoard() {
    return axios.get(baseUrl + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(baseUrl + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(baseUrl + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
