import React from "react";
import axios from "axios";
import { Product } from "../../pages/Home";
interface SubmenuProps {
  data?: string[] | undefined;
  setData?: React.Dispatch<React.SetStateAction<Product[] | undefined>>;
}
const SubMenu: React.FC<SubmenuProps> = ({ data, setData }) => {
  const [choice, setChoice] = React.useState<string>("");
  console.log(choice);
  console.log(data);
  React.useEffect(() => {
    if (choice !== "") {
      (async () => {
        try {
          const response = await axios.get(
            `https://fakestoreapi.com/products/category/${choice}`
          );
          if (setData) {
            setData(response?.data);
          }
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choice]);

  return (
    <div
      className=""
      style={{
        // backgroundColor: "teal",
        height: "100vh",
        left: 0,
        zIndex: 1,
        width: 400,
      }}
    >
      {data?.map((item, index) => (
        <div
          style={{
            width: 200,
            boxShadow: "revert-layer",
            borderWidth: 1,
            borderColor: "red",
            borderStyle: "solid",
            margin: 3,
            borderRadius: 15,
            transition: "ease-in",
            cursor: "pointer",
          }}
        >
          <p
            key={index}
            className="text-white p-2 m-1"
            onClick={() => setChoice(item)}
            data-testid="menu"
          >
            {item}
          </p>
        </div>
      ))}
    </div>
  );
};
export default SubMenu;
