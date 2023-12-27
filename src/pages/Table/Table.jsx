import React from "react";
import axios from "axios";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Filter from "./Filter";
import ButtonComp from "../../components/Button";

const DynamicTable = () => {
  const [data, setData] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(1);
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
        // accessorFn:() => {nam},
        accessorKey: "name.first",
        header: "Name",
        cell: (props) => <p>{props.getValue()}</p>,
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
    state: {
      columnFilters,
    },
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  const onFilterChange = (id, value) => {
    setColumnFilters((prev) =>
      prev.filter((f) => f.id !== id).concat({ id, value })
    );
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
      <div className="d-flex align-items-center justify-content-end">
        <ButtonComp
          label={"<"}
          style={{ backgroundColor: "transparent" }}
          onClick={() => table.previousPage()}
          variant="danger"
        />

        <div
          style={{
            backgroundColor: "green",
            height: 40,
            width: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="rounded"
        >
          <p
            style={{
              marginTop: 14,
              fontSize: 20,
              fontWeight: "bolder",
            }}
          >
            {table.getState().pagination.pageIndex + 1}
          </p>
        </div>

        <ButtonComp
          variant="danger"
          label={">"}
          onClick={() => table.nextPage()}
          style={{ backgroundColor: "transparent" }}
        />
        <div className="d-flex align-items-center justify-content-center">
          <p className="mt-2">Go to page</p>
          <input
            placeholder=""
            value={pageCount}
            onChange={(e) => {
              setPageCount(e.target.value);
              table.setPageIndex(pageCount);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default DynamicTable;
