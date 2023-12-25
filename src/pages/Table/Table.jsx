import React from "react";
import axios from "axios";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import Filter from "./Filter";

const DynamicTable = () => {
  const [data, setData] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      await axios
        .get("https://randomuser.me/api/?results=100")
        .then((res) => {
          console.log(res.data.results);
          setData(res.data.results);
        })
        .catch((err) => console.error(err));
    })();
  }, []);

  const table = useReactTable({
    data,
    getCoreRowModel: getCoreRowModel(),
    columns: [
      {
        accessorKey: "picture",
        header: "Picture",
        cell: (props) => (
          <div>
            <img src={props.getValue()?.thumbnail} alt="profile pic" />
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (props) => <p>{props.getValue().first}</p>,
      },
      {
        accessorKey: "login",
        header: "UserName",
        cell: (props) => <p>{props.getValue().username}</p>,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        cell: (props) => <p>{props.getValue()}</p>,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: (props) => <p>{props.getValue()}</p>,
      },
    ],
    meta: {
      viewData: (rowIndex, columnId, value) => {
        console.log("Viewdata", rowIndex, columnId, value);
      },
      updateData: (rowIndex, columnId, value) => {
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex ? { ...row, [columnId]: value } : row
          )
        );
      },
    },
    state: { columnFilters },
    getFilteredRowModel: getFilteredRowModel(),
  });
  const onFilterChange = (id, value) => {
    setColumnFilters((prev) => prev.filter((f) => f.id !== id));
  };
  return (
    <div>
      <Filter
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        onFilterChange={onFilterChange}
      />
      <table style={{}}>
        <thead>
          {table.getHeaderGroups().map((header) => (
            <tr
              key={header.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {header.headers.map((item) => (
                <th
                  key={item.id}
                  style={{
                    width: item.getSize(),
                    padding: 10,
                    textAlign: "center",
                    backgroundColor: "gray",
                  }}
                >
                  {item.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr key={row.id} style={{}}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    padding: 10,
                    width: cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default DynamicTable;
