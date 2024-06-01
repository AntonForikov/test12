import {Alert, CircularProgress, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import React, {useEffect} from 'react';
import CardItem from '../../components/CardItem/CardItem';
import {selectImageList, selectImageLoading} from '../../store/image/imageSlice';
import {getImages, getUserImages} from '../../store/image/imageThunk';
import {useParams} from 'react-router-dom';

interface Props {
  userImages?: boolean;
}

const Home: React.FC<Props> = ({userImages = false}) => {
  const imageList = useAppSelector(selectImageList);
  const loading = useAppSelector(selectImageLoading);
  const {id} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userImages && id) {
      dispatch(getUserImages(id));
    } else {
      dispatch(getImages());
    }
  }, [dispatch, userImages, id]);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" gap={3}>
        {!userImages &&
          <Grid container justifyContent="center" marginTop={3}><Typography variant="h4">Gallery</Typography></Grid>
        }
        {userImages && imageList.length > 0 &&
          <Grid container justifyContent="center" marginTop={3}><Typography
            variant="h4">Gallery {imageList[0].user.displayName}</Typography></Grid>
        }
        {loading
          ? <CircularProgress/>
          : !loading && imageList.length < 1
            ? <Alert severity="warning" sx={{marginTop: 2}}>There is no images in database</Alert>
            : imageList.map((image) => {
              return (<CardItem
                  key={image._id}
                  imageUserId={image.user._id}
                  title={image.title}
                  image={image.image}
                  displayName={image.user.displayName}
                />
              );
            })
        }
      </Grid>
    </>

  );
};

export default Home;