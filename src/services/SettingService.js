import $api from "../http";

export default class SettingService {
    static async setSetting(name, value) {
        return $api.post('settings', {name, value});
    }

    static async getSetting(name) {
        return $api.get('settings/' + name);
    }
}