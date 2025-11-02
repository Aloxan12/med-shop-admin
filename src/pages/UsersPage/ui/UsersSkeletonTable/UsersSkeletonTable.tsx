import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import style from "./style.module.scss";

const columns = [
  { name: "Id", width: "40%" },
  { name: "Email", width: "20%" },
  { name: "Role", width: "40%" },
];
const rowCount = 1;

export const UsersSkeletonTable = () => (
  <table className={style.myTable}>
    <thead>
      <tr className={style.head}>
        {columns.map((col) => (
          <th style={{ width: col.width }} key={col.name}>
            {col.name}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {[...Array(rowCount)].map((_, idx) => (
        <tr key={idx}>
          {columns.map((col) => (
            <td key={col.name}>
              <Skeleton width={col.width} height={"15px"} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
