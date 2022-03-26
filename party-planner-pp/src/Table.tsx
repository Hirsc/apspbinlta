import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

function createData(
  name: string,
  monday: boolean,
  tuesday: boolean,
  wednesday: boolean,
  thursday: boolean,
  friday: boolean,
  saturday: boolean,
  sunday: boolean
) {
  return {
    name,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  };
}

const rows = [
  createData("Kai", true, false, false, true, true, false, true),
  createData("Vico", false, false, true, true, false, false, true),
];

let total = 0;

const spalten = rows.reduce(
  (acc, row, index) => {
    acc["monday"] = row.monday === true ? acc["monday"] + 1 : acc["monday"];
    acc["tuesday"] = row.tuesday === true ? acc["tuesday"] + 1 : acc["tuesday"];
    acc["wednesday"] =
      row.wednesday === true ? acc["wednesday"] + 1 : acc["wednesday"];
    acc["thursday"] =
      row.thursday === true ? acc["thursday"] + 1 : acc["thursday"];
    acc["friday"] = row.friday === true ? acc["friday"] + 1 : acc["friday"];
    acc["saturday"] =
      row.saturday === true ? acc["saturday"] + 1 : acc["saturday"];
    acc["sunday"] = row.sunday === true ? acc["sunday"] + 1 : acc["sunday"];

    return acc;
  },
  {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
  }
);

console.log([1, 2, 3, 4].reduce((acc, value) => acc + value));

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>KW 1</TableCell>
            <TableCell align="right">Montag</TableCell>
            <TableCell align="right">Dienstag</TableCell>
            <TableCell align="right">Mittwoch</TableCell>
            <TableCell align="right">Donnerstag</TableCell>
            <TableCell align="right">Freitag</TableCell>
            <TableCell align="right">Samstag</TableCell>
            <TableCell align="right">Sonntag</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                {row.monday}
                <Checkbox checked={row.monday} />
              </TableCell>
              <TableCell align="right">
                {row.tuesday}
                <Checkbox checked={row.tuesday} />
              </TableCell>
              <TableCell align="right">
                {row.wednesday}
                <Checkbox checked={row.wednesday} />
              </TableCell>
              <TableCell align="right">
                {row.thursday}
                <Checkbox checked={row.thursday} />
              </TableCell>
              <TableCell align="right">
                {row.friday}
                <Checkbox checked={row.friday} />
              </TableCell>
              <TableCell align="right">
                {row.saturday}
                <Checkbox checked={row.saturday} />
              </TableCell>
              <TableCell align="right">
                {row.sunday}
                <Checkbox checked={row.sunday} />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">
              <b>Total:</b> {spalten.monday}
            </TableCell>
            <TableCell align="right">
              <b>Total:</b> {total}
            </TableCell>
            <TableCell align="right">
              <b>Total:</b> {total}
            </TableCell>
            <TableCell align="right">
              <b>Total:</b> {total}
            </TableCell>
            <TableCell align="right">
              <b>Total:</b> {total}
            </TableCell>
            <TableCell align="right">
              <b>Total:</b> {total}
            </TableCell>
            <TableCell align="right">
              <b>Total:</b> {total}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
