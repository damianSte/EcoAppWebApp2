import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CssBaseline,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  useTheme,
  SelectChangeEvent,
} from '@mui/material';
import MenuAppBar from './menu-bar/MenuAppBar';

function AddProductPage() {
  const theme = useTheme();

  // Form state
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    condition: '',
    category: '',
    subcategory: '',
    status: '',
    style: '',
    transactionType: '',
    adress: { street: '', city: '', zip: '' },
  });

  /**
   * Handles input changes in the form
   */
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  /**
   * Handles file selection via input or drag-and-drop
   */
  const handleFileChange = (files: FileList) => {
    const filesArray = Array.from(files);
    setSelectedImages((prev) => [...prev, ...filesArray]);
  };

  /**
   * Handles drag events
   */
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files) {
      handleFileChange(event.dataTransfer.files);
    }
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleZoneClick = () => {
    document.getElementById('image-upload')?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFileChange(event.target.files);
    }
  };

  // Handle form submissions
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // navigate('/home-page'); //Im using this instead of console logs cuz they never work :)

    // Gather form data
    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get('name'),
      description: form.get('description'),
      price: form.get('price'),
      condition: form.get('condition'),
      category: form.get('category'),
      subcategory: form.get('subcategory'),
      status: form.get('status'),
      style: form.get('style'),
      transactionType: form.get('transactionType'),
      adress: {
        street: form.get('adress.street'),
        city: form.get('adress.city'),
        zip: form.get('adress.zip'),
      },
      // Attach the file objects directly if you want to upload them via FormData
      files: selectedImages,
    };

    console.log('Form Data:', data);
    // Perform your POST request or service call to create the product
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ backgroundColor: '#EFE3C2', minHeight: '100vh' }}>
        <MenuAppBar />

        <Box
          sx={{
            width: '100%',
            padding: '5%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#EFE3C2',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 'bold',
              fontFamily: 'Comfortaa',
              color: '#123524',
            }}
          >
            Add New Product
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              maxWidth: '900px',
              backgroundColor: '#fff',
              padding: 3,
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  name="name"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                  onChange={handleInputChange}
                  value={formValues.name}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  name="description"
                  multiline
                  rows={3}
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                  onChange={handleInputChange}
                  value={formValues.description}
                />
                <TextField
                  label="Price"
                  variant="outlined"
                  name="price"
                  type="number"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                  onChange={handleInputChange}
                  value={formValues.price}
                />

                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel id="condition-label">Condition</InputLabel>
                  <Select
                    labelId="condition-label"
                    id="condition"
                    name="condition"
                    label="Condition"
                  >
                    <MenuItem value="NEW">New</MenuItem>
                    <MenuItem value="USED">Used</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel>Category</InputLabel>
                  <Select name="category" id="category" label="Category">
                    <MenuItem value="FASHION">Fashion</MenuItem>
                    <MenuItem value="ELECTRONICS">Electronics</MenuItem>
                  </Select>
                </FormControl>

                {/* Subcategory */}
                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel id="subcategory-label">Subcategory</InputLabel>
                  <Select
                    id="subcategory"
                    name="subcategory"
                    label="Subcategory"
                  >
                    <MenuItem value="CLOTHING">Clothing</MenuItem>
                    <MenuItem value="PHONES">Phones</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    id="status"
                    name="status"
                    label="Status"
                    onChange={handleSelectChange}
                    value={formValues.status}
                  >
                    <MenuItem value="AVAILABLE">Available</MenuItem>
                    <MenuItem value="SOLD">Sold</MenuItem>
                    <MenuItem value="RESERVED">Reserved</MenuItem>
                  </Select>
                </FormControl>

                {/* Transaction Type */}
                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel>Transaction Type</InputLabel>
                  <Select
                    id="transactionType"
                    name="transactionType"
                    label="Transaction Type"
                    onChange={handleSelectChange}
                    value={formValues.transactionType}
                  >
                    <MenuItem value="SALE">Sale</MenuItem>
                    <MenuItem value="EXCHANGE">Exchange</MenuItem>
                    <MenuItem value="GIVEN_AWAY">Give away</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Style (optional)"
                  variant="outlined"
                  name="style"
                  fullWidth
                  sx={{ mb: 2 }}
                  onChange={handleInputChange}
                  value={formValues.style}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                {/* Address */}
                <Typography variant="h6" sx={{ mb: '40px' }}>
                  Address
                </Typography>
                <TextField
                  label="Street"
                  variant="outlined"
                  name="adress.street"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="City"
                  variant="outlined"
                  name="adress.city"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="ZIP"
                  variant="outlined"
                  name="adress.zip"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />

                <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
                  Product Images
                </Typography>

                {/* Hidden file input */}
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />

                {/* DRAG AND DROP ZONE */}
                <Box
                  // Events to handle dragging
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  // Click to open file dialog
                  onClick={handleZoneClick}
                  sx={{
                    cursor: 'pointer',
                    border: `2px dashed ${
                      isDragging
                        ? theme.palette.primary.main
                        : theme.palette.grey[400]
                    }`,
                    borderRadius: 2,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border-color 0.3s',
                    backgroundColor: isDragging
                      ? theme.palette.action.hover
                      : 'transparent',
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {isDragging
                      ? 'Drop your images here'
                      : 'Drag & Drop your images here'}
                  </Typography>
                </Box>

                {/* Preview of images in a scrollable row */}
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    gap: 2,
                    mt: 2,
                    pb: 1,
                  }}
                >
                  {selectedImages.map((file, index) => {
                    const url = URL.createObjectURL(file);
                    return (
                      <Box
                        key={index}
                        sx={{
                          minWidth: 120,
                          maxWidth: 120,
                          height: 120,
                          border: '1px solid #ccc',
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={url}
                          alt={`preview-${index}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: '#123524',
                    color: '#EFE3C2',
                    width: '100%',
                  }}
                >
                  Create Product
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AddProductPage;
