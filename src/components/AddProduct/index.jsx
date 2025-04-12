import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    count: "",
    image_url: "",
  });

  const navigate = useNavigate();

  const handleAdd = async () => {
    const token = localStorage.getItem("jwt_token_backend");

    try {
      const res = await fetch(
        "https://revisit-backend-jp04.onrender.com/api/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(product),
        }
      );

      if (res.ok) {
        alert("Product added successfully!");
        navigate("/home"); // Go back to home page
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Count"
        value={product.count}
        onChange={(e) => setProduct({ ...product, count: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={product.image_url}
        onChange={(e) => setProduct({ ...product, image_url: e.target.value })}
      />
      <button onClick={handleAdd}>Add Product</button>
    </div>
  );
};

export default AddProduct;
