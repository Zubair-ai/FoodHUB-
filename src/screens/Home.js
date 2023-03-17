import React, { useEffect, useState } from "react";
import Carousels from "../components/Carousels";
import Footer from "../components/Footer";
import MealCard from "../components/MealCard";
import Navbar from "../components/Navbar";
import { CartContextProvider } from "../Store/UseContext";

export default function Home() {
  const [foodcate, setFoodCate] = useState([]);
  const [fooditem, setFoodItem] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  useEffect(() => {
    const loadData = async () => {
      const response = fetch("http://localhost:5000/api/displaydata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await (await response).json();
      // console.log(data[0], data[1]);
      setFoodCate(data[1]);
      setFoodItem(data[0]);
    };
    loadData();
  }, []);

  return (
    <CartContextProvider>
      <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousels setSearchItem={setSearchItem} />
      </div>
      <div className="contnainer ">
        {foodcate !== []
          ? foodcate.map((data) => {
              return (
                <div className="row">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {fooditem !== []
                    ? fooditem
                        .filter((fooddata) => {
                          return fooddata.CategoryName === data.CategoryName && fooddata.name.toLowerCase().includes(searchItem.toLowerCase());
                        })
                        .map((item) => {
                          return (
                            <div
                              className="col-12 col-md-6 col-lg-4 "
                              key={item._id}
                            >
                              <MealCard foodname={item.name} id={item._id} image={item.img} description={item.description} options={item.options} />
                            </div>
                          ); // add return statement
                        })
                    : ""}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
    </CartContextProvider>
  );
}
