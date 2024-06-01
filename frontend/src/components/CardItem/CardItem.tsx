import {
  Card, CardContent,
  CardMedia,
  Grid,
  styled, Typography
} from '@mui/material';
import React from 'react';
import {apiUrl} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../../store/user/userSlice';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface Props {
  imageUserId: string,
  title: string,
  image: string,
  displayName: string
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%'
});

const CardItem: React.FC<Props> = ({
  imageUserId,
  title,
  image,
  displayName
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const cardImage = `${apiUrl}/${image}`;

  // if (image) cardImage = `${apiUrl}/${image}`;
  // const onCardClick = () => {
  //   navigate(`/userImages/${id}`);
  // };

  // const onDelete = async (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   const confirmation = confirm('Are you sure?');
  //   if (confirmation) {
  //     await dispatch(deleteCocktail(id));
  //     dispatch(getImages());
  //   }
  // };
  // const showFillScreenModal = () => {
  //   return <ImageModal show={true}/>;
  // };

  return (
    <>
      <Grid item xs md={3} lg={3}>
        <Card>
          <ImageCardMedia image={cardImage} title={title} onClick={() => setOpen(true)} sx={{cursor: 'pointer'}}/>
          <CardContent>
            <Typography
              variant="h6"
              sx={{cursor: 'pointer'}}
            >
              {title}
            </Typography>
            <Typography
              variant="h6"
              sx={{cursor: 'pointer'}}
              onClick={() => navigate(`/userImages/${imageUserId}`)}
            >
              By {displayName}
            </Typography>
          </CardContent>
        </Card>
      </Grid>


      {open &&
        <Box
          position="absolute"
          width="100%"
          height="100vh"
          sx={{top: 5, cursor: 'pointer'}}
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          onClick={() => setOpen(false)}
        >
          <img src={cardImage} alt={title} width='96%' style={{borderRadius: 10}}/>
          <Button>Close</Button>
        </Box>
      }
    </>
  );
};

export default CardItem;