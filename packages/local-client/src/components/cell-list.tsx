import "./cell-list.css";
import { Fragment } from "react";
import { useTypedSelector } from "../state/hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import type { Cell } from "../state";
import AddCell from "./add-cell";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) =>
    cells?.order.map((id: string | number) => cells?.data[id])
  );

  const renderedCells = cells?.map((cell: Cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells?.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
