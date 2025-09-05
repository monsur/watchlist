import "./Item.css";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Helpers from "./Helpers";
import Header from "./Header";
import Grid2 from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PageData, WatchData } from "./Types";

function Item() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData() as PageData;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function getItem() : WatchData {
    let item = data.watches.find((element) => element.id === itemId);
    if (!item) {
      throw new Error(`No watch found with ID ${itemId}`);
    }
    return item;
  }

  function getDomain(link: string) : string {
    let hostnameFragments = new URL(link).hostname.split(".");
    let domain = "";
    for (let i = 0; i < 2; i++) {
      if (domain) {
        domain = "." + domain;
      }
      domain = hostnameFragments.pop() + domain;
    }
    return domain;
  }

  const item = getItem();
  let detail;
  if (item.detail) {
    detail = <div>{item.detail}</div>;
  }

  return (
    <Box className="Item" sx={{ minHeight: '100vh' }}>
      <Header 
        title={data.title}
        leftIconType="back"
        onLeftIconClick={() => navigate(-1)}
        zIndex={theme.zIndex.drawer + 1}
      />
      
      <Container maxWidth="lg" sx={{ mt: { xs: 8, sm: 9 }, py: 3 }}>
        <Grid2 
          container 
          spacing={{ xs: 2, md: 4 }} 
          sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}
        >
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: { xs: 2, md: 0 }
                  }}
                >
                  <img
                    src={Helpers.getImageUrl(item.image)}
                    alt={item.brand + " " + item.collection}
                    style={{
                      maxWidth: '100%',
                      maxHeight: isMobile ? '300px' : '400px',
                      height: 'auto',
                      objectFit: 'contain',
                      borderRadius: '8px'
                    }}
                  />
                </Box>
              </Grid2>
              
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography 
                    component="h1" 
                    gutterBottom
                    sx={{ 
                      fontFamily: '"Prompt", sans-serif',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                      color: '#111',
                      mt: { xs: 1, sm: 1.5 }
                    }}
                  >
                    {item.brand}
                  </Typography>
                  
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                      mb: 2,
                      mt: { xs: 0.75, sm: 0.75 }
                    }}
                  >
                    {item.collection}
                  </Typography>
                  
                  {detail && (
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 3,
                        lineHeight: 1.6,
                        fontSize: { xs: '0.95rem', sm: '1rem' }
                      }}
                    >
                      {item.detail}
                    </Typography>
                  )}
                  
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 400,
                      mb: 3,
                      fontSize: { xs: '1.5rem', sm: '1.75rem' },
                      mt: { xs: 0.25, sm: 0.25 }
                    }}
                  >
                    {Helpers.formatMoney(item.price)}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography 
                      variant="body2" 
                      component="a" 
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                        fontSize: { xs: '0.9rem', sm: '1rem' }
                      }}
                    >
                      View on {getDomain(item.link)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1, sm: 3 },
                    mt: 2
                  }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      <strong>Diameter:</strong> {item.diameter}mm
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      <strong>Thickness:</strong> {item.thickness}mm
                    </Typography>
                  </Box>
                </Box>
              </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}

export default Item;
