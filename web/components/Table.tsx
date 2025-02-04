import { Eye } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

interface tableProps {
  columns: Array<{ field: string; headerName: string; width?: string }>;
  rows: Array<{ [key: string]: string | number }>;
  rounded?: boolean;
}

export const Table = ({ columns, rows, rounded = true }: tableProps) => {
  return (
    <div
      className={`overflow-x-auto border border-gray-300 ${
        !rounded ? "" : "rounded-lg"
      }`}
    >
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-white">
          <tr>
            {columns.map((column) => (
              <th
                key={column.field}
                className="text-left px-4 py-2 font-semibold border-b border-gray-300 "
              >
                {column.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#F0EEEE] ">
          {rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 transition-all border border-gray-300"
            >
              {columns.map((column) => (
                <td
                  key={column.field}
                  className={`text-left px-4 py-2 border-b border-gray-300 `}
                  style={{
                    minWidth: column.width ? column.width + "px" : "unset",
                  }}
                >
                  {column.field === "observacoes" ? (
                    <span className="truncate w-[150px] block">
                      {row[column.field]}
                    </span>
                  ) : column.field === "buttonAlert" ? (
                    <button className="flex items-center justify-center">
                      🔔
                    </button>
                  ) : column.field === "buttonEdit" ? (
                    <Link
                      href={row[column.field] as string}
                      className="flex items-center justify-center"
                    >
                      <Eye size={20} />
                    </Link>
                  ) : (
                    row[column.field]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
