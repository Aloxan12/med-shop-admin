import style from "@/shared/ui/AppTableSkeleton/style.module.scss";
import type { IHeaderData } from "@/shared/ui/AppTable/AppTable.tsx";
import { AppSkeleton } from "@/shared/ui/AppSkeletton/AppSkeletton.tsx";

interface AppTableSkeletonProps {
  rowCount: number;
  tableColumnsNames: IHeaderData[];
}

export const AppTableSkeleton = ({
  rowCount,
  tableColumnsNames,
}: AppTableSkeletonProps) => (
  <table className={style.myTable}>
    <thead>
      <tr className={style.head}>
        {tableColumnsNames.map((col) => (
          <th style={{ width: col.colWidth }} key={col.title}>
            {col.title}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {[...Array(rowCount)].map((_, idx) => (
        <tr key={idx}>
          {tableColumnsNames.map((col) => (
            <td key={col.title}>
              <AppSkeleton width={col.colWidth} height={"24px"} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
