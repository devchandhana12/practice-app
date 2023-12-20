import React from "react";
import axios from "axios";
interface SubmenuProps {
  data?: string[] | undefined;
}
const SubMenu: React.FC<SubmenuProps> = ({ data }) => {
  const [choice, setChoice] = React.useState<string>("");
  console.log(choice);
  console.log(data);
  React.useEffect(() => {
    if (choice) {
      (async () => {
        await axios
          .get(`https://fakestoreapi.com/products/category/${choice}`)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setChoice]);
  return (
    <div
      className=""
      style={{
        // width: 500,
        backgroundColor: "black",
        height: "100vh",
        // padding: 3,
        left: 0,
        zIndex: 1,
      }}
    >
      {data?.map((item, index) => (
        <p key={index} className="text-white" onClick={() => setChoice(item)}>
          {item}
        </p>
      ))}
    </div>
  );
};
export default SubMenu;
