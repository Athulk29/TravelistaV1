import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../utils/Api'


export const getItineray = createAsyncThunk('itinerary/getitinerary', async (data, { rejectWithValue }) => {
    console.log(data);

    try {
        const res = await api.get('/itinerary/itineray', {
            params: {
                origin: data.origin,
                destination: data.destination,
                startDate: data.startDate,
                endDate: data.endDate,
                type: data.type,
            },
        })
        console.log(res.data);
        return res.data

    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data || "Something went wrong");

    }
})


export const getFlights = createAsyncThunk('itinerary/flights', async (data, { rejectWithValue }) => {

    try {

        const res = await api.get('/flights/flights', {
            params: {
                origin: data.origin, destination: data.destination, departureDate: data.departureDate
            }
        })
        console.log(res.data);

        return res.data
    } catch (error) {
        console.log(error);
    }
})
export const getHotels = createAsyncThunk('itinerary/hotels', async (data, { rejectWithValue }) => {

    try {

        const res = await api.get('/hotels/hotels', {
            params: {
                 destination: data.destination
            }
        })
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log(error);
    }
})

const initialState = {
    itineraryData: '',
    itinerarys: [],
    flights: [],
    hotels: [],
    weather:null,
    flightSuccess:false,
    hotelSuccess:false,
    loading: false,
    success: false
}

const itinerarySlice = createSlice({
    name: 'itinerary',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getItineray.pending, (state) => {
                state.loading = true
                state.success = false
            })
            .addCase(getItineray.fulfilled, (state, action) => {
                state.loading = false
                state.itineraryData = action.payload.jsonData
                state.weather = action.payload.weatherData

                state.success = true
            })
            .addCase(getItineray.rejected, (state) => {
                state.loading = false
                state.success = false
            })


            .addCase(getFlights.pending, (state) => {
                state.flightSuccess = false
            })
            .addCase(getFlights.fulfilled, (state, action) => {
                state.flightSuccess = true
                state.success=false
                state.flights = action.payload
            })

            .addCase(getHotels.pending, (state) => {
                state.flightSuccess = false
            })
            .addCase(getHotels.fulfilled, (state, action) => {
                state.hotelSuccess = true
                state.success=false
                state.hotels = action.payload
            })
    }
})

export default itinerarySlice.reducer