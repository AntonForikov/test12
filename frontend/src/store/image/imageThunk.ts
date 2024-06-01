import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {ImageFromDb} from '../../types';


// export const addCocktail = createAsyncThunk(
//   'addCocktail/post',
//   async (cocktail: CocktailMutation) => {
//
//     const formData = new FormData();
//
//     const keys = Object.keys(cocktail) as (keyof CocktailMutation)[];
//
//     keys.forEach(key => {
//       const value = cocktail[key];
//       if (key === 'ingredients') formData.append(key, JSON.stringify(value));
//       if (value !== null && key !== 'ingredients') formData.append(key, value);
//     });
//     await axiosApi.post('/cocktails', formData);
//   }
// );
export const getImages = createAsyncThunk(
  'getImages/get',
  async () => {
    try {
      const {data} = await axiosApi.get<ImageFromDb[]>(`/images`);
      return data;
    } catch (e) {
      return [];
    }
  }
);

export const getUserImages = createAsyncThunk(
  'getUserImages/get',
  async (id: string) => {
    try {
      const {data} = await axiosApi.get<ImageFromDb[]>(`/images?user=${id}`);
      return data;
    } catch (e) {
      return [];
    }
  }
);
//
// export const getCocktailById = createAsyncThunk(
//   'getCocktailById/get',
//   async (id: string) => {
//     try {
//       const {data} = await axiosApi.get<ImageFromDb>(`/cocktails/${id}`);
//       return data;
//     } catch (e) {
//       console.error(e);
//     }
//   }
// );
//
// export const publishCocktail = createAsyncThunk(
//   'publishCocktail/patch',
//   async (id: string) => {
//     await axiosApi.patch(`/cocktails/${id}/publish`);
//   }
// );
//
// export const gradeCocktail = createAsyncThunk(
//   'gradeCocktail/patch',
//   async (grade: Grade) => {
//     await axiosApi.put(`/cocktails/grade/${grade.id}`,{grade: grade.grade});
//   }
// );
//
export const deleteImage = createAsyncThunk(
  'deleteImage/delete',
  async (id: string) => {
    await axiosApi.delete(`/images/${id}`);
  }
);