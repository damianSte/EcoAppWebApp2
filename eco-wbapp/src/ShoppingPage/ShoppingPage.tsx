import {
  Box,
  Typography,
  Grid,
  TextField,
  Pagination,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useState, useEffect } from 'react';
import MenuAppBar from '../menu-bar/MenuAppBar';
import ProductCard from '../home-page/ProductCard';

export default function ShoppingPage() {
  // --- Dummy product data ---
  const products = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: `${(5000 + index * 100).toFixed(2)} zł`,
    image: 'https://via.placeholder.com/200x200',
    condition: index % 2 === 0 ? 'Nowy' : 'Używany',
    category: ['Meble', 'Żywność', 'Ubrania', 'Elektronika'][index % 4],
  }));

  // --- States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newCondition, setNewCondition] = useState(false);
  const [usedCondition, setUsedCondition] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState({
    Meble: false,
    Żywność: false,
    Ubrania: false,
    Elektronika: false,
  });

  // --- Scroll-based Search Bar Toggle ---
  const [showSearch, setShowSearch] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // If user scrolls down => hide
      if (currentScrollY > lastScrollY + 5) {
        setShowSearch(false);
      }
      // If user scrolls up => show
      else if (currentScrollY < lastScrollY - 5) {
        setShowSearch(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // --- Filtering & Sorting (simplified) ---
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      const categoryCheck =
        Object.values(selectedCategories).every((isChecked) => !isChecked) ||
        selectedCategories[product.category as keyof typeof selectedCategories];
      // Condition filter
      const conditionCheck =
        (newCondition && product.condition === 'Nowy') ||
        (usedCondition && product.condition === 'Używany') ||
        (!newCondition && !usedCondition);

      return categoryCheck && conditionCheck;
    })
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // --- Paginate ---
  const itemsPerPage = 20;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handlePageChange = (event: any, value: number) => {
    setCurrentPage(value);
  };
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category as keyof typeof selectedCategories],
    }));
  };

  return (
    <>
      <Box sx={{ backgroundColor: '#EFE3C2' }}>
        {' '}
        <MenuAppBar />
        <Box
          sx={{
            position: 'sticky',
            top: '64px',
            zIndex: 1099,
            backgroundColor: '#123524',
            transition: 'transform 0.3s ease-in-out',
            transform: showSearch ? 'translateY(0)' : 'translateY(-80px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 2,
            px: 2,
          }}
        >
          <TextField
            placeholder="Szukaj"
            variant="filled"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{ disableUnderline: true }}
            sx={{
              width: '60%',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              '& .MuiFilledInput-root': {
                borderRadius: '16px',
                height: '48px',
                padding: 0,
                alignItems: 'center',
              },
              '& .MuiFilledInput-input': {
                padding: '0 12px',
                lineHeight: 'normal',
              },
              '& .MuiFilledInput-root::before, & .MuiFilledInput-root::after': {
                display: 'none',
              },
            }}
          />
        </Box>
        <Box
          sx={{
            marginTop: '80px',
            display: 'flex',
            backgroundColor: '#EFE3C2',
            minHeight: '200vh', // just to ensure scrolling
            px: 2,
            py: 2,
          }}
        >
          {/* SIDEBAR */}
          <Box
            sx={{
              width: '20%',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              position: 'sticky',
              top: '80px',
              height: 'fit-content',
            }}
          >
            <Typography
              variant="h6"
              sx={{ marginBottom: '20px', color: '#000' }}
            >
              Kategorie
            </Typography>
            <FormGroup>
              {Object.keys(selectedCategories).map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={
                        selectedCategories[
                          category as keyof typeof selectedCategories
                        ]
                      }
                      onChange={() => handleCategoryChange(category)}
                    />
                  }
                  label={category}
                />
              ))}
            </FormGroup>

            <Typography
              variant="h6"
              sx={{ marginTop: '20px', marginBottom: '10px', color: '#000' }}
            >
              Filtruj
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newCondition}
                    onChange={(e) => setNewCondition(e.target.checked)}
                  />
                }
                label="Nowe"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={usedCondition}
                    onChange={(e) => setUsedCondition(e.target.checked)}
                  />
                }
                label="Używane"
              />
            </FormGroup>
          </Box>

          {/* MAIN CONTENT */}
          <Box sx={{ flex: 1, marginLeft: '20px' }}>
            <Grid container spacing={2}>
              {paginatedProducts.map((product) => (
                <Grid item xs={12} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            <Pagination
              count={Math.ceil(filteredProducts.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'center',
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}