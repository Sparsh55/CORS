// src/components/ItemsTable.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, updateItems, setPrices, updatePrices } from '../redux/itemSlices';
import { handleSort } from './Utils';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

const ItemsTable = () => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('price');
  const [viewItem, setViewItem] = useState([]);

  const dispatch = useDispatch();
  const { items, prices, currentPage, itemsPerPage } = useSelector((state) => state.items);

  useEffect(() => {
    const fetchInitialData = async () => {
      const itemsResponse = await fetch('http://localhost:8000/items');
      const itemsData = await itemsResponse.json();
      dispatch(setItems(itemsData));

      const pricesResponse = await fetch('http://localhost:8000/prices');
      const pricesData = await pricesResponse.json();
      dispatch(setPrices(pricesData));
    };

    fetchInitialData();

    const itemsSocket = new WebSocket('ws://YOUR_BACKEND_URL/ws/items');
    itemsSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'items') {
        dispatch(updateItems(message.data));
      }
    };

    const pricesSocket = new WebSocket('ws://YOUR_BACKEND_URL/ws/prices');
    pricesSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'prices') {
        dispatch(updatePrices(message.data));
      }
    };

    return () => {
      itemsSocket.close();
      pricesSocket.close();
    };
  }, [dispatch]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = items.slice(indexOfFirstItem, indexOfLastItem);


  useEffect(() => {
     const sortedItems = handleSort(currentItems, sortBy, sortOrder);
     setViewItem(sortedItems);
  // },[sortBy, sortOrder, currentItems]);
  },[]);
  return (
    <div style={{ width:"100vw"}}>
      <div style={{display:"flex", justifyContent:"center"}}>
      <Link to = "/"><button>Back to Home</button></Link></div>
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="price">Sort By Price</option>
        <option value="name">Sort By Name</option>
      </select>
      <select onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">A-Z</option>
        <option value="dsc">Z-A</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Current Price</th>
          </tr>
        </thead>
        <tbody>
          {viewItem.map((item) => {
            const price = prices.find((price) => price.item_id === item.id)?.price || 'N/A';
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination totalItems={items.length} />
    </div>
  );
};

export default ItemsTable;
