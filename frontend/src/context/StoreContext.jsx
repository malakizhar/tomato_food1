import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "http://localhost:4000";

  const addCartItem = async (itemId) => {
    if (!itemId) {
      console.error("Invalid itemId:", itemId);
      return;
    }

    setCartItem((prev) => {
      console.log("Previous cart state:", prev);
      const updatedCart = {
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      };
      // Optionally, update localStorage
      localStorage.setItem("cartItem", JSON.stringify(updatedCart));
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error adding item to cart:", error);
        alert("Error adding item to cart, please try again.");
      }
    }
  };

  const removeFromCart = async (itemId) => {
    if (!cartItem[itemId]) return;
    
    setCartItem((prev) => {
      const updatedCart = {
        ...prev,
        [itemId]: prev[itemId] - 1,
      };
      // Update localStorage if item count goes to zero
      if (updatedCart[itemId] === 0) {
        delete updatedCart[itemId];
      }
      localStorage.setItem("cartItem", JSON.stringify(updatedCart));
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error removing item from cart:", error);
        alert("Error removing item from cart, please try again.");
      }
    }
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItem).reduce((total, [itemId, quantity]) => {
      const itemInfo = food_list.find((product) => product._id === itemId);
      return itemInfo ? total + itemInfo.price * quantity : total;
    }, 0);
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCartData = async (token) => {
    if (!token) return; // Only load if token exists

    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      if (response.data && response.data.cartData) {
        setCartItem(response.data.cartData);
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken); // Pass the token directly
      }
      await fetchFoodList(); // Fetch food list regardless of token
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addCartItem,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    loading,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
