import React from "react";
import Page from "components/templates/Page";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Egg from "components/icons/Egg";
import Recipe from "components/icons/Recipe";
import Text from "components/atoms/Text";
import Grid from "@mui/material/Grid";

export const Homepage: React.FunctionComponent = () => {
  return (
    <Page
      sx={{
        backgroundColor: "primary.main",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 0,
      }}
    >
      <Grid padding={3} spacing={3} container>
        <Grid item xs={12}>
          <Text color="white" fontSize="64px" textAlign="center" variant="h1">
            Solid Grocery List
          </Text>
        </Grid>
        <Grid xs={12} item>
          <Card>
            <CardActionArea href="/food-list">
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Egg />
                <Text variant="subtitle1"> Foods </Text>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid xs={12} md={6} item>
          <Card>
            <CardActionArea href="/recipe-list">
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Recipe color="primary" />
                <Text variant="subtitle1">Recipes </Text>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid xs={12} md={6} item>
          <Card>
            <CardActionArea href="/groceries">
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <ShoppingCartIcon color="primary" />
                <Text variant="subtitle1"> Groceries </Text>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Homepage;
