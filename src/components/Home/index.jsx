import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { CiEdit } from "react-icons/ci";

import "./index.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwt_token_backend");
      
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await fetch(
          "https://revisit-backend-jp04.onrender.com/api/categories/products",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="product-container">
      <h2>Product Categories</h2>

      {loading ? (
        <div className="loading-container">
          <ClipLoader
            loading={true}
            height="80"
            width="80"
            color="#4fa94d"
            aria-label="rings-loading"
          />
        </div>
      ) : (
        <>
          <div className="btn-container">
            <button
              className="add-btn"
              onClick={() => navigate("/add-product")}
            >
              Add Product
            </button>
          </div>

          <div className="product-grid">
            {products.map((item, index) => (
              <div key={item._id || index} className="product-card">
                <img src={item.image_url} alt={item.name} />
                <div className="product-info">
                  <h3>{item.name}</h3>
                  <p>{item.count} items</p>
                  <CiEdit
                    className="edit-icon"
                    onClick={() => handleEdit(item._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

