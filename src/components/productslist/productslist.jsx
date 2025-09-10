import React, { useState ,useEffect} from "react";
import "./productslist.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import pic from "../../assets/pic.jpg";

// const products = [
//   { id: 1, name: "10 CM ELECTRIC SPARKLER 10 Pcs", content: "10 செ.மீ சாதா கம்பி", pack: "5 BOX", price: 50 ,image:pic},
//   { id: 2, name: "10 CM COLOUR SPARKLER 10 Pcs", content: "10 செ.மீ color கம்பி", pack: "5 BOX", price: 55 ,image:pic},
//   { id: 3, name: "12 CM ELECTRIC SPARKLER 10 Pcs", content: "12 செ.மீ சாதா கம்பி (5 BOX)", pack: "5 BOX", price: 85,image:pic },
//   { id: 4, name: "12 CM COLOUR SPARKLER 10 Pcs", content: "12 செ.மீ color கம்பி (5 BOX)", pack: "5 BOX", price: 90,image:pic },
// ];




function CrackersList() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);

useEffect(() => {
  fetch("https://crackerbackend.onrender.com/api/products/") 
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((err) => console.error("Error fetching products:", err));
}, []);

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

  // ✅ Generate PDF
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
        item.name,
        cart[item.id].qty,                 
        `₹${item.price}`,
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
              <img src={product.image} alt={product.name} />
            </div>
            {/* Left Content */}
            <div className="product-info">
              <p className="product-name">{product.id}. {product.name}</p>
              {/* <p className="product-content">{product.content}</p>
              <p className="product-pack">{product.pack}</p> */}
              <p className="product-price">Rs. {product.price.toFixed(2)}</p>
            </div>

            {/* Right Controls */}
            <div className="controls">
              <button onClick={() => updateQty(product.id, -1, product.price)}>-</button>
              <input type="text" readOnly value={cart[product.id]?.qty || 0} />
              <button onClick={() => updateQty(product.id, 1, product.price)}>+</button>
              <p className="row-total">Rs.{cart[product.id]?.total || 0}</p>
            </div>
          </div>
        ))}
      </div>

      
      <div className="net-total">Net Total: ₹ {netTotal}</div>

      <div className="print-btn">
        <button onClick={handleGeneratePDF}> Download Order PDF</button>
      </div>
    </div>
  );
}

export default CrackersList;
