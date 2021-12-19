import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {API_URL} from "../http";
import TransactionService from "../services/TransactionService";

export default class Store {

    user = {};
    isAuth = true;
    isLoading = false;
    registerModal = false;

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

    setRegisterModal(bool) {
        this.registerModal = bool;
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
        } catch (e) {
            this.setAuth(false);
        } finally {
            this.setLoading(false);
        }
    }
}