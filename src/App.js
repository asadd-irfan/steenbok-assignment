import * as React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';

const theme = createTheme();

const FileUploader = (props) => {

  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    props.handleChangeImages([...props.images, fileUploaded]);
  };

  return (
    <div style={{ marginRight: 15 }}>
      <Button variant="text" onClick={handleClick}>+ Add Image</Button>
      <input type="file" ref={hiddenFileInput} onChange={handleChange} accept="image/*" style={{ display: 'none' }} />
    </div>
  );
};

const Form = () => {

  const [form, setForm] = React.useState({
    first_name: '',
    last_name: '',
    description: '',
    email: '',
  })

  const [images, setImages] = React.useState([])
  const [imageURLs, setImageURLs] = React.useState([])

  React.useEffect(() => {
    if (images.length < 1) return;
    const imageUrls = [];
    images.forEach(image => imageUrls.push(URL.createObjectURL(image)))
    setImageURLs(imageUrls)
  }, [images])


  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleInputChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }
  const handleSubmit = () => {
  }
  const handleChangeImages = (images) => {
    setImages(images)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />

        <Box component="form" style={{ marginTop: 50 }} className="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          noValidate >
          <h2> Simple Form </h2>
          <Grid container spacing={2} style={{ marginBottom: 20 }}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={form.first_name}
                onChange={handleInputChange}
                label='First Name'
                name="first_name"
                error={form.first_name === ""}
                helperText={form.first_name === "" ? 'First Name is Required' : ' '}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={form.last_name}
                onChange={handleInputChange}
                label='Last Name'
                name="last_name"
                error={form.last_name === ""}
                helperText={form.last_name === "" ? 'Last Name is Required' : ' '}
              />
            </Grid>
          </Grid>

          <TextField
            variant="outlined"
            margin="normal"
            name="description"
            required
            value={form.description}
            onChange={handleInputChange}
            id="outlined-multiline-static"
            label="Small Description"
            multiline
            style={{ width: '100%', marginBottom: 20 }}
            rows={8}
            error={form.description === ""}
            helperText={form.description === "" ? 'Description is Required' : ' '}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={form.email}
            onChange={handleInputChange}
            label='Email Address'
            name="email"
            autoComplete="email"
            error={!isValidEmail(form.email)}
            helperText={!isValidEmail(form.email) ? 'Email is invalid.' : ''}
            style={{ width: '100%', marginBottom: 20 }}

          />

          <div className='images'>
            <Grid container spacing={2} style={{ marginBottom: 20 }}>
              {imageURLs.map((imgSrc, i) => <Grid item xs={12} sm={12} md={6}>
                <img className="photo" src={imgSrc} alt={`alt-img${i}`} />
              </Grid>)}
            </Grid>
          </div>
          <div className='footer_buttons'>
            <FileUploader handleChangeImages={handleChangeImages} images={images} />
            <Button variant="contained"
              disabled={!form.first_name || !form.last_name || !form.description || !form.email}
            >Save</Button>
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const App = () => {

  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
