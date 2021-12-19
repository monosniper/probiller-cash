import React from 'react';
import moment from "moment";

const Transaction = (props) => {

    const statuses = {
        success: <><i className="fas fa-check-circle"></i> status</>,
        failed: <><i className="fas fa-times-circle"></i> failed</>,
        pending: <><i className="fas fa-hourglass"></i> pending</>,
    }

    return (
        <div className="transactions-item">
            <div className={`transactions-item-status ${props.transaction.status}`}>
                {statuses[props.transaction.status]}
            </div>
            <div className="transactions-item-amount">{props.transaction.amount}$</div>
            <div className="transactions-item-date">{moment(props.transaction.createdAt).format('DD MMMM yyyy')}</div>
        </div>
    );
};

export default Transaction;