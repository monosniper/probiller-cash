import $api from "../http";

export default class UserService {
    static async signAdmin(password) {
        return $api.post('sign/admin', {password});
    }
}