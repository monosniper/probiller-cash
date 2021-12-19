import React from 'react';
import moment from "moment";

const Transaction = (props) => {
    return (
        <div className="transactions-item">
            <div className="transactions-item-status">
                <i className={props.transaction.status === 'success' ? "far fa-check-circle" : "far fa-times-circle"} /> {props.transaction.status}
            </div>
            <div className="transactions-item-amount">{props.transaction.amount}$</div>
            <div className="transactions-item-date">{moment(props.transaction.createdAt).format('DD MMMM yyyy')}</div>
        </div>
    );
};

export default Transaction;