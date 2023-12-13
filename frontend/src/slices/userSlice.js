import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService"

const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

//get user details

export const profile = createAsyncThunk("user/profile", async(user, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.profile(user, token);

    return data;
})

//update user details
export const updateProfile = createAsyncThunk("user/update", async(user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.updateProfile(user, token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
}) 


//get user details

export const getUserDetails = createAsyncThunk("user/get", async(id, thunkAPI) => {


    
    const data = await userService.getUserDetails(id);
    
    if(data.errors){
        
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    
    return data;
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(profile.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(profile.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.user = action.payload;
        }).addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.user = action.payload;
            state.message = "Usuário atualizado com sucesso!";
        }).addCase(updateProfile.rejected, (state, action) => {
            state.error = action.payload;
            state.success = false;
            state.loading = false;
            state.user = null;
            state.loading = false;
        }).addCase(getUserDetails.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getUserDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.user = action.payload;
        })
    }
})

export const {resetMessage} = userSlice.actions;

export default userSlice.reducer