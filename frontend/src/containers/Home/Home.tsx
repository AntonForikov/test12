import {Alert, CircularProgress, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import React, {useCallback, useEffect} from 'react';
import CardItem from '../../components/CardItem/CardItem';
import {selectImageList, selectImageLoading} from '../../store/image/imageSlice';
import {getImages} from '../../store/image/imageThunk';
import {selectUser} from '../../store/user/userSlice';

interface Props{
  userImages?: boolean
}
const Home: React.FC<Props> = ({userImages = false}) => {
  const imageList = useAppSelector(selectImageList);
  const loading = useAppSelector(selectImageLoading);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  // const getCocktailsInfo = useCallback(async () => {
  //   dispatch(getCocktails());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getImages());
    // if (userImages && user) {
    //   dispatch(getUserCocktails(user?._id));
    // } else {
    //   void getCocktailsInfo();
    // }
  }, [dispatch]);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center"  gap={3}>
        <Grid container justifyContent="center"  marginTop={3}><Typography variant="h4">Cocktails</Typography></Grid>
        {loading
          ? <CircularProgress/>
          : !loading && imageList.length < 1
            ? <Alert severity="warning">There is no cocktails in database</Alert>
            : imageList.map((image) => {
              return (<CardItem
                  key={image._id}
                  id={image._id}
                  title={image.title}
                  image={image.image}
                />
              );
            })
        }
      </Grid>
    </>

  );
};

export default Home;