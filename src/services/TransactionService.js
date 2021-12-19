import $api from "../http";

export default class TransactionService {
    static async createTransaction(merchant, amount, status) {
        return $api.post('transactions/push', {merchant, amount, status});
    }

    static async getTransactions() {
        return $api.get('transactions');
    }
}