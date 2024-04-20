import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

const HoldingsRow = ({ holding }) => {
  const isNegativeChange = holding.latest_chg_pct < 0;

  return (
    <TableRow>
      <TableCell>{holding.name}</TableCell>
      <TableCell>{holding.ticker}</TableCell>
      <TableCell>{holding.asset_class}</TableCell>
      <TableCell>{holding.avg_price}</TableCell>
      <TableCell>{holding.market_price}</TableCell>
      <TableCell style={{ color: isNegativeChange ? "red" : "inherit" }}>
        {holding.latest_chg_pct}
      </TableCell>
      <TableCell>{holding.market_value_ccy}</TableCell>
    </TableRow>
  );
};

export default HoldingsRow;
