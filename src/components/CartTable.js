import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";

export default function CartTable({
  dataCart,
  handleChangeItem,
  handleRemoveItem,
}) {
  const handleOnChange = (id, newQuantity, newPrice) => {
    const quantity = parseInt(newQuantity, 10);
    const price = parseInt(newPrice, 10);
    handleChangeItem(id, quantity, price);
  };

  const totalProduct = (quantity, price) => {
    const result = Math.floor(quantity * price * 100) / 100;
    return result === null || Number.isNaN(result) ? 0 : result;
  };
  return (
    <TableContainer component={Paper} className="cart-table-container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "50%", fontWeight: "bold" }}>
              Products
            </TableCell>
            <TableCell align="center" sx={{ width: "10%", fontWeight: "bold" }}>
              Price
            </TableCell>
            <TableCell align="center" sx={{ width: "10%", fontWeight: "bold" }}>
              Quantity
            </TableCell>
            <TableCell align="center" sx={{ width: "10%", fontWeight: "bold" }}>
              Total
            </TableCell>
            <TableCell
              align="right"
              sx={{ width: "6%", fontWeight: "bold" }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataCart &&
            dataCart.length > 0 &&
            dataCart.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div className="table-row-img">
                    <img src={item.image} />
                  </div>
                  <p>{item.name}</p>
                </TableCell>
                <TableCell align="center">
                  <input
                    style={{
                      width: "100px",
                      textAlign: "center",
                      padding: "8px",
                      borderRadius: "8px",
                      border: "1px solid #d3d3d3",
                    }}
                    type="number"
                    value={item.price}
                    align="center"
                    onChange={(e) =>
                      handleOnChange(item.id, item.quantity, e.target.value)
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <input
                    style={{
                      width: "60px",
                      textAlign: "center",
                      padding: "8px",
                      borderRadius: "8px",
                      border: "1px solid #d3d3d3",
                    }}
                    type="number"
                    value={item.quantity}
                    align="center"
                    onChange={(e) =>
                      handleOnChange(item.id, e.target.value, item.price)
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  {totalProduct(item.quantity, item.price)}
                </TableCell>
                <TableCell align="center" sx={{ width: "6%" }}>
                  <div
                    className="cart-btn"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <HiOutlineArchiveBoxXMark className="cart-btn-icon" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
