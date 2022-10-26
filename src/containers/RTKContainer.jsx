//disini kita membutuhkan useEffect
// karena ingin fetch data pada saat awal container ini dibuat

import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectCounter } from "../features/counter/sliceCounter";

import {
  increment,
  decrement,
  reset,
  incrementSpec,
  decrementSpec,
  userAsync,
} from "../features/counter/sliceCounter";

function ReduxContainer() {
  const [currAmount, setCurrAmount] = useState(0);
  const [userId, setUserId] = useState(0);
  const username = useSelector(selectUser);
  const counter = useSelector(selectCounter);

  const dispatcher = useDispatch();

  const textFieldAmountOnChangeHandler = (e) => {
    const amountFromField = isNaN(parseInt(e.target.value))
      ? 0
      : parseInt(e.target.value);

    setCurrAmount(amountFromField);
  };

  const buttonDecrementByAmountOnClickHandler = () => {
    // dispatcher({
    //   type: "decrementSpec",
    //   amount: currAmount,
    // });

    // Perhatikan di sini kita akan memanggil dispatcher
    // untuk memanggil suatu action yang memiliki payload

    // Karena tadi di dalam reducers incrementSpec
    // Kita hanya -= action.payload
    // maka di sini kita langsung passing payload angkanya saja
    dispatcher(decrementSpec(currAmount));
  };

  const buttonIncrementByAmountOnClickHandler = () => {
    // Kita panggil dispatcher lagi !
    // dispatcher({
    //   type: "incrementSpec",
    //   amount: currAmount,
    // });

    // Sama dengan yang di atas
    dispatcher(incrementSpec(currAmount));
  };
  // Di sini kita akan menggunakan useEffect
  useEffect(
    () => {
      // Kita akan memanggil si userAsync via dispatcher
      dispatcher(userAsync(3));
    },
    // Karena hanya ingin dipanggil 1x saja, maka kita harus membuat
    // dependency listnya kosongan saja
    [dispatcher]
  );

  return (
    <Box sx={{ border: "black 1px solid", m: 2 }}>
      <Box sx={{ p: 4 }}>
        <Typography sx={{ p: 2 }} variant="h4">
          React Redux
        </Typography>
        <Avatar
          src={username.avatar}
          alt="avatar"
          sx={{ width: 64, height: 64, ml: 8 }}
        />
        <Typography variant="body1" component="div" sx={{ mb: 2, mt: 2 }}>
          Nama User: {username.first_name}
        </Typography>
        {/* untuk comot id  */}
        <Box sx={{ display: "flex", gap: 2, mt: 3, mb: 3 }}>
          <TextField
            label="amount"
            size="small"
            value={userId}
            onChange={function (event) {
              return setUserId(event.target.value);
            }}
          />
          <Button
            variant="outlined"
            color="success"
            onClick={function () {
              return dispatcher(userAsync(userId));
            }}
          >
            - Amount
          </Button>
        </Box>
        <TextField
          id="outlined-basic"
          label="Current Counter"
          variant="outlined"
          value={counter}
        ></TextField>
        <Box sx={{ display: "flex", gap: "1.5em", mt: 2 }}>
          {/* Decrement */}
          <Button
            variant="outlined"
            onClick={() => {
              dispatcher(decrement());
            }}
          >
            -1
          </Button>

          {/* reset */}
          <Button
            variant="outlined"
            onClick={() => {
              dispatcher(reset());
            }}
          >
            0
          </Button>

          {/* Increment */}
          <Button
            variant="outlined"
            onClick={() => {
              dispatcher(increment());
            }}
          >
            +1
          </Button>
        </Box>
        {/* Mari kita tambahkan Bagian baru di sini */}
        {/* dibawah ini untuk currAmount atau untuk menambahkan sesuai amount */}
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <TextField
            label="amount"
            size="small"
            value={currAmount}
            onChange={textFieldAmountOnChangeHandler}
          />
          <Button
            variant="outlined"
            color="success"
            onClick={buttonDecrementByAmountOnClickHandler}
          >
            - Amount
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={buttonIncrementByAmountOnClickHandler}
          >
            + Amount
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ReduxContainer;
