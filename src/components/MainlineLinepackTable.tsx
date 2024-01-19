import { GasMainlineLinepackDto } from "@/app/model/gasDataModels";
import React from "react";
interface IProps {
  mainlineLinepack: GasMainlineLinepackDto;
}
const MainlineLinepackTable: React.FC<IProps> = ({ mainlineLinepack }) => {
  return (
    <>
      <table>
        <body>
          <tr>
            <th>p </th>
            <td>q </td>
          </tr>
        </body>
      </table>
    </>
  );
};

export default MainlineLinepackTable;
