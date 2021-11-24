import React from "react";
import Page from "components/templates/Page";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import ShoppingCart from "components/icons/ShoppingCart";
import Egg from "components/icons/Egg";
import Recipe from "components/icons/Recipe";
import Text from "components/atoms/Text";
import Grid from "@mui/material/Grid";

export const Homepage: React.FunctionComponent = () => {
  return (
    <Page sx={{ justifyContent: "center", alignItems: "center" }}>
      <Grid padding={3} spacing={3} container>
        <Grid item xs={12}>
          <Text fontSize="64px" textAlign="center" variant="h1">
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
                <Egg />
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
                <Egg />
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
