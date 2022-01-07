import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {API_URL} from "../http";
import UserService from "../services/UserService";
import TransactionService from "../services/TransactionService";
import SettingService from "../services/SettingService";

export default class Store {

    user = {};
    merchant = {};
    isAuth = true;
    isLoading = false;
    isAdmin = false;
    registerModal = false;
    settings = {
        special_text: ''
    };

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setMerchant(merchant) {
        this.merchant = merchant;
    }

    setRegisterModal(bool) {
        this.registerModal = bool;
    }

    setAdmin(bool) {
        this.isAdmin = bool;
    }

    setSetting(name, value) {
        this.settings[name] = value;
        console.log(this.settings)
    }

    async updateSpecialText() {
        try {
            const response = await SettingService.getSetting('special_text');

            this.setSetting('special_text', response.data.value);
        } catch (e) {
            console.log(e)
        }
    }

    async setSpecialText(value, onSuccess, onError) {
        try {
            const response = await SettingService.setSetting('special_text', value);
            this.setSetting('special_text', value);
            onSuccess && onSuccess();
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    async setCardsCount(value, onSuccess, onError) {
        try {
            const response = await UserService.setCardsCount(value);
            const newUser = {...this.user};
            newUser.cardsCount = value;
            this.setUser(newUser);
            onSuccess && onSuccess();
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    async signAdmin(password, onSuccess, onError) {
        try {
            await UserService.signAdmin(password);
            this.setAdmin(true);
            onSuccess && onSuccess();
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    async makeTransaction(amount, status, onSuccess, onError) {
        try {
            const response = await TransactionService.createTransaction(amount, status);

            onSuccess && onSuccess(response);
            return response.data;
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    async getTransactions() {
        try {
            const response = await TransactionService.getTransactions();
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async login(username, password, onSuccess, onError) {
        try {
            const response = await AuthService.login(username, password)

            localStorage.setItem('token', response.data.accessToken);

            this.setAuth(true);
            this.setUser(response.data.user);

            onSuccess && onSuccess(response);
        } catch (e) {
            onError && onError(e);
            console.log(e);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');

            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);

            this.setAuth(true);
            this.setUser(response.data.user);

            const merchants = {
                'pussy-house-net@gmail.com': {
                    name: 'Pussy house',
                    url: 'https://www.pussy-house.net',
                    avatar: 'pussy.png',
                },
                'makao777-com@gmail.com': {
                    name: 'Makao777',
                    url: 'https://www.makao777.com',
                    avatar: 'makao.png',
                },
                'nccasino-com@gmail.com': {
                    name: 'NC Casino',
                    url: 'https://www.makao777.com',
                    avatar: 'makao.png',
                },
                'roomdiamond-com@gmail.com': {
                    name: 'Room Diamond',
                    url: 'https://www.roomdiamond.com',
                    avatar: 'roomdiamond.png',
                },
            }

            this.setMerchant(merchants[this.user.email]);
        } catch (e) {
            this.setAuth(false);
        } finally {
            this.setLoading(false);
        }
    }
}