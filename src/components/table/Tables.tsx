import DataTable from 'react-data-table-component';
import Paginations from '../pagination/Paginations';
import styles from './tables.module.css';

const estilos = {
  headCells: {
    style: {
      backgroundColor: '#278a7c',
      fontWeight: 'bold',
      fontSize: 14,
      color: '#fff',
      paddingLeft: '8px', // Adjust this value for header padding
      paddingRight: '8px'
    }
  },
  rows: {
    style: {
      backgroundColor: '#fff',
      '& >  div *': {
        whiteSpace: 'normal !important',
        wordBreak: 'keep-all'
      },
      '&:hover': {
        backgroundColor: '#e1e1e1'
      }
    }
  },
  table: {
    style: {
      borderRadius: '10px',
      overflow: 'hidden'
    }
  },
  cells: {
    style: {
      paddingLeft: '8px', // Adjust this value as needed
      paddingRight: '8px' // Adjust this value as needed
    }
  }
};

export default function Tables(props: any) {
  const {
    datas,
    columns,
    isSelectableRows = false,
    isPersistTableHead = false,
    setSelectedRows,
    setCurrentPage,
    currentPage,
    onSort,
    total,
    perPage
  } = props;

  const handleSelectedRowsChange = (selectedRows) => {
    setSelectedRows && setSelectedRows(selectedRows);
  };

  const noDataComponent = <span style={{ padding: '20px' }}>{'There is no data available.'}</span>;

  return (
    <div className={styles.tables}>
      <DataTable
        persistTableHead={isPersistTableHead}
        noDataComponent={noDataComponent}
        columns={columns}
        data={datas}
        selectableRows={isSelectableRows}
        onSelectedRowsChange={handleSelectedRowsChange}
        fixedHeader
        fixedHeaderScrollHeight="100%"
        highlightOnHover
        selectableRowsHighlight
        noHeader
        onSort={onSort}
        sortServer
        customStyles={estilos}
      />
      {total > perPage && (
        <div className={styles.pagination}>
          <Paginations
            pageSize={perPage}
            totals={total ?? ''}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
