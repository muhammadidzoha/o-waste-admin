import { Typography } from "@material-tailwind/react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import PropTypes from "prop-types";
import React, { useMemo } from "react";

const Table = ({ columnsData, tableData }) => {
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table className="w-full table-auto text-left">
        {table.getHeaderGroups().map((headerGroup) => (
          <thead key={headerGroup.id}>
            <tr>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="[&:nth-child(8)]:text-center last:text-center bg-lightPrimary p-4"
                >
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal leading-none"
                  >
                    {header.column.columnDef.header}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
        ))}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-4 border-b border-navy-800 max-w-[850px]"
                >
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Typography>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columnsData: PropTypes.array,
  tableData: PropTypes.array,
};

export default Table;
