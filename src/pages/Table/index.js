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
const Table = () => {
  const [data, setData] = React.useState(FData);
  const [columnFilters, setColumnFilters] = React.useState([]);

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
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* <Filter
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        onFilterChange={onFilterChange}
      />
      <div
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
