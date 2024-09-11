import { Button, Modal, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import "../styles/ConfirmOrder.scss";
function ConfirmOrder({ open, handleClose, formData }) {
  const calculateTotal = (cartItems) => {
    return cartItems.reduce(
      (acc, item) => {
        acc.totalQuantity += item.quantity;
        acc.totalAmount += item.price * item.quantity;
        return acc;
      },
      { totalQuantity: 0, totalAmount: 0 }
    );
  };

  const handleCreateOrder = () => {
    toast.success("Order placed successfully!");
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose} className="modal-container">
      <Box
        className="modal-content"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          bgcolor: "#fff",
          boxShadow: 24,
          p: 4,
          borderRadius: "24px",
        }}
      >
        <Typography variant="h6" component="h2">
          Order Information
        </Typography>
        <Box sx={{ maxHeight: "70%", overflowX: "hidden" }}>
          <Box className="modal-card">
            <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
              Customer Information
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "" }}>
              <Box sx={{ flex: "0.7" }}>
                <Typography sx={{ mt: 0 }}>
                  <HiOutlineUser className="modal-icon" />
                  {formData.customerInfo.name}
                </Typography>
                <Typography>
                  <HiOutlineEnvelope className="modal-icon" />
                  {formData.customerInfo.email}
                </Typography>
              </Box>
              <Box sx={{ flex: "0.5" }}>
                <Typography>
                  <HiOutlinePhone className="modal-icon" />
                  {formData.customerInfo.phone}
                </Typography>
                <Typography>
                  <HiOutlineMapPin className="modal-icon" />
                  {formData.customerInfo.address}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="modal-card">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ flex: "0.6", fontWeight: "600" }}>
                Products
              </Typography>
              <Typography sx={{ flex: "0.2", fontWeight: "600" }}>
                Quantity
              </Typography>
              <Typography sx={{ flex: "0.2", fontWeight: "600" }}>
                Price
              </Typography>
            </Box>
            {formData.cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ flex: "0.6" }}>{item.name}</Typography>
                <Typography sx={{ flex: "0.2" }}> {item.quantity}</Typography>
                <Typography sx={{ flex: "0.2" }}>{item.price}</Typography>
              </Box>
            ))}
          </Box>

          <Box className="modal-card">
            <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
              Payment:
            </Typography>
            <Typography>
              Payment Method: {formData.paymentInfo.method.toUpperCase()}
            </Typography>
            {formData.paymentInfo.method === "cash" && (
              <Box>
                <Typography>
                  Amount Given by Customer: ${formData.paymentInfo.amountGiven}
                </Typography>
                <Typography>
                  Return amount to Customer: $
                  {(
                    formData.paymentInfo.amountGiven -
                    calculateTotal(formData.cartItems).totalAmount
                  ).toFixed(1)}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "right", gap: "12px" }}>
          <Button
            sx={{
              color: "#000",
              backgroundColor: "transparent",
              mt: 2,
              p: "8px 18px",
            }}
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, p: "8px 18px" }}
            onClick={handleCreateOrder}
          >
            Create Order
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ConfirmOrder;
