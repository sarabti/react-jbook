import { Fragment } from 'react';
import { useTypedSelector } from '../state/hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import type { Cell } from '../state';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id: string | number) => data[id])
  );

  const renderedCells = cells.map((cell: Cell) => (
    <Fragment key={cell.id}>
      {/* <AddCell nextCellId={cell.id} /> */}
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <div>
      {renderedCells}
      {/* <AddCell forceVisible={cells.length === 0} nextCellId={null} /> */}
    </div>
  );
};

export default CellList;
