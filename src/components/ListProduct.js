"use client";
import { useEffect, useState, useRef } from "react";
import { client, account, databases } from "../../utils/web-init";
import Image from "next/image";

function ListProduct() {
  const [products, setProducts] = useState([]);
  const space = useRef("2")

  const getProduct = async () => {
    const { products } = await databases
      .listDocuments("646b75921f4c1d8f9970", "646b76a75c344008e43c")
      .then(
        function (products) {
          console.log("anything that shows it worked", products); // Success
        },
        function (error) {
          console.log(error); // Failure
        }
      );
    setProducts(products);
    return products;
  };

  // useEffect(() => {
  //   const run=async()=>{
  //     const data=await getProduct()
  //     setProducts(data.products)
  //   }
  //   run()
  // }, []);

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
      <div
        className="card u-flex u-main-space-between"
        style={{
          boxShadow: "var(--shadow-small)",
          paddingTop: "11px",
          paddingBottom: "11px",
          paddingLeft: "30px",
          paddingRight: "30px",
          borderRadius: "var(--border-radius-small)",
          marginBottom: "15px",
        }}
      >
        {products.map((product)=>{})}
        <section className="u-flex u-cross-center">
          <div
            className="u-flex u-main-center u-cross-center"
            style={{
              height: "40px",
              width: "40px",
              backgroundColor: "#E084A9",
              borderRadius: "var(--border-radius-circular)",
              marginRight: "30px",
            }}
          >
            <p
              className="u-bold"
              style={{
                color: "hsl(var(--color-neutral-0))",
                letterSpacing: "4.5%",
              }}
            >
              {/* {productImage} */}
            </p>
          </div>
          <div>
            <p
              className="u-bold text"
              style={{
                color: "hsl(var(--color-neutral-500))",
                marginBottom: "7px",
                textTransform: "capitalize",
              }}
            >
              {/* {productName} */}
            </p>
            <p className="text" style={{ marginBottom: "7px" }}>
              {/* {productDesc} */}
            </p>
          </div>
        </section>
        <section>
          <div
            className="u-flex u-cross-center"
            style={{ marginBottom: "8px" }}
          >
            <p className="icon-book-open" style={{ marginRight: "15px" }}></p>
            {/* <h5 className="u-bold">USD {productPrice}</h5> */}
          </div>
          <div
            className="u-bold"
            style={{
              paddingTop: "4px",
              paddingBottom: "4px",
              paddingLeft: "18px",
              paddingRight: "18px",
              backgroundColor: "#DDDDFB",
              color: "#5D5FEF",
              textTransform: "uppercase",
              borderRadius: "var(--border-radius-medium)",
              fontSize: "10px",
            }}
          >
            {/* {productSize} */}
          </div>

          <div class="">
            {/* <span class="text">{{ item }}</span> */}
            <div class="u-flex u-main-end u-cross-center u-row-gap-32 u-padding-inline-12 u-cursor-pointer">
              <span
                class="icon-pencil"
                aria-hidden="true"
                style={{ 'marginRight': space + 'em' }}
              ></span>
              <span class="icon-trash" aria-hidden="true"></span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ListProduct;

// export async function getServerProps(){
//   return {}
// }