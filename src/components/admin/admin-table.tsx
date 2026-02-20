import React from "react";

interface AdminTableProps {
  headers: string[];
  children: React.ReactNode;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  headers,
  children,
}) => {
  return (
    <div className="bg-background border border-border rounded-sm overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">{children}</tbody>
      </table>
    </div>
  );
};
