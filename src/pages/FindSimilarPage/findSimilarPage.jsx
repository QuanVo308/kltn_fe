import styles from "./findSimilarPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout/homeLayout";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import React, { useState, useEffect } from "react";
import { Box, Stack, Grid, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import CategoryService from "../../services/category.service";
import Product from "../../components/Product/product";
import ProductService from "../../services/product.service";
import Pagination from "@mui/material/Pagination";
import Modal from "@mui/material/Modal";
import ImageChoiceForm from "../../components/ImageChoice/imageChoice";

const itemPerPage = 60;

const FindSimilarPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(2);
  const [chosenProduct, setChosenProduct] = useState();
  const [chosenImages, setChosenImages] = useState([]);
  const [openImageChoice, setOpenImageChoice] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState();

  useEffect(() => {
    // setSuggestCate(testItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
    findSimilarProducts()
    setChosenProduct(state.product);
    setChosenImages(state.imageChooseSet);
    console.log(state.imageChooseSet);
    if (state.imageChooseSet.length === 0) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const findSimilarProducts = () => {
    setProductList([])
    ProductService.getSimilarProduct(state.product.id, getImageID()).then((res) => {
      setMaxPage(Math.ceil(res.length / itemPerPage));
      for (let i = 0; i < res.length; i++) {
        res[i].product_comapre.images = [res[i].test_image]
        setProductList(current => [...current, res[i].product_comapre])
      }
    });
  };

  const getImageID = () => {
    var imageId = [];
    state.imageChooseSet.map((image) => {
      return imageId.push(image.id);
    });
    return imageId;
  };

  const handleCloseImageChoice = () => {
    setOpenImageChoice(false);
  };

  const handleBackHome = () => {
    navigate("/");
  };

  const handleChangePage = (event, value) => {
    if (value < 1) {
      value = 1;
    }
    if (value > maxPage) {
      value = maxPage;
    }
    setPage(value);
    // getNewProductList(getCategoryIds(), searchKey, value);
  };

  return (
    <HomeLayout>
      <Grid container height="100%">
        <Grid item xs={3} height="100%">
          <div className={styles._sidebar_left}>
            {chosenProduct && (
              <Stack>
                {/* <Typography
                  sx={{
                    // overflow: "hidden",
                    // textOverflow: "ellipsis",
                    // display: "-webkit-box",
                    // WebkitLineClamp: "4",
                    // WebkitBoxOrient: "vertical",
                    // width:'75%',
                    fontSize: "1.4rem",
                    fontWeight: "700",
                    // borderBottom: 1,
                    marginTop: "10px",
                    // marginLeft: "10px",
                    // borderColor: "#000000",
                  }}
                >
                  SẢN PHẨM TƯƠNG TỰ
                  {chosenProduct.name}
                </Typography> */}
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "4",
                    WebkitBoxOrient: "vertical",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    // borderBottom: 1,
                    marginTop: "10px",
                    paddingRight: "10px",
                    borderColor: "#000000",
                  }}
                >
                  {chosenProduct.name}
                </Typography>
                <Box>
                  <img
                    src={ProductService.getPlatFormLogo(chosenProduct.platform)}
                    alt="Logo"
                    className={styles.platformLogo}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "flex-start",
                    p: 1,
                    // m: 1,
                    bgcolor: "background.paper",
                    maxWidth: "100%",
                    maxHeight: "350px",
                    borderRadius: 1,
                    // backgroundColor: "blue",
                    overflow: "auto",
                  }}
                >
                  {chosenImages.map((image) => (
                    <Box
                      sx={{
                        display: "flex",
                        // flexWrap: "wrap",
                        justifyContent: "center",
                        // bgcolor: "background.paper",
                        width: "80px",
                        height: "80px",
                        margin: "5px",
                      }}
                    >
                      <img
                        src={`${image.link}`}
                        alt="menu"
                        className={styles.productImgMenu}
                      />
                    </Box>
                  ))}
                </Box>
                <Box sx={{
                  width:'100%',
                  display:'flex',
                  justifyContent:'center',
                  marginTop:'20px'
                }} >

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0A5379",
                    marginLeft: 1.4,
                    height: 30,
                    width: 180,
                    marginTop: 2,
                    textTransform: "none",
                  }}
                  onClick={handleBackHome}
                >
                  Quay lại trang chủ
                </Button>
                </Box>
              </Stack>
            )}
          </div>
        </Grid>
        <Grid item xs={8.5}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "flex-start",
              paddingTop: 0.5,
              // m: 1,
              bgcolor: "background.paper",
              maxWidth: "100%",
              height: "92vh",
              borderRadius: 1,
              // backgroundColor: "blue",
              overflow: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                // alignContent: "flex-start",
                // p: 1,
                paddingTop: "1%",
                justifyContent: "space-around",
                bgcolor: "background.paper",
                maxWidth: "100%",
                height: "97%",
                borderRadius: 1,
                // backgroundColor: "blue",
                overflow: "auto",
              }}
            >
              <Stack>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    bgcolor: "background.paper",
                    maxWidth: "100%",
                    // height: "97%",
                    borderRadius: 1,
                  }}
                >
                  {productList.length !== 0 ? (
                    productList?.map((product, index) => {
                      if (
                        index < page * itemPerPage &&
                        index >= (page - 1) * itemPerPage
                      ) {
                        return (
                          <Product
                            info={product}
                            setOpenImageChoice={setOpenImageChoice}
                            setSelectedProductId={setSelectedProductId}
                            selectedProductId={selectedProductId}
                          />
                        );
                      } else {
                        return <></>;
                      }
                    })
                  ) : (
                    <div>Đang tải....</div>
                  )}
                </Box>
                {productList.length !== 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-around",
                      bgcolor: "background.paper",
                      maxWidth: "100%",
                      height: "97%",
                      borderRadius: 1,
                      paddingTop: "10px",
                    }}
                  >
                    <Pagination
                      count={maxPage}
                      page={page}
                      onChange={handleChangePage}
                      color="primary"
                    />
                  </Box>
                )}
              </Stack>
            </Box>
          </Box>
          {/* <div className={styles.section}>
            
          </div> */}
        </Grid>
        <Grid item xs={1.0}>
          <div className={styles._sidebar_right}></div>
        </Grid>
      </Grid>
      <Modal
        open={openImageChoice}
        onClose={handleCloseImageChoice}
        aria-describedby="modal-modal-description"
      >
        <Box>
          <ImageChoiceForm
            selectedProductId={selectedProductId}
            handleCloseImageChoice={handleCloseImageChoice}
          />
        </Box>
      </Modal>
    </HomeLayout>
  );
};

export default FindSimilarPage;
