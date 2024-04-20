import React , { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
} 
from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import HoldingsRow from "./HoldingsRow";
const HoldingsTable = () => {
  const [holdings, setHoldings] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    axios
      .get("https://canopy-frontend-task.now.sh/api/holdings")
      .then((response) => {
        setHoldings(response.data.payload);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleExpand = (assetClass) => {
    setExpanded((prevExpand) => ({
      ...prevExpand,
      [assetClass]: !prevExpand[assetClass],
    }));
  };

  const renderGroupedHoldings = () => {
    const groups = {};
    holdings.forEach((holding) => {
      if (!groups[holding.asset_class]) {
        groups[holding.asset_class] = [];
      }
      groups[holding.asset_class].push(holding);
    });

    return Object.entries(groups).map(([assetClass, holdingsInGroup]) => (
      <React.Fragment key={assetClass}>
        <TableRow>
          <TableCell colSpan={7}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleExpand(assetClass)}
            >
              {expanded[assetClass] ? (
                <KeyboardArrowUp />
              ) : (
                <KeyboardArrowDown />
              )}
            </IconButton>
            <b>{`${assetClass} (${holdingsInGroup.length})`}</b>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={7}>
            <Collapse in={expanded[assetClass]} timeout="auto" unmountOnExit>
              <Table aria-label="grouped holdings">
                <TableHead>
                  <TableRow>
                    <TableCell>Name of the Holding</TableCell>
                    <TableCell>Ticker</TableCell>
                    <TableCell>Asset Class</TableCell>
                    <TableCell>Average Price</TableCell>
                    <TableCell>Market Price</TableCell>
                    <TableCell>Latest Change Percentage</TableCell>
                    <TableCell>Market Value in Base CCY</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {holdingsInGroup.map((holding) => (
                    <HoldingsRow key={holding.name} holding={holding} />
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    ));
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="holdings table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Ticker</TableCell>
            <TableCell>Asset Class</TableCell>
            <TableCell>Average Price</TableCell>
            <TableCell>Market Price</TableCell>
            <TableCell>Latest Change %</TableCell>
            <TableCell>Market Value CCY</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderGroupedHoldings()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default HoldingsTable;
