import {
  Button,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import React, {useRef, useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {useNavigate} from 'react-router-dom';
import FileInput from '../../components/InputFile/FileInput';
import SendIcon from '@mui/icons-material/Send';
import {ImageMutation} from '../../types';
import {addImage} from '../../store/image/imageThunk';

const initial: ImageMutation = {
  title: '',
  image: null,
};

const AddAlbum = () => {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<ImageMutation>(initial);
  const [fileName, setFileName] = useState('');
  const resetButtonRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [disabler, setDisabler] = useState(false);
  const resetFileInput = () => {
    if (resetButtonRef.current) {
      resetButtonRef.current.click();
    }
  };

  const changeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setImage((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setImage(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    }
    if (files && files[0]) {
      setFileName(files[0].name);
    } else {
      setFileName('');
    }
  };


  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image.title[0] === ' ') return alert('Title can not begin from whitespace.');
    if (!image.image) return alert('You should send an item to gallery');

    try {
      setDisabler(true);
      await dispatch(addImage(image));
      setDisabler(false);
      navigate('/');
    } catch (e) {
      console.error(e);
    } finally {
      resetFileInput();
      setImage(initial);
      setFileName('');
    }
  };

  return (
    <Grid container direction="column" alignItems="center" mt={2}>
      <Typography variant="h4">Add New Image</Typography>
      <form onSubmit={onFormSubmit}>
        <Grid container direction="column" spacing={2} marginBottom={2} width={700} margin="auto">
          <Grid item xs>
            <TextField
              multiline
              fullWidth
              variant="outlined"
              label="Title"
              name="title"
              value={image.title}
              onChange={changeImageHandler}
              required
            />
          </Grid>
          <Grid item xs>
            <FileInput
              onChange={fileInputChangeHandler}
              fileName={fileName}
              name="image"
              label="Image"
            />
          </Grid>
          <Grid item xs>
            <Button type="submit" variant="contained" endIcon={<SendIcon/>} disabled={disabler}>
              Send
            </Button>
          </Grid>
        </Grid>
        <input
          style={{display: 'none'}}
          ref={resetButtonRef}
          type="reset"
        />
      </form>
    </Grid>
  );
};

export default AddAlbum;