/**
 * custom styling for all react-data-table-components
 * template is from the react-data-table-component docs
 * available here https://www.npmjs.com/package/react-data-table-component
 */

export const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
      fontSize: "2rem",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      fontSize: "2rem",
      fontWeight: "bold",
      background: "#341671",
      color: "#FFFFFF",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};
