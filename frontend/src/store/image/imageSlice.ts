import {ImageFromDb} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {getImages, getUserImages} from './imageThunk';

interface ImageState {
  imageList: ImageFromDb[];
  imageLoading: boolean;
}

const initialState: ImageState = {
  imageList: [],
  imageLoading: false,
};

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getImages.pending, (state) => {
      state.imageLoading = true;
    }).addCase(getImages.fulfilled, (state, {payload: imageList}) => {
      state.imageLoading = false;
      state.imageList = imageList;
    }).addCase(getImages.rejected, (state) => {
      state.imageLoading = false;
    });
    builder.addCase(getUserImages.pending, (state) => {
      state.imageLoading = true;
    }).addCase(getUserImages.fulfilled, (state, {payload: images}) => {
      state.imageLoading = false;
      if (images) state.imageList = images;
    }).addCase(getUserImages.rejected, (state) => {
      state.imageLoading = false;
    });
  }
});

export const imageReducer = imageSlice.reducer;
export const selectImageList = (state: RootState) => state.images.imageList;
export const selectImageLoading = (state: RootState) => state.images.imageLoading;
