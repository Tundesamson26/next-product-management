/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { client, account, databases } from "../../utils/web-init";

function ListProduct() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState({ index: null });

  const editProduct = (productId) => {
    const productIndex = products.findIndex(
      (product) => product.$id === productId
    );
    if (productIndex !== -1) {
      setEditMode({ index: productIndex });
      setShowModal(true);
    }
  };
  const updateProduct = async (productId) => {
    try {
      const productIndex = products.findIndex(
        (product) => product.$id === productId
      );
      if (productIndex === -1) {
        throw new Error("Product not found");
      }

      const updatedProduct = { ...products[productIndex] };
      // Update the product in the database using the modified data
      await databases.updateDocument(
        "646b75921f4c1d8f9970",
        "646b76a75c344008e43c",
        productId,
        {
          productName: updatedProduct.productName,
          productImage: updatedProduct.productImage,
          productDesc: updatedProduct.productDesc,
          productPrice: updatedProduct.productPrice,
          productSize: updatedProduct.productSize,
          // Update other fields as needed
        }
      );

      alert("Product has been updated successfully");
      setEditMode({ index: null }); // Exit edit mode
      await getProduct();
    } catch (error) {
      console.log("Error updating product:", error.message);
      alert("Product was not updated");
    }
  };

  const getProduct = async () => {
    try {
      const response = await databases.listDocuments(
        "646b75921f4c1d8f9970",
        "646b76a75c344008e43c"
      );
      const products = response.documents;
      console.log("Successfully retrieved products:", products);
      setProducts(products);
      return products;
    } catch (error) {
      console.log("Error retrieving products:", error);
      // Handle the error accordingly (e.g., display an error message)
    }
  };

  const deleteProduct = async (document_id) => {
    try {
      await databases.deleteDocument(
        "646b75921f4c1d8f9970",
        "646b76a75c344008e43c",
        document_id
      );

      alert("Item has been deleted successfully");
      await getProduct();
    } catch (error) {
      console.log("Error deleting product:", error.message);
      alert("Item was not deleted");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    console.log("iiiii");
    if (account.get !== null) {
      try {
        client.subscribe("documents", (response) => {
          console.log("anything", response);
        });
      } catch (error) {
        console.log(error, "error");
      }
    }
  }, []);

  return (
    <div className="container">
      <table className="table is-selected-columns-mobile">
        <thead className="table-thead">
          <tr className="table-row">
            <th className="table-thead-col" style={{ "--p-col-width": 100 }}>
              <span className="eyebrow-heading-3">Product Name</span>
            </th>
            <th
              className="table-thead-col is-only-desktop"
              style={{ "--p-col-width": 100 }}
            >
              <span className="eyebrow-heading-3">Image</span>
            </th>
            <th
              className="table-thead-col is-only-desktop"
              style={{ "--p-col-width": 200 }}
            >
              <span className="eyebrow-heading-3">Description</span>
            </th>
            <th
              className="table-thead-col is-only-desktop"
              style={{ "--p-col-width": 100 }}
            >
              <span className="eyebrow-heading-3">Price</span>
            </th>
            <th
              className="table-thead-col is-only-desktop"
              style={{ "--p-col-width": 120 }}
            >
              <span className="eyebrow-heading-3">Size</span>
            </th>
            <th
              className="table-thead-col"
              style={{ "--p-col-width": 40 }}
            ></th>
          </tr>
        </thead>
        <tbody className="table-tbody">
          {products.map((product) => (
            <tr key={product.$id} className="table-row">
              <td className="table-col" data-title="Name">
                <div className="u-inline-flex u-cross-center u-gap-12">
                  <span className="text u-break-word u-line-height-1-5">
                    {product.productName}
                  </span>
                </div>
              </td>
              <td className="table-col is-only-desktop" data-title="Type">
                <div className="text">
                  <span className="image">
                    <img
                      className="avatar"
                      width="32"
                      height="32"
                      src={product.productImage}
                      alt=""
                    />
                  </span>
                </div>
              </td>
              <td className="table-col is-only-desktop" data-title="Type">
                <div className="text">
                  <span className="text">{product.productDesc}</span>
                </div>
              </td>
              <td className="table-col is-only-desktop" data-title="Size">
                <span className="tag">${product.productPrice}</span>
              </td>
              <td className="table-col is-only-desktop" data-title="Created">
                <time className="text">{product.productSize}</time>
              </td>
              <td className="table-col u-overflow-visible">
                <div className="u-flex u-cross-center u-main-end">
                  <div>
                    {/* Edit button */}
                    <button
                      className="button is-text is-only-icon"
                      type="button"
                      aria-label="more options"
                      onClick={() => editProduct(product.$id)}
                    >
                      <span className="icon-pencil"></span>
                    </button>
                    {showModal && editMode.index !== null && (
                      <div className="modal-overlay" id="dialog">
                        <div className="modal">
                          <form
                            className="modal-form"
                            method="dialog"
                            onSubmit={(e) => e.preventDefault()}
                          >
                            <header className="modal-header">
                              <h4 className="modal-title heading-level-5">
                                Product
                              </h4>
                              <button
                                className="button is-text is-small is-only-icon"
                                aria-label="Close modal"
                                onClick={() => setShowModal(false)}
                              >
                                <span
                                  className="icon-x"
                                  aria-hidden="true"
                                ></span>
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
                                    value={products[editMode.index].productName}
                                    onChange={(e) =>
                                      setProducts((prevProducts) => {
                                        const updatedProduct = {
                                          ...prevProducts[editMode.index],
                                          productName: e.target.value,
                                        };
                                        return [
                                          ...prevProducts.slice(
                                            0,
                                            editMode.index
                                          ),
                                          updatedProduct,
                                          ...prevProducts.slice(
                                            editMode.index + 1
                                          ),
                                        ];
                                      })
                                    }
                                  />
                                </div>
                              </li>
                              <li className="form-item">
                                <label className="label">Product Image</label>
                                <div className="input-text-wrapper">
                                  <input
                                    type="text"
                                    className="input-text"
                                    placeholder="Image link"
                                    value={
                                      products[editMode.index].productImage
                                    }
                                    onChange={(e) =>
                                      setProducts((prevProducts) => {
                                        const updatedProduct = {
                                          ...prevProducts[editMode.index],
                                          productImage: e.target.value,
                                        };
                                        return [
                                          ...prevProducts.slice(
                                            0,
                                            editMode.index
                                          ),
                                          updatedProduct,
                                          ...prevProducts.slice(
                                            editMode.index + 1
                                          ),
                                        ];
                                      })
                                    }
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
                                    value={products[editMode.index].productDesc}
                                    onChange={(e) =>
                                      setProducts((prevProducts) => {
                                        const updatedProduct = {
                                          ...prevProducts[editMode.index],
                                          productDesc: e.target.value,
                                        };
                                        return [
                                          ...prevProducts.slice(
                                            0,
                                            editMode.index
                                          ),
                                          updatedProduct,
                                          ...prevProducts.slice(
                                            editMode.index + 1
                                          ),
                                        ];
                                      })
                                    }
                                  />
                                </div>
                              </li>
                              <div className="u-flex u-cross-center">
                                <li className="form-item">
                                  <label className="label">Price</label>
                                  <div className="input-text-wrapper">
                                    <input
                                      type="text"
                                      name="productPrice"
                                      placeholder="Price"
                                      value={
                                        products[editMode.index].productPrice
                                      }
                                      onChange={(e) =>
                                        setProducts((prevProducts) => {
                                          const updatedProduct = {
                                            ...prevProducts[editMode.index],
                                            productPrice: e.target.value,
                                          };
                                          return [
                                            ...prevProducts.slice(
                                              0,
                                              editMode.index
                                            ),
                                            updatedProduct,
                                            ...prevProducts.slice(
                                              editMode.index + 1
                                            ),
                                          ];
                                        })
                                      }
                                    />
                                  </div>
                                </li>
                                <li className="form-item">
                                  <label className="label" htmlFor="size">
                                    Quantity
                                  </label>
                                  <div className="input-text-wrapper">
                                    <div
                                      className="select"
                                      style={{ width: "122%" }}
                                    >
                                      <select
                                        name="pets"
                                        id="pet-select"
                                        value={
                                          products[editMode.index].productSize
                                        }
                                        onChange={(e) =>
                                          setProducts((prevProducts) => {
                                            const updatedProduct = {
                                              ...prevProducts[editMode.index],
                                              productSize: e.target.value,
                                            };
                                            return [
                                              ...prevProducts.slice(
                                                0,
                                                editMode.index
                                              ),
                                              updatedProduct,
                                              ...prevProducts.slice(
                                                editMode.index + 1
                                              ),
                                            ];
                                          })
                                        }
                                      >
                                        <option value="">Select option</option>
                                        <option value="20">20</option>
                                        <option value="40">40</option>
                                        <option value="50">50</option>
                                        <option value="60">60</option>
                                        <option value="89">80</option>
                                        <option value="100">100</option>
                                      </select>
                                      <span
                                        className="icon-cheveron-down"
                                        aria-hidden="true"
                                      ></span>
                                    </div>
                                  </div>
                                </li>
                              </div>
                            </ul>
                            <div className="modal-footer">
                              <div className="u-flex u-main-end u-gap-16">
                                <button
                                  className="button is-secondary"
                                  onClick={() => setShowModal(false)}
                                >
                                  <span className="text">Cancel</span>
                                </button>
                                <button
                                  className="button"
                                  type="submit"
                                  onClick={() => updateProduct(product.$id)}
                                >
                                  <span className="text">Update</span>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Delete button */}
                  <button
                    className="button is-text is-only-icon"
                    type="button"
                    aria-label="more options"
                    onClick={() => deleteProduct(product.$id)}
                  >
                    <span className="icon-trash" aria-hidden="true"></span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListProduct;
