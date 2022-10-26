// disini kita kaan import dari redux toolkit
// yaitu createAPI dan fetchBaseQuery

//perhatikan fromnya cukup berbeda dadri yang sebelah
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Selanjutnya kita akan membuat APInya di sini
export const reqresinColorAPI = createApi({
  // Anggap saja ini seperti "name" pada slice
  reducerPath: "reqresinColorAPI",
  // di sini kita akan memberikan opsi baseUrl
  // Karena kita akan menggunakan API nya dari https://reqresin/api <--- ini adalah baseUrl nya
  baseQuery: fetchBaseQuery({
    // di sini kita akan memberikan opsi baseUrl
    // Karena kita akan menggunakan API nya dari https://reqresin/api <--- ini adalah baseUrl nya
    baseUrl: "https://reqres.in/api",
  }),

  // Nah selanjutnya kita akan mendefinisikan API ini memiliki endpoint apa saja?
  // ini merupakan sebuah fungsi yang menerima sebuah parameter bernama builder

  // builder ini nantinya akan membantu kita dalam membuat auto generated Hooks-nya

  // Perhatikan fungsi ini akan return Object sehingga kita bungkus dengan
  endpoints: (builder) => ({
    // di sini kita definisikan querynya mau seperti apa
    // Berupa fungsi yah yang mengembalikan string apa yang ditempelkan ke baseUrl

    colors: builder.query({
      // ini artinya baseUrl + /colors => https://reqres.in/api/colors
      // di sini kita definisikan querynya mau seperti apa
      // Berupa fungsi yah yang mengembalikan string apa yang ditempelkan ke baseUrl
      query: () => "/colors",
    }),
    // GET /colors/:id <--- di sini kita akan meminta parameter di dalam endpointnya dengan nama "id"
    // Karena GET, kita masih menggunakan builder.query
    colorsById: builder.query({
      query: (id) => `/colors/${id}`,
    }),

    // POST/colors
    // Karena ini sudah akan mengubah data, kita tidak menggunakan builder.query lagi
    // melainkan builder.mutation
    addColor: builder.mutation({
      // tetap sama dengan builder.query, menerima options yang ada property "query"
      // nah di sini ceritanya sekarang kita asumsi akan menerima object dengan nama color yah

      // Perhatikan fungsi ini akan mereturn suatu object yah !
      query: (color) => ({
        // Kalau tadi di atas builder.query kita langsung return string
        // di sini kita return object, sehingga ada property yang harus digunakan:
        // url: untuk mendeskripsikan url nya apa
        // method: untuk menjelaskan HTTP Method apa yang digunakan
        // body: untuk menjelaskan isi (data) yang akan dilempar via method ini ada apa saja
        url: "/colors",
        method: "post",
        body: color,
      }),
    }),
    // PUT /colors/:id
    // nah di sini kita akan menerima parameter id dan data yang ingin diberikan
    // Karena kita akan memberikan data, gunakan builder.mutation
    updateColorById: builder.mutation({
      // Perhatikan di sini kita hanya bisa menerima satu parameter saja
      // jadi kita formasikan dalam bentuk Object
      query: ({ id, ...color }) => ({
        url: `/colors/${id}`,
        method: "PUT",
        // Loh kok di atasnya pakai spread, tapi di bawah sini satuan saja cukup?
        // Karena di balik layar akan ada proses untuk menyatukannya, jadi kita
        // tidak perlu khawatir ^_^
        body: color,
      }),
    }),

    // DELETE /colors/:id
    // di sini kita hanya butuh parameter id saja tanpa data yang diberikan
    // tapi karena kita akan mengubah data
    // tetap menggunakan builder.mutation yah !
    deleteColorById: builder.mutation({
      query: (id) => ({
        url: `/colors/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Nah setelah mendeskripsikannya, kita akan menggunakannya
// Bagaimana cara menggunakannya?
// Kita akan EXPORT hooks yang dibuat secara otomatis pada createApi di atas

// How to Export?
export const {
  // Nah di sini perhatikan
  // yang diexport adalah hooks yang dibentuk dengan cara penamaan:
  // "use" + nama endpoints + nama fungsi builder yang digunakan

  // contoh:
  // endpoint "colors", menggunakan builder.query
  // maka jadinya adalah useColorsQuery

  // (Hooks ini dibuat secara otomatis, jadi kita tinggal GUNAKAN nanti !)

  useColorsQuery,
  useColorByIdQuery,
  useAddColorMutation,
  useUpdateColorByIdMutation,
  useDeleteColorByIdMutation,
} = reqresinColorAPI;
