import { TextField, ThemeProvider, createTheme } from "@mui/material";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";

function BookingForm() {
  const [formData, setFormData] = useState(null);

  const theme = createTheme({
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            "&::placeholder": {
              color: "#BB3B3B",
              fontWeight: "bold",
              fontSize: "0.85rem",
              marginBottom: "1.8rem",
            },
          },
        },
      },
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {};
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-12 border-2 border-orange-400 rounded-2xl p-12 bg-orange-form-bg"
    >
      <div className=" grid grid-cols-2 grid-rows-3 gap-10">
        <ThemeProvider theme={theme}>
          <TextField
            color="warning"
            variant="standard"
            id="name"
            name="name"
            placeholder="Name"
            value={formData?.name || ""}
            onChange={handleChange}
          />
          <TextField
            color="warning"
            variant="standard"
            id="phone"
            name="phone"
            type="number"
            placeholder="Phone Number"
            value={formData?.phone || ""}
            onChange={handleChange}
          />
          <TextField
            color="warning"
            variant="standard"
            id="visitors"
            name="visitors"
            type="number"
            placeholder="No. of Visitors"
            value={formData?.visitors || ""}
            onChange={handleChange}
          />
          <TextField
            color="warning"
            variant="standard"
            id="children"
            name="children"
            type="number"
            placeholder="No. Children Below 12"
            value={formData?.children || ""}
            onChange={handleChange}
          />
          <TextField
            color="warning"
            variant="standard"
            id="senior"
            name="senior"
            type="number"
            placeholder="No. of Senior Citizens"
            value={formData?.senior || ""}
            onChange={handleChange}
          />
          <TextField
            color="warning"
            variant="standard"
            id="date"
            name="date"
            type="date"
            placeholder="Date"
            value={formData?.date || ""}
            onChange={handleChange}
          />
        </ThemeProvider>
      </div>
      <Button
        variant="shadow"
        className="mx-auto bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg text-xl py-6 px-8"
      >
        Book your Darshan
      </Button>
    </form>
  );
}

export default BookingForm;
