import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

import photoService from "../services/photoService"
import { BsDatabaseAdd } from "react-icons/bs";



const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null,


}



//Publish user photo
export const publishPhoto = createAsyncThunk("photo/publish", async(photo, thunkAPI) => {

    
    
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.publishPhoto(photo, token);
    
    if(data.errors){
        
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    

    return data;

})

//get user photo

export const getUserPhotos = createAsyncThunk("photo/userphotos", async(id, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getUserPhotos(id, token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;

})


export const deletePhoto = createAsyncThunk("photo/delete", async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.deletePhoto(id, token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
})

//update user photo
export const updatePhoto = createAsyncThunk("photo/update", async(photoData, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.updatePhoto(photoData.id, {title: photoData.title}, token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
})

//get photo
export const getPhoto = createAsyncThunk("photo/getPhoto", async(id, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token

    const data = await photoService.getPhoto(id, token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
})


//like photo
export const like = createAsyncThunk("photo/like", async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.like(id, token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
})

//comment photo
export const comment = createAsyncThunk("photo/comment", async(commentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.comment({comment: commentData.comment}, commentData.id, token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
})


export const getPhotos = createAsyncThunk("/photo/getAll", async(_, thunkAPI) => {
    
    const token = thunkAPI.getState().auth.user.token;
    console.log(token)
    
    const data = await photoService.getPhotos(token);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
})


export const searchPhotos = createAsyncThunk(
    "photo/search",
    async(query, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await photoService.searchPhotos(query, token);
        
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
  );

export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(publishPhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(publishPhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.message = "Foto publicada com sucesso!"
            state.photo = action.payload;
            state.photos.unshift(state.photo);

        }).addCase(publishPhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = true;
            state.photo = {};
            
        }).addCase(getUserPhotos.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getUserPhotos.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            
            state.photos = action.payload;

        }).addCase(deletePhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(deletePhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.photos = state.photos.filter((photo) => {
                return photo._id != action.payload.id;
            })

            state.message = action.payload.message;
        
        }).addCase(deletePhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = true;
            state.photo = {};
            
        }).addCase(updatePhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(updatePhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;

            state.photos.map((photo) => {
                if(photo._id == action.payload.photo._id){
                    return (photo.title = action.payload.photo.title);
                }

                return photo;
            })

            state.message = action.payload.message;
        
        }).addCase(updatePhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = true;
            state.photo = {};
            
        }).addCase(getPhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getPhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            
            state.photo = action.payload;
            

        }).addCase(like.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(like.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;

            
            if(state.photo.likes){

                state.photo.likes.push(action.payload.userId);
            }

            
            state.photos.map((photo) => {
                if(photo._id == action.payload.photoId){
                    return photo.likes.push(action.payload.userId)
                }

                return photo;
            })

           
            state.message = action.payload.message;
        
        }).addCase(like.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = true;
            
            
        }).addCase(comment.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(comment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;

            
            if(state.photo.comments){
                state.photo.comments.push(action.payload.userComment);
                console.log(state.photo)
            }

            state.message = action.payload.message;
        
        }).addCase(comment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = true;
            
            
        }).addCase(getPhotos.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getPhotos.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.photos = action.payload;
            state.message = action.payload.message;
        
        }).addCase(getPhotos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = true;
            
            
        }).addCase(searchPhotos.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(searchPhotos.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.photos = action.payload;
            state.message = action.payload.message;
        
        }).addCase(searchPhotos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = true;
            
            
        })
    }
})


export const {resetMessage} = photoSlice.actions;
export default photoSlice.reducer;