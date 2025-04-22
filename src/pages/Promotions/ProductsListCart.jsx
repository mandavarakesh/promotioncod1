import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const ProductsListCart = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["PRODUCT_LIST"],
    queryFn: () => axios.get("http://localhost:8081/Product/getAllProducts"),
    select: (response) => response.data,
    refetchOnMount: true,
  });

  const { data: cartData } = useQuery({
    queryKey: ["CREATE_CART"],
    queryFn: () => axios.get("http://localhost:8081/Cart/createCart"),
    select: (response) => response.data,
    refetchOnMount: true,
  });

  let price = 499;
  // const { data: products = [], isLoading, error } = useQuery('products', fetchProducts)
  const [productsJson, setProducts] = useState([
    {
      id: 1,
      name: "GFG T-shirt",
      price: 499,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230823165506/gfg1.png",
    },
    {
      id: 2,
      name: "GFG Bag",
      price: 699,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230823165553/gfg2.jpg",
    },
    {
      id: 3,
      name: "GFG Hoodie",
      price: 799,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230823165623/gfg3.jpg",
    },
  ]);

  const [cartProducts, setCartProducts] = useState([]);

  console.log("cccccccccccccccccccc:", cartProducts);
  const addProductToCart = async (selectedProduct) => {
    try {
      const payload = {
        code: cartData?.code,
        qty: 1,
        product: selectedProduct?.productCode,
      };

      const CartData = await axios
        .post(
          "http://localhost:8081/Cart/addToCart",
          {},
          {
            params: payload,
          }
        )
        .then((res) => {
          if (res) {
            const updatedCart = res?.data || [];
            setCartProducts(updatedCart);
          }
        });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const updateCartQuantity = async (entryNumber, quantity) => {
    try {
      const payload = {
        code: cartData?.code,
        entryNumber: entryNumber,
        qty: quantity,
      };

      await axios
        .put("http://localhost:8081/Cart/updateCart", {}, { params: payload })
        .then((res) => {
          if (res) {
            const updatedCart = res?.data || [];
            setCartProducts(updatedCart);
          }
        });
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  const deleteProductFromCart = async (item) => {
    try {
      const payload = {
        code: cartData?.code,
        entryNumber: item.entryNumber,
      };

      await axios
        .delete("http://localhost:8081/Cart/deleteProduct", { params: payload })
        .then((res) => {
          if (res) {
            const updatedCart = res?.data || [];
            setCartProducts(updatedCart);
          }
        });
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };

  return (
    <>
      {/* List Section */}
      <Box display="flex" gap="10px">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // 3 items per row
            gap: "10px",
            marginTop: "10px",
          }}
        >
          {products.map((product) => (
            <Box
              sx={{
                backgroundColor: "rgb(255, 245, 245)",
                border: "1px solid #1b4e1f",
                padding: "10px",
                textAlign: "center",
                transition: "transform 0.2s ease-in-out",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
                width: "100%",
              }}
              key={product.id}
            >
              <img
                src={
                  "https://media.geeksforgeeks.org/wp-content/uploads/20230823165623/gfg3.jpg"
                }
                alt={product.name}
              />
              <h3 style={{ margin: "10px" }}>{product.productName}</h3>
              <p style={{ margin: "10px" }}>Price: ₹{product?.price}</p>
              <button onClick={() => addProductToCart(product)}>
                Add to Cart
              </button>
            </Box>
          ))}
        </Box>
        {/* cart Section */}
        <div
          style={{
            flex: 1,
            width: "300px",
            minWidth: "250px",
            marginTop: "10px",
            backgroundColor: "#fff9e6",
            border: "1px solid #193d10",
            padding: "10px",
            // display: none,
            position: "sticky",
            top: "20px",
          }}
        >
          <h2 style={{ margin: "0px" }}>Cart</h2>
          {cartProducts.entries.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              <ul>
                {cartProducts.entries.map((item) => (
                  <li
                    key={item.product.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      // alignItems: "center",
                      margin: "15px 0",
                      padding: "10px 0px",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "50px",
                            height: "auto",
                            marginRight: "15px",
                            borderRadius: "50%",
                            //   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                            //   transition: "transform 0.3s ease-in-out",
                          }}
                        >
                          <img
                            src={
                              "https://media.geeksforgeeks.org/wp-content/uploads/20230823165623/gfg3.jpg"
                            }
                            alt={item.product.name}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <h4 style={{ margin: "0px" }}>
                            {item.product.productName}
                          </h4>
                          <h6 style={{ margin: "0px" }}>
                            Price: ₹{item.totalPrice}
                          </h6>
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            padding: "8px 0px",
                            cursor: "pointer",
                            height: "48px",
                            justifyContent: "space-between",
                            // marginTop:"5px",
                            alignItems: "center",
                          }}
                        >
                          <button onClick={() => deleteProductFromCart(item)}>
                            Remove Product
                          </button>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginLeft: "15px",
                              fontSize: "1rem",
                              color: "#323754",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <button
                              onClick={() => {
                                updateCartQuantity(
                                  item.entryNumber,
                                  item.quantity - 1
                                );
                              }}
                              disabled={item.quantity < 2}
                            >
                              -
                            </button>

                            <p>{item.quantity} </p>
                            <button
                              style={{ margin: "1%" }}
                              onClick={(e) => {
                                updateCartQuantity(
                                  item.entryNumber,
                                  item.quantity + 1
                                );
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                <div>
                  <p>Total Amount: ₹{cartProducts?.cartTotal}</p>
                </div>
                <button disabled={cartProducts.entries.length === 0}>
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}
        </div>
      </Box>
    </>
  );
};
