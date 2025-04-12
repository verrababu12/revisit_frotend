import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css"; // reuse the same styling

const EditProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    count: "",
    image_url: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSave = async () => {
    const token = localStorage.getItem("jwt_token_backend");
    try {
      const res = await fetch(
        `https://revisit-backend-jp04.onrender.com/api/categories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(product),
        }
      );

      if (res.ok) {
        navigate("/home"); // redirect back to Home after saving
      } else {
        console.error("Update failed");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="edit-form">
      <h2>Edit Product</h2>
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
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditProductForm;
