import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useReducer } from "react";
import { initialValue, counterReducer } from "../Reducer/counterReducer";

function ReducerContainer() {
  const [counter, dispatchCounter] = useReducer(counterReducer, initialValue);

  const btnDecrementHandler = () => {
    dispatchCounter({ tipeAksi: "decrement" });
  };

  return (
    <Box sx={{ border: "black 1px solid", m: 2 }}>
      <Typography sx={{ p: 2 }} variant="h4">
        Use Reducer
      </Typography>
      <Box sx={{ p: 4 }}>
        <TextField
          id="outlined-basic"
          label="Current Counter"
          variant="outlined"
          value={counter}
        ></TextField>
        <Box sx={{ display: "flex", gap: "1.5em", mt: 2 }}>
          {/* Decrement */}
          <Button variant="outlined" onClick={btnDecrementHandler}>
            -1
          </Button>

          {/* reset */}
          <Button
            variant="outlined"
            onClick={() => {
              dispatchCounter({ tipeAksi: "reset" });
            }}
          >
            0
          </Button>

          {/* Increment */}
          <Button
            variant="outlined"
            onClick={() => {
              dispatchCounter({ tipeAksi: "increment" });
            }}
          >
            +1
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ReducerContainer;
