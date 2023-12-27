import React from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CardComp from "../../components/Card";
import SubMenu from "../../components/SubMenu";
import ButtonComp from "../../components/Button";
interface Product {
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
  const [data, setData] = React.useState<Product[] | undefined>(undefined);
  const [categories, setCategories] = React.useState([]);
  const [cartValue, setCartValue] = React.useState<number>(0);
  React.useEffect(() => {
    (async () => {
      await axios
        .get("https://fakestoreapi.com/products")
        .then((res) => setData(res.data))
        .catch((error) => console.log(error));
      await axios
        .get("https://fakestoreapi.com/products/categories")
        .then((res) => setCategories(res.data))
        .catch((e) => console.log(e));
    })();
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

      <div className="d-flex">
        <SubMenu data={categories} />
        <div
          className="d-flex"
          style={{
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
                      />
                      <ButtonComp label={cartValue} disabled color="black" />
                      <ButtonComp
                        label="+"
                        variant="success"
                        color="black"
                        type="button"
                        onClick={handleCart}
                      />
                    </div>
                  </div>
                </div>
              </CardComp>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
