import * as React from "react";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { nodes } from '../components/data';

const CustomTable = () => {
  const data = { nodes };

  const theme = useTheme(getTheme());

  const COLUMNS = [

    { label: "Task", renderCell: (item) => item.name },
    
    {
      label: "Deadline",
      renderCell: (item) =>
        item.deadline.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
    },

    {
      label: "Complete",
      renderCell: (item) => item.isComplete.toString(),
    },

  ];

  return (
    <div>
      <CompactTable columns={COLUMNS} data={data} theme={theme} />
    </div>
  );
};

export default CustomTable;