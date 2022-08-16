import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      '100 transactions total',
      'Simple end-of-year reporting',
      'Standard customer access',
    ],
    buttonText: 'Get started',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '6',
    description: [
      '1000 transactions per month',
      'Detailed end-of-year reports',
      'Priority customer support',
    ],
    buttonText: 'Upgrade',
    buttonVariant: 'contained',
  },
  {
    title: 'Lifetime',
    price: '600',
    description: [
      'Unlimited transactions',
      'All future updates for free',
      'Only 1000 slots available',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

const redirects = {
  "Free": "Create",
  "Pro": "Upgrade"
}

const Pricing = ({address, setLocation}) => {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Quickly build an effective pricing table for your potential customers with
          this layout. It&apos;s built with default MUI components with little
          customization.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Lifetime' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      { tier.title === "Lifetime" ? "/once" :  "/month"}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  { (tier.title === "Lifetime") 
                  ?
                    <Button fullWidth variant={tier.buttonVariant} onClick={() => window.open("mailto:ohaiyo+d4cbooks@atemosta.com", '_blank')}>
                      {tier.buttonText}
                    </Button>
                  :
                    <Button fullWidth variant={tier.buttonVariant} 
                    onClick={address ? (() => () => setLocation(redirects[tier.title])) : (() => setLocation("Landing"))}
                    >
                      {tier.buttonText}
                    </Button>  
                  }
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Pricing
