import styles from "./testPage.module.css";
import HomeLayout from "../../layouts/HomeLayout/homeLayout";
import TestProductService from "../../services/test.service";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

const TestPage = () => {
  const [otherImages, setOtherImages] = useState();
  const [anchorImage, setAnchorImage] = useState();
  useEffect(() => {
    const fetchData = async () => {
      console.log("test click");
      TestProductService.getAll().then((images) => {
        setOtherImages(images);
        // setAnchorImage(images[20]);
      });
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTestClick = () => {
    // TestProductService.test();
    TestProductService.getSimilarImages("0224");
    console.log(otherImages[1].id);
  };

  const handleImageClick = (image) => {
    console.log(image.id, image.name);
    setAnchorImage(image);
    setOtherImages();
    TestProductService.getSimilarImages(image.name).then((images) => {
      setOtherImages(images);
    });
  };

  return (
    <HomeLayout>
      <Grid container height="100%">
        <Grid item xs={2} height="100%">
          <div className={styles._sidebar_left}>sidebar_left</div>
        </Grid>
        <Grid item xs={8}>
          <div>TestPage</div>
          <button onClick={handleTestClick}> test </button>

          <Paper
            sx={{
              maxHeight: "80vh",
              overflow: "auto",
              backgroundColor: "#868686",
            }}
          >
            <Grid container height="100%">
              <Grid item xs={3} height="100%">
                <Stack>
                  <Typography
                    fontSize={15}
                    fontWeight={600}
                    color="black"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: "40%",
                      paddingLeft: "10px",
                    }}
                  >
                    Selected Image
                  </Typography>
                  {anchorImage && (
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}/product_test/${anchorImage.id}/get_image/`}
                      alt="UET CLASS"
                      className={styles.userImg}
                    />
                  )}
                </Stack>
              </Grid>
              <Grid item xs={9} height="100%">
                <Stack spacing={2}>
                  <Typography
                    fontSize={15}
                    fontWeight={600}
                    color="black"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: "40%",
                      paddingLeft: "10px",
                    }}
                  >
                    Other Image
                  </Typography>
                  {otherImages?.map((image) => {
                    return (
                      <Grid container height="100%">
                        <Grid item xs={2} height="100%">
                          <img
                            src={`${process.env.REACT_APP_SERVER_URL}/product_test/${image.id}/get_image/`}
                            alt="UET CLASS"
                            className={styles.userImg}
                            onClick={() => {
                              handleImageClick(image);
                            }}
                          />
                        </Grid>
                        <Grid item xs={8} height="100%">
                          <Typography
                            fontSize={10}
                            fontWeight={200}
                            color="black"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              height: "40%",
                              paddingLeft: "10px",
                            }}
                          >
                            Name: {image.name}
                          </Typography>
                          <Typography
                            fontSize={10}
                            fontWeight={200}
                            color="black"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              height: "40%",
                              paddingLeft: "10px",
                            }}
                          >
                            Cosine Distance: {image.cosine_distance}
                          </Typography>
                          <Typography
                            fontSize={10}
                            fontWeight={200}
                            color="black"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              height: "40%",
                              paddingLeft: "10px",
                            }}
                          >
                            Euclidean Distance: {image.euclidean_distance}
                          </Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <div className={styles._sidebar_right}>sidebar_right</div>
        </Grid>
      </Grid>
    </HomeLayout>
  );
};

export default TestPage;
