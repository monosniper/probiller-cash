import $api from "../http";

export default class UserService {
    static async signAdmin(password) {
        return $api.post('sign/admin', {password});
    }

    static async setCardsCount(value) {
        return $api.put('user/cards', {value});
    }
}