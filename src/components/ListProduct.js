/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { client, account, databases } from "../../utils/web-init";
// import { ID } from "appwrite";

function ListProduct() {
  const [products, setProducts] = useState([]);

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
                <span className="tag">{product.productPrice}</span>
              </td>
              <td className="table-col is-only-desktop" data-title="Created">
                <time className="text">{product.productSize}</time>
              </td>
              <td className="table-col u-overflow-visible">
                <button
                  className="button is-text is-only-icon"
                  type="button"
                  aria-label="more options"
                  onClick={() => deleteProduct(product.$id)}
                >
                  <span className="icon-trash" aria-hidden="true"></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListProduct;

// export async function getServerProps(){
//   return {}
// }
