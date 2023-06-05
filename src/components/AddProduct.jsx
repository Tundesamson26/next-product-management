/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { createAnonymousSession } from "../../utils/web-init";
import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";
import { Client, Databases, ID } from "appwrite";

export default function AddProduct() {
  const [showModal, setShowModal] = useState(false);

  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productSize, setProductSize] = useState("");

  const client = new Client();
  const databases = new Databases(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("646b74256355239828bf");

  const createProduct = async (e) => {
    e.preventDefault();
    try{
       await databases.createDocument(
        '646b75921f4c1d8f9970',
        '646b76a75c344008e43c',
        ID.unique(),
        {
          productName: productName,
          productDesc: productDesc,
          productImage: productImage,
          productPrice: productPrice,
          productSize: productSize
        }
      )
      setProductName('');
      setProductDesc('');
      setProductImage('');
      setProductPrice('');
      setProductSize('');   
      alert("product saved successfully")
      e.preventDefault();
    }catch(error){
      console.log(error.message);
      alert("product not saved")
    }
  }


  useEffect(() => {
    createAnonymousSession();
  }, []);

  return (
    <div className="u-main-center">
      <div className="container u-flex u-main-space-between ">
        <div>
          <h2 className=" u-bold">Dashboard</h2>
        </div>
        <button className="button" onClick={() => setShowModal(true)}>
          <span className="icon-plus-sm" aria-hidden="true"></span>
          <span>Add Product</span>
        </button>
        {showModal ? (
          <div className="modal" id="dialog">
            <form className="modal-form" method="dialog" onSubmit={createProduct}>
              <header className="modal-header">
                <h4 className="modal-title heading-level-5">Product</h4>
                <button
                  className="button is-text is-small is-only-icon"
                  aria-label="Close modal"
                  onClick={() => setShowModal(false)}
                >
                  <span className="icon-x" aria-hidden="true"></span>
                </button>
              </header>
              <ul className="form-list">
                <li className="form-item">
                  <label className="label">Product Name</label>
                  <div className="input-text-wrapper">
                    <input
                      type="text"
                      className="input-text u-padding-inline-end-56"
                      placeholder="Product name"
                      name="productName"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                </li>
                <li className="form-item">
                  <label className="label">Product Image</label>
                  <div className="input-text-wrapper">
                    <input
                      type="text"
                      className="input-text"
                      placeholder="Product Image"
                      name="productImage"
                      value={productImage}
                      onChange={(e) => setProductImage(e.target.value)}
                    />
                  </div>
                </li>
                <li className="form-item">
                  <label className="label">Description</label>
                  <div className="input-text-wrapper">
                    <input
                      type="text"
                      className="input-text"
                      placeholder="Product Description"
                      name="productDesc"
                      value={productDesc}
                      onChange={(e) => setProductDesc(e.target.value)}
                    />
                  </div>
                </li>
                <div className="u-flex u-main-space-between u-cross-center">
                  <li className="form-item">
                    <label className="label">Price</label>
                    <div className="input-text-wrapper">
                      <input type="text" name="productPrice" placeholder="Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                    </div>
                  </li>
                  <li className="form-item">
                    <label className="label" name="size">Size</label>
                    <div className="input-text-wrapper">
                      <select name="size" value={productSize} onChange={(e) => setProductSize(e.target.value)} >
                        <option>38</option>
                        <option>40</option>
                        <option>42</option>
                        <option>44</option>
                      </select>
                    </div>
                  </li>
                </div>
              </ul>
              <div className="modal-footer">
                <div className="u-flex u-main-end u-gap-16">
                  <button className="button is-secondary" onClick={() => setShowModal(false)}>
                    <span className="text">Cancel</span>
                  </button>
                  <button className="button" type="submit" onClick={createProduct}>
                    <span className="text">Save</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}
