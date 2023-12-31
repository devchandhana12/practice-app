import React from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CardComp from "../../components/Card";
import SubMenu from "../../components/SubMenu";
import ButtonComp from "../../components/Button";
export interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
  rating: {
    rate: string;
    count: string;
  };
}

const Home = () => {
  const [data, setData] = React.useState<Product[]>();
  const [categories, setCategories] = React.useState([]);
  const [cartValue, setCartValue] = React.useState<number>(0);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(
          "https://fakestoreapi.com/products"
        );
        console.log(productsResponse.data);
        setData(productsResponse.data);
      } catch (error) {
        console.log(error);
      }

      try {
        const categoriesResponse = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCart = () => {
    alert(cartValue);
    setCartValue(cartValue + 1);
  };
  const { user } = React.useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <Header user={user} />

      <div className="d-flex justify-conten-around">
        <SubMenu data={categories} setData={setData} />
        <div
          className="d-flex"
          style={{
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data?.length !== 0 ? (
            <div data-testid="cards">
              {data?.map((item) => (
                <div key={item?.id}>
                  <CardComp
                    style={{
                      height: 450,
                      width: 350,
                      margin: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.image}
                      className="img-fluid"
                      alt={item.title}
                      data-testid="itemImage"
                      style={{ height: 300, width: 400 }}
                    />
                    <p className="text-center fs-6 fst-italic mt-3 fw-bolder">
                      {item?.title?.toString().substring(0, 30) + "..."}
                    </p>
                    <div>
                      <div className="d-flex align-items-center">
                        <FaStar style={{ color: "#40F8FF" }} />
                        <div className="mt-4 m-2 d-flex">
                          <p className="fs-6 fw-normal fst-italic">
                            {item?.rating?.rate}
                          </p>
                          <p style={{ color: "#63686E" }} className="fw-bold">
                            ({item?.rating?.count})
                          </p>
                        </div>
                        <p className="d-flex align-items-center mt-2 m-2">
                          Price :{" "}
                          <p className="mt-3 ms-1" style={{ color: "#40F8FF" }}>
                            ${Math.round(parseInt(item?.price))}
                          </p>
                        </p>
                        <div className="ms-1">
                          <ButtonComp
                            label="-"
                            variant="danger"
                            color="black"
                            onClick={() => {
                              if (cartValue > 0) {
                                setCartValue(cartValue - 1);
                              }
                            }}
                            testId="addCart"
                          />
                          <ButtonComp
                            label={cartValue}
                            disabled
                            color="black"
                            testId="cartValue"
                          />
                          <ButtonComp
                            label="+"
                            variant="success"
                            color="black"
                            type="button"
                            onClick={handleCart}
                            testId="removeCart"
                          />
                        </div>
                      </div>
                    </div>
                  </CardComp>
                </div>
              ))}
            </div>
          ) : (
            <p data-testid="loading_text">Wait the data is loading</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
