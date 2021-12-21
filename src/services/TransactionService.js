import $api from "../http";

export default class TransactionService {
    static async createTransaction(amount, status) {
        return $api.post('transactions/push', {amount, status});
    }

    static async getTransactions() {
        return $api.get('transactions');
    }
}