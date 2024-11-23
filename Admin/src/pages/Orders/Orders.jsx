import React, { useState, useEffect } from 'react';
import './orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const url = "http://localhost:4000";

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };


  const statusHandler = async (e, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: e.target.value
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {
          orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="order-item">
                <img src={assets.parcel_icon} alt="Parcel Icon" />
                <div>
                  <p className='order-item-food'>
                    {
                      order.items && order.items.map((item, itemIndex) => {
                        return (
                          <span key={itemIndex}>
                            {item.name} x {item.quantity}
                            {itemIndex !== order.items.length - 1 && ', '}
                          </span>
                        );
                      })
                    }
                  </p>
                  <p className="order-item-name">
                    {
                      order.address.firstName + "" + order.address.lastName
                    }
                  </p>
                  <div className="order-item-address">
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
                  </div>
                  <p className='order-item-phone'>{order.address.phone}</p>
                </div>
                <p>
                  Items:{order.items.length}
                </p>
                <p>${order.amount}</p>
                <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                  <option value="Food processing">Food processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))
          ) : (
            <p>No orders available.</p>
          )
        }
      </div>
    </div>
  );
};

export default Orders;
