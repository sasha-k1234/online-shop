import React, { useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Users from '../Users/Users';
import ProductManager from '../ProductManager/ProductManager';
import ProductsTable from '../ProductsTable/ProductsTable';
function AdminPanel() {
  let localStVal = 'users';

  useEffect(()=>{
  if (localStorage.getItem('adminPanel')) {
     localStVal = localStorage.getItem('adminPanel');
  }
  },[]);
  
  
  return (
    <Tabs
    onSelect={(k)=>localStorage.setItem('adminPanel',k)}
    defaultActiveKey={localStVal}
    transition={true}
    id="noanim-tab-example"
    className="mb-3"
  >

    <Tab eventKey="users" title="Users" >
      <Users></Users>
    </Tab>
    <Tab eventKey="addProduct" title="Add Product">
      <ProductManager></ProductManager>
    </Tab>
    <Tab eventKey="allProducts" title="All Products">
     <ProductsTable></ProductsTable>
    </Tab>
  </Tabs>
  )
}

export default AdminPanel;