import { useState, useEffect } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { toast } from "react-toastify";

import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Divider,
  IconButton,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";

import InputBase from "@mui/material/InputBase";
import "../styles/CreateOrder.scss";
import SearchSuggest from "./SearchSuggest";
import CartTable from "./CartTable";
import ConfirmOrder from "./ConfirmOrder";
function CreateOrder() {
  const [focusSearch, setFocusSearch] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dataProducs, setDataProducs] = useState("");
  const [formData, setFormData] = useState({
    customerInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    cartItems: [],
    paymentInfo: {
      method: "",
      amountGiven: "",
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleAddItem = (dataItem) => {
    setFormData((prevData) => {
      const existingItem = prevData.cartItems.find(
        (item) => item.id === dataItem.id
      );

      if (existingItem) {
        return {
          ...prevData,
          cartItems: prevData.cartItems.map((item) =>
            item.id === dataItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...prevData,
          cartItems: [
            ...prevData.cartItems,
            {
              id: dataItem.id,
              name: dataItem.title,
              quantity: 1,
              price: dataItem.price,
              image: dataItem.image,
            },
          ],
        };
      }
    });
  };
  const handleRemoveItem = (id) => {
    setFormData((prevData) => ({
      ...prevData,
      cartItems: prevData.cartItems.filter((item) => item.id !== id),
    }));
  };
  const handleChangeItem = (id, newQuantity, newPrice) => {
    setFormData((prevData) => ({
      ...prevData,
      cartItems: prevData.cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity, price: newPrice }
          : item
      ),
    }));
  };

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
  useEffect(() => {
    fetchDataProducs();
  }, []);
  const fetchDataProducs = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    console.log(res);
    if (res.status === 200 && res.data.length > 0) {
      setDataProducs(res.data);
    } else {
      console.log("error");
    }
  };

  const searchTitles = (keyword) => {
    if (!keyword) return setSearch("");

    const lowercasedKeyword = keyword.toLowerCase();
    return dataProducs.filter((item) =>
      item.title.toLowerCase().includes(lowercasedKeyword)
    );
  };
  const handleSearch = (keyword) => {
    const data = searchTitles(keyword);
    setSearch(data);
  };
  const hasMissingValues = (data) => {
    for (const key in data.customerInfo) {
      if (!data.customerInfo[key]) {
        return true;
      }
    }

    for (const item of data.cartItems) {
      for (const key in item) {
        if (!item[key]) {
          return true;
        }
      }
    }

    if (!data.paymentInfo.method) {
      return true;
    }

    return false;
  };
  const handleSubmit = () => {
    if (!validateEmail(formData.customerInfo.email)) {
      toast.warning(
        "Invalid email address. Please check your entry and try again."
      );
      return;
    }
    if (!hasMissingValues(formData)) {
      setModalOpen(true);
    } else {
      toast.warning(
        "Sorry, some required fields are missing. Please check again."
      );
    }
  };
  const validateEmail = (str) => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return str.match(validRegex) ? true : false;
  };
  return (
    <Container className="form-container">
      <Box className="form-card">
        <Typography variant="h5" gutterBottom>
          Customer Information
        </Typography>
        <form className="form-content">
          <TextField
            sx={{ flex: "1 1 calc(50% - 24px)", m: 0 }}
            label="Customer Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="customerInfo.name"
            value={formData.customerInfo.name}
            onChange={handleChange}
          />
          <TextField
            sx={{ flex: "1 1 calc(50% - 24px)", m: 0 }}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="customerInfo.email"
            value={formData.customerInfo.email}
            onChange={handleChange}
          />
          <TextField
            sx={{ flex: "1 1 calc(50% - 24px)", m: 0 }}
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="customerInfo.phone"
            value={formData.customerInfo.phone}
            onChange={handleChange}
          />
          <TextField
            sx={{ flex: "1 1 calc(50% - 24px)", m: 0 }}
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            name="customerInfo.address"
            value={formData.customerInfo.address}
            onChange={handleChange}
          />
        </form>
      </Box>

      <Box className="form-card">
        <Typography variant="h5" gutterBottom>
          Order Detail
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "50%",
              border: "1px solid #d3d3d3",
              borderRadius: "12px",
              position: "relative",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              onFocus={() => setFocusSearch(true)}
              onBlur={() =>
                setTimeout(() => {
                  setFocusSearch(false);
                }, 100)
              }
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <HiMagnifyingGlass />
            </IconButton>
            {focusSearch && (
              <Box className="search-suggest">
                <SearchSuggest
                  data={search ? search : dataProducs}
                  handleAddItem={handleAddItem}
                />
              </Box>
            )}
          </Box>
        </Box>
        <CartTable
          dataCart={formData.cartItems}
          handleChangeItem={handleChangeItem}
          handleRemoveItem={handleRemoveItem}
        />
        <Box sx={{ m: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
            <Typography sx={{ flex: "0.3" }}>SubTotal</Typography>
            <Typography sx={{ flex: "0.3" }}>
              {calculateTotal(formData.cartItems).totalQuantity} Item
            </Typography>
            <Typography sx={{ flex: "0.4", textAlign: "right" }}>
              ${calculateTotal(formData.cartItems).totalAmount.toFixed(1)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
            <Typography sx={{ flex: "0.3" }}>Discount</Typography>
            <Typography sx={{ flex: "0.3" }}>New customer</Typography>
            <Typography sx={{ flex: "0.4", textAlign: "right" }}>
              $0.00
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
            <Typography sx={{ flex: "0.3" }}>Shipping or delivery</Typography>
            <Typography sx={{ flex: "0.3" }}>Free shipping</Typography>
            <Typography sx={{ flex: "0.4", textAlign: "right" }}>
              $0.00
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
            <Typography sx={{ fontWeight: "bold" }}>Total</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              ${calculateTotal(formData.cartItems).totalAmount.toFixed(1)}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="form-card">
        <Typography variant="h5" gutterBottom>
          Payment
        </Typography>
        <Container>
          <FormControl component="fieldset">
            <FormLabel component="legend">Payment Methods</FormLabel>
            <RadioGroup
              aria-label="payment-method"
              name="paymentInfo.method"
              value={formData.paymentInfo.method}
              onChange={handleChange}
            >
              <FormControlLabel value="cash" control={<Radio />} label="Cash" />
              <FormControlLabel value="card" control={<Radio />} label="Card" />
            </RadioGroup>
          </FormControl>

          {formData.paymentInfo.method === "cash" && (
            <TextField
              label="Amount received by Customer"
              variant="outlined"
              type="number"
              name="paymentInfo.amountGiven"
              value={formData.paymentInfo.amountGiven}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
          )}

          {formData.paymentInfo.method === "cash" &&
            formData.paymentInfo.amountGiven && (
              <Typography variant="body1" color="primary">
                {formData.paymentInfo.amountGiven -
                  calculateTotal(formData.cartItems).totalAmount >=
                0
                  ? `Change to be returned to Customer: ${parseFloat(
                      formData.paymentInfo.amountGiven -
                        calculateTotal(formData.cartItems).totalAmount
                    ).toFixed(1)}$`
                  : `The amount given is not enough. Please provide at least ${
                      calculateTotal(formData.cartItems).totalAmount
                    } $.`}
              </Typography>
            )}
        </Container>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
          onClick={handleSubmit}
        >
          Payment
        </Button>
      </Box>

      <ConfirmOrder
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        formData={formData}
      />
    </Container>
  );
}

export default CreateOrder;
