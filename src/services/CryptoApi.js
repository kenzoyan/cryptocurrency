import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'



// const baseUrl = 'https://api.coinranking.com/v2'

// const headers = {
//       'x-access-token': 'coinrankinga05cd7269bfddea111d8a0aaf7a40956870e8f1c3dadcdbe',
//   };
const baseUrl = 'https://coinranking1.p.rapidapi.com'

const headers = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_KEY,
  }

const createRequest = (url) => ({url, headers:headers});

export const cryptoApi = createApi({
    reducerPath:'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count)=> createRequest(`/coins?limit=${count}`)
        }),
        getCryptosDetails: builder.query({
            query: (coinId)=> createRequest(`/coin/${coinId}`)
        }),
        getCryptosHistory: builder.query({
            query: ({ coinId, timePeriod }) => createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`)
          }),
    })
})


export const {
    useGetCryptosQuery,
    useGetCryptosDetailsQuery,
    useGetCryptosHistoryQuery,
} = cryptoApi;