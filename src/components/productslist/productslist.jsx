import React, { useState, useEffect } from "react";
import "./productslist.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function CrackersList() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    fetch("https://crackersbackend-upmi.onrender.com/app/products/")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Update quantity in cart
  const updateQty = (id, change, price) => {
    setCart((prev) => {
      const qty = (prev[id]?.qty || 0) + change;
      if (qty < 0) return prev;
      return {
        ...prev,
        [id]: { qty, total: qty * price },
      };
    });
  };

  const netTotal = Object.values(cart).reduce((sum, item) => sum + item.total, 0);

  // Generate PDF
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(" Order Summary", 14, 20);

    const orderedItems = products.filter((p) => cart[p.id]?.qty > 0);

    if (orderedItems.length === 0) {
      doc.setFontSize(12);
      doc.text("No items ordered.", 14, 30);
    } else {
      const tableData = orderedItems.map((item) => [
        item.Product_name,
        cart[item.id].qty,
        `₹${item.Product_price}`,
        `₹${cart[item.id].total}`,
      ]);

      autoTable(doc, {
        head: [["Product", "Quantity", "Price", "Total"]],
        body: tableData,
        startY: 30,
      });

      const finalY = doc.lastAutoTable?.finalY || 40;
      doc.setFontSize(14);
      doc.text(`Net Total: ₹${netTotal}`, 14, finalY + 10);
    }

    doc.save("order-summary.pdf");
  };

  return (
    <div className="container">
      <h1 className="title">Crackers Price List</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-img">
              <img src={product.Product_image} alt={product.Product_name} />
            </div>
            <div className="product-info">
              <p className="product-name">
                {product.id}. {product.Product_name}
              </p>
              <p className="product-price">
                Rs. {product.Product_price ? product.Product_price.toFixed(2) : "0.00"}
              </p>
            </div>
            <div className="controls">
              <button onClick={() => updateQty(product.id, -1, product.Product_price)}>-</button>
              <input type="text" readOnly value={cart[product.id]?.qty || 0} />
              <button onClick={() => updateQty(product.id, 1, product.Product_price)}>+</button>
              <p className="row-total">Rs.{cart[product.id]?.total || 0}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="net-total">Net Total: ₹ {netTotal}</div>

      <div className="print-btn">
        <button onClick={handleGeneratePDF}>Download Order PDF</button>
      </div>
    </div>
  );
}

export default CrackersList;
