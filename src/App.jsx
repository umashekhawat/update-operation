
import { useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 55000,
      stock: 10,
    },
    {
      id: 2,
      name: "Office Chair",
      category: "Furniture",
      price: 4500,
      stock: 15,
    },
    {
      id: 3,
      name: "Notebook",
      category: "Stationery",
      price: 80,
      stock: 100,
    },
  ]);

  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });
  const [message, setMessage] = useState("");

  // Select a product and fill the form
  const handleSelect = (product) => {
    setSelectedId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
    });
    setMessage("");
  };

  // Update form values
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Update the selected product
  const handleUpdate = (event) => {
    event.preventDefault();

    if (selectedId === null) {
      setMessage("Please select a product to update.");
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      formData.price === "" ||
      formData.stock === "" ||
      Number(formData.price) < 0 ||
      Number(formData.stock) < 0 ||
      !Number.isFinite(Number(formData.price)) ||
      !Number.isInteger(Number(formData.stock))
    ) {
      setMessage(
        "Enter valid details. Price must be non-negative and stock must be a whole number."
      );
      return;
    }

    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === selectedId
          ? {
              ...product,
              name: formData.name.trim(),
              category: formData.category.trim(),
              price: Number(formData.price),
              stock: Number(formData.stock),
            }
          : product
      )
    );

    setMessage("Product updated successfully!");
    setSelectedId(null);
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
    });
  };

  const handleCancel = () => {
    setSelectedId(null);
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
    });
    setMessage("");
  };

  return (
    <div className="app">
      <header className="header">
        <p className="eyebrow">INVENTORY MANAGEMENT</p>
        <h1>Product Manager</h1>
        <p>Edit existing products and keep your inventory updated.</p>
      </header>

      <main className="container">
        <section className="panel">
          <div className="section-title">
            <span className="step">01</span>
            <div>
              <h2>Select a Product</h2>
              <p>Choose a product to edit its information.</p>
            </div>
          </div>

          <div className="product-list">
            {products.map((product) => (
              <button
                type="button"
                key={product.id}
                className={`product-item ${
                  selectedId === product.id ? "selected" : ""
                }`}
                onClick={() => handleSelect(product)}
              >
                <span className="product-icon">
                  {product.name.charAt(0).toUpperCase()}
                </span>

                <span className="product-summary">
                  <strong>{product.name}</strong>
                  <small>{product.category}</small>
                </span>

                <span className="product-price">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>

                <span className="edit-label">
                  {selectedId === product.id ? "Selected" : "Edit"}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="section-title">
            <span className="step">02</span>
            <div>
              <h2>Update Product Details</h2>
              <p>Modify the fields and save your changes.</p>
            </div>
          </div>

          <form onSubmit={handleUpdate}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  disabled={selectedId === null}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                  disabled={selectedId === null}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price (₹)</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  disabled={selectedId === null}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock Quantity</label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                  disabled={selectedId === null}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="update-btn"
                disabled={selectedId === null}
              >
                Update Product
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>

          {message && (
            <p
              className={`message ${
                message.includes("successfully") ? "success" : "error"
              }`}
              role="status"
            >
              {message}
            </p>
          )}
        </section>

        <div className="inventory-footer">
          <span>Total Products</span>
          <strong>{products.length}</strong>
          <span>Changes are stored in React state.</span>
        </div>
      </main>

      <footer className="footer">
        React Practical · Update Operation
      </footer>
    </div>
  );
}

export default App;
