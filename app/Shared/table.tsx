import classNames from "classnames";
import React from "react";
import { uuid } from "uuidv4";

type Column = {
  key: string;
  label: string;
};

type Props = {
  columns: Column[];
  rowsData: { [key: string]: any }[];
};

const Table = ({ columns, rowsData }: Props) => {
  return (
    <div className="border overflow-hidden rounded-lg border-slate-800">
      <table className="table-auto border-none w-full rounded-lg border border-slate-700 rounded-md">
        <thead className="text-xs text-left">
          <tr className="bg-dark border-none">
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {rowsData.map((row, rowIndex) => (
            <tr key={uuid()}>
              {columns.map((column, index) => (
                <td
                  className={classNames(index > 0 && "text-center")}
                  key={column.key}>
                  {row[column.key] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
