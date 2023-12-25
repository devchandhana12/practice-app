import React, { useEffect } from "react";
import axios from "axios";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import Filter from "./Filter";
import { data as FData } from "./data";
import DynamicTable from "./Table";

// TODO: practice filtering, sorting and pagination tomorrow = 22/12/23
// FIXME: Also, use memo and other hooks to resolve the issue
const Table = () => {
  const [data, setData] = React.useState(FData);
  const [columnFilters, setColumnFilters] = React.useState([]);

  // api call
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://randomuser.me/api/?results=100"
  //       );
  //       setData(response.data.results);
  //       console.log(response.data.results);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [setData]);

  // Define custom cell renderer for the "Name and Email" column
  const nameAndEmailCellRenderer = (props) => {
    const email = props.row.original.email;
    const name = `${props.row.original.name.first} ${props.row.original.name.last}`;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>{email}</p>
        <p>{name}</p>
      </div>
    );
  };

  // table instance
  const table = useReactTable({
    data,
    columns: [
      {
        accessorKey: "id",
        header: "ID",
        cell: (props) => (
          <p style={{ textAlign: "center" }}>{props.getValue()}</p>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (props) => (
          <p style={{ textAlign: "center" }}>{props.getValue()}</p>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (props) => (
          <p style={{ textAlign: "center" }}>{props.getValue()}</p>
        ),
      },
      {
        accessorKey: "passed",
        header: "Passed",
        cell: (props) => (
          <p
            style={{
              textAlign: "center",
              backgroundColor: props.getValue() === true ? "teal" : "purple",
              borderRadius: 10,
            }}
          >
            {props.getValue() === true ? "Yes" : "No"}
          </p>
        ),
      },
    ],
    // columns: [
    //   {
    //     accessorKey: "picture",
    //     Header: "Picture",
    //     cell: (props) => (
    //       <div>
    //         <img
    //           src={props.getValue()?.medium}
    //           alt="person logo"
    //           style={{ borderRadius: 30 }}
    //         />
    //       </div>
    //     ),
    //   },
    //   {
    //     accessorKey: "name",
    //     Header: "Contact Info",
    //     cell: nameAndEmailCellRenderer,
    //   },
    //   {
    //     accessorKey: "gender",
    //     Header: "Gender",
    //     cell: (props) => (
    //       <p
    //         style={{
    //           backgroundColor: props.getValue() === "male" ? "teal" : "purple",
    //           textAlign: "center",
    //           borderRadius: 10,
    //         }}
    //       >
    //         {props.getValue()}
    //       </p>
    //     ),
    //   },
    //   {
    //     accessorKey: "location",
    //     Header: "Location",
    //     cell: (props) => (
    //       <p style={{ textAlign: "center" }}>{props.getValue().street.name}</p>
    //     ),
    //   },
    //   {
    //     accessorKey: "action",
    //     Header: "Action",
    //     cell: (props) => (
    //       <button
    //         type="button"
    //         class="btn btn-outline-info"
    //         onClick={() => {
    //           const rowIndex = props.row.index;
    //           const columnId = "action"; // Assuming "action" is the accessorKey
    //           const value = props.row.original; // The entire row data

    //           // Call the viewData function with the parameters
    //           table.options.meta.viewData(rowIndex, columnId, value);
    //         }}
    //       >
    //         know more
    //       </button>
    //     ),
    //   },
    // ],
    // to update table content, lets try this out
    meta: {
      // Define the viewData function
      viewData: (rowIndex, columnId, value) => {
        console.log("View Data:", { rowIndex, columnId, value });
        // Add your logic to handle the row data here
      },
      updateData: (rowIndex, columnId, value) => {
        // eslint-disable-next-line no-undef
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex ? { ...row, [columnId]: value } : row
          )
        );
      },
    },
    state: {
      columnFilters,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });
  const onFilterChange = (id, value) => {
    setColumnFilters((prev) =>
      prev.filter((f) => f.id !== id).concat({ id, value })
    );
    console.log(data);
  };
  console.log(columnFilters);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* <Filter
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        onFilterChange={onFilterChange}
      /> */}
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
      </div> */}
      <DynamicTable />
    </div>
  );
};

export default Table;
