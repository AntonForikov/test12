import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {ImageFromDb, ImageMutation} from '../../types';


export const addImage = createAsyncThunk(
  'addImage/post',
  async (image: ImageMutation) => {

    const formData = new FormData();
    const keys = Object.keys(image) as (keyof ImageMutation)[];

    keys.forEach(key => {
      const value = image[key];
      if (value !== null) formData.append(key, value);
    });
    await axiosApi.post('/images', formData);
  }
);
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

export const deleteImage = createAsyncThunk(
  'deleteImage/delete',
  async (id: string) => {
    await axiosApi.delete(`/images/${id}`);
  }
);