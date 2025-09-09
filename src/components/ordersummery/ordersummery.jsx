import React from "react";
import "./ordersummary.css";

function OrderSummary({ products, cart }) {
  const orderedItems = products.filter((p) => cart[p.id]?.qty > 0);

  const netTotal = Object.values(cart).reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="order-container">
      <h2 className="order-title">Order Summary</h2>

      {orderedItems.length === 0 ? (
        <p>No items ordered.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price (each)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderedItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{cart[item.id].qty}</td>
                <td>₹{item.price}</td>
                <td>₹{cart[item.id].total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="order-net-total">
        Net Total: <span>₹{netTotal}</span>
      </div>
    </div>
  );
}

export default OrderSummary;
