// mengimport untuk pembuatan slicenya
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// disiini kiat akan set initial state
// di sini kita akan set initial state
// karena data kita sebelumnya ada 2 (user dan counter)
// maka kita akan menggunakan Object

export const userAsync = createAsyncThunk(
  "counterRTK/fetchUser",
  async (id) => {
    // di dalam sinilah kita akan menggunakan si axios
    const response = await axios.get(`https://reqres.in/api/users/${id}`);
    // Di dalam fnHandler ini, HARUS ada return
    // dimana return ini akan menjadi data yang dikembalikan PADA SAAT
    // kondisi berhasil terjadi

    // Dalam kasus ini kita mengembalikan si ... response.data.data
    // (ingat Response schema axios, response data axios ada di response.data
    //   dan data dari reqres.in ada di object data, sehingga jadinya response.data.data
    return response.data.data;
  }
);

const initialState = {
  user: "Anggara",
  counter: 1000,
};

// Di sini kita akan membuat si "Thunk"-nya
// Agar kita bisa membuat logic untuk async-nya
// Nantinya bisa di-dispatch seperti layaknya action pada biasanya

// Ceritanya di sini kita akan mengambil data user by id dari sebuah API
// dengan nama reqres.in (GET https://reqres.in/api/users/{id})

// disini kita buat slicenya(reducer)
const counterRTKSlice = createSlice({
  // pertama tama kita akan berikan nama untuk slicenya terlebih dahulu
  // ini akan digunakan untuk penamaan dalam internal redux toolkit
  // hati hati dalam penulisan namanya
  name: "counterRTK",
  initialState: initialState,
  //   selanjutnya kita akan menuliskan fungsi reducernya
  // ada reducer apa saja disini?
  reducers: {
    // Masih ingat aksi kita sebelumnya ada apa saja?
    // increment, decrement, reset, incrementSpec, dan decrementSpec
    // kita akan membuatnya di sini !
    // untuk setiap fungsi reducer yang ada di dalam reducers ini
    // bisa menerima minimal 1 parameter, maksimal 2 parameter
    // parameter 1 adalah "state" yang berubah
    // parameter 2 adalah "action" (optional) yang bisa menerima data tambahan (payload)-nya

    increment(state) {
      // ingat, kalau di dalam reducer,
      // state itu sifatnya sudah "immutable"
      // jadi setiap kali kita menggunakan reducer
      // maka harus return data baru

      // TAPI itu kalau kita menggunakan reducer !

      // di dalam redux-toolkit, di balik layarnya, semua state sudah
      // dibungkus dengan sebuah package yang bernama "immer"

      // sehingga kita bisa menuliskan state SEOLAH-OLAH seperti mutable !
      state.counter += 1;
    },
    decrement(state) {
      state.counter -= 1;
    },
    reset(state) {
      state.counter = 0;
    },
    incrementSpec(state, action) {
      state.counter += action.payload;
    },
    decrementSpec(state, action) {
      state.counter -= action.payload;
    },
  },
  extraReducers: (builder) => {
    // kita di sini akan menggunakan builder untuk membuat case dari "Promise" yang akan terjadi
    // pending / fulfilled / rejected
    builder
      .addCase(
        // nah disini kita akan menggunakan case yang duah ada dari si createAsyncThunk(userAsync)
        // Mirip dengan reducer, menerima max 2 parameter
        // parameter 1: state (data yang sekiranya ingin diubah)
        // parameter 2: action (yang memiliki payload)

        // misal pada kasus ini kita hanya ingin menuliskan loading... saja di console log
        // tidak perlu kedua parameter tersebut
        userAsync.pending,
        () => {
          console.log("Loading....");
        }
      )
      .addCase(
        userAsync.fulfilled,
        // disini untuk handler membutuhkan 2 parameter
        (state, action) => {
          // kita akan set state dari usernya
          // lihat initialStateForCoounter untuk lebih detailnya ada state  apa saja
          state.user = action.payload;
          //kita ambil dari action.payload, mirip reducer diatas
        }
      )
      .addCase(
        //kita tambahkan lagi case untuk rejected
        userAsync.rejected,
        () => {
          console.log("failed to get user data ");
        }
      );
  },
});

// Action
// action ini terbuat secara otomatis
// dan dapat digunakan ditempat lain
export const { increment, decrement, incrementSpec, decrementSpec, reset } =
  counterRTKSlice.actions;

//   Selector
// Selectornya dapat dibuat di sini
// agar lebih terlihat rapih
// dan kode menjadi lebih re-usable

// Perhatikan di sini kita menggunakan nama "counterRTK" yah,
// ini didefinisikan dari src/app/store.js
export const selectUser = (state) => state.counterRTK.user;
export const selectCounter = (state) => state.counterRTK.counter;

// REDUCER
// export default si reducernya disini
export default counterRTKSlice.reducer;
