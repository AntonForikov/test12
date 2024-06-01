import {ImageFromDb} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {getImages} from './imageThunk';

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
    // builder.addCase(getUserCocktails.pending, (state) => {
    //   state.cocktailLoading = true;
    // }).addCase(getUserCocktails.fulfilled, (state, {payload: cocktails}) => {
    //   state.cocktailLoading = false;
    //   if (cocktails) state.cocktailList = cocktails;
    // }).addCase(getUserCocktails.rejected, (state) => {
    //   state.cocktailLoading = false;
    // });
    // builder.addCase(getCocktailById.pending, (state) => {
    //   state.cocktailLoading = true;
    // }).addCase(getCocktailById.fulfilled, (state, {payload: cocktail}) => {
    //   state.cocktailLoading = false;
    //   if (cocktail) state.cocktail = cocktail;
    // }).addCase(getCocktailById.rejected, (state) => {
    //   state.cocktailLoading = false;
    // });
  }
});

export const imageReducer = imageSlice.reducer;
export const selectImageList = (state: RootState) => state.images.imageList;
export const selectImageLoading = (state: RootState) => state.images.imageLoading;
