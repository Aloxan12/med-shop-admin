import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import style from "@/shared/ui/AppTableSkeleton/style.module.scss";
import type { tableColumnsNamesType } from "@/entities/Users/ui/UsersTable/UsersTable.tsx";

interface AppTableSkeletonProps {
  rowCount: number;
  tableColumnsNames: tableColumnsNamesType[];
}

export const AppTableSkeleton = ({
  rowCount,
  tableColumnsNames,
}: AppTableSkeletonProps) => (
  <table className={style.myTable}>
    <thead>
      <tr className={style.head}>
        {tableColumnsNames.map((col) => (
          <th style={{ width: col.width }} key={col.name}>
            {col.name}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {[...Array(rowCount)].map((_, idx) => (
        <tr key={idx}>
          {tableColumnsNames.map((col) => (
            <td key={col.name}>
              <Skeleton width={col.width} height={"15px"} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
