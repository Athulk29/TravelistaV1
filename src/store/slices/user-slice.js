import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../utils/Api'
import toast from 'react-hot-toast';




export const userSignup = createAsyncThunk('user/signup', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/user/signup', data)
        return res.data
    } catch (error) {
        toast.error(error.data.message)
        console.log(error)
    }
})
export const userSignin = createAsyncThunk('user/signin', async (data, { rejectWithValue }) => {
    try {
        console.log(data);
        const res = await api.post('/user/signin', data)
        console.log(res.data);
        window.location.href = '/'
        return res.data
    } catch (error) {
        console.log(error)
        toast.error(error.response.data)

    }
})

export const userLogout = createAsyncThunk('user/logout', async (data, { }) => {
    try {
        const res = await api.post('/user/logout')
        return res.data
    } catch (error) {
        console.log(error);
    }
})

export const checkAuth = createAsyncThunk('users/checkAuth', async () => {
    try {
        const res = await api.get('/user/authCheck')
        const data = res.data
        return data;
    } catch (error) {

        console.log(error.response.data);

    }
})

const initialState = {
    user: null,
    loading: true,
    success: false,
    isLogging: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(userSignup.pending, (state) => {
                state.loading = true
            })
            .addCase(userSignup.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(userSignup.rejected, (state) => {
                state.loading = false;
                state.success = false
            })

            .addCase(userSignin.pending, (state) => {
                state.loading = true
                state.isLogging = false
            })
            .addCase(userSignin.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.user.id && (state.isLogging = true)
            })
            .addCase(userSignin.rejected, (state) => {
                state.loading = false;
                state.isLogging = false
            })


            .addCase(userLogout.fulfilled, (state) => {
                state.user = null;
                state.isLogging = false
                state.success = false

            })


            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload


            })
            .addCase(checkAuth.rejected, (state) => {
                state.user = null
            })
    }
})

export default userSlice.reducer