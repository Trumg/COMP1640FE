import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GuestCard from "../../../Components/Card/GuestCard/GuestCard";

const theme = createTheme();

const LayoutButton = styled(Button)({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
});

function GuestLayout() {
  const [isSingleColumn, setIsSingleColumn] = React.useState(true);

  const handleLayoutChange = () => {
    setIsSingleColumn(!isSingleColumn);
  };

  const renderCards = () => {
    const cardContent = (
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <GuestCard />
        </Typography>
      </CardContent>
    );

    if (isSingleColumn) {
      return (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card>{cardContent}</Card>
          </Grid>
          <Grid item xs={12}>
            <Card>{cardContent}</Card>
          </Grid>
          <Grid item xs={12}>
            <Card>{cardContent}</Card>
          </Grid>
          <Grid item xs={12}>
            <Card>{cardContent}</Card>
          </Grid>
          <Grid item xs={12}>
            <Card>{cardContent}</Card>
          </Grid>
          <Grid item xs={12}>
            <Card>{cardContent}</Card>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>{cardContent}</Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>{cardContent}</Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>{cardContent}</Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>{cardContent}</Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>{cardContent}</Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>{cardContent}</Card>
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        {renderCards()}
        <LayoutButton onClick={handleLayoutChange}>
          {isSingleColumn
            ? "Switch to Multiple Column"
            : "Switch to Single Column"}
        </LayoutButton>
      </Container>
    </ThemeProvider>
  );
}

export default GuestLayout;
