import styles from "./homePage.module.css";
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

function CategoryItem(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 0.4,
        paddingLeft: 1,
        paddingRight: 1,
        m: 0.2,
        borderRadius: 2,
        fontSize: "0.8rem",
        fontWeight: "500",
        ...sx,
      }}
      {...other}
    />
  );
}

const itemPerPage = 60;

const HomePage = () => {
  const [selectedCate, setSelectedCate] = useState([]);
  const [productList, setProductList] = useState([]);
  const [suggestCate, setSuggestCate] = useState([]);
  const [searchCate, setSearchCate] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(2);
  const [openImageChoice, setOpenImageChoice] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState();

  useEffect(() => {
    // setSuggestCate(testItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getNewProductList(getCategoryIds(), searchKey, 1);
    CategoryService.getRandom(10).then((res) => {
      setSuggestCate(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      CategoryService.search(searchCate, 10).then((res) => {
        setSuggestCate(res);
      });
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchCate])


  const getCategoryIds = () => {
    var categories = [];
    selectedCate.map((item) => {
      return categories.push(item.id);
    });
    return categories;
  };

  const handleCloseImageChoice = () => {
    setOpenImageChoice(false);
  };

  const getNewProductList = (
    _selectedCate = [],
    _searchKey = "",
    _page = 1
  ) => {
    setPage(_page);
    setProductList([]);
    ProductService.getFindProduct(_selectedCate, _searchKey, _page).then(
      (response) => {
        // console.log(response.products.length);
        setMaxPage(Math.ceil(response.products.length / itemPerPage));
        setProductList(response.products);
      }
    );
  };

  const handleFilter = () => {
    getNewProductList(getCategoryIds(), searchKey, 1);
    // setSearchKey('')
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

  const handleEnter = () => {
    getNewProductList(getCategoryIds(), searchKey, 1);
  };

  const handleSelectItem = (item) => {
    // setSuggestCate((current) => current.filter((sitem) => sitem !== item))
    if (!selectedCate.some((e) => e.id === item.id)) {
      setSelectedCate([...selectedCate, item]);
    }
    CategoryService.search(searchCate, 10).then((res) => {
      setSuggestCate(res);
    });
  };

  const handleSetSearchCate = async (searchInput) => {
    setSearchCate(searchInput);

      // CategoryService.search(searchInput, 10).then((res) => {
      //   setSuggestCate(res);
      // });
  };

  const handleRemoveItem = (item) => {
    setSelectedCate((current) => current.filter((sitem) => sitem !== item));
    // setSuggestCate([...suggestCate, item])
  };

  return (
    <HomeLayout
      showSearch={true}
      searchKey={searchKey}
      setSearchKey={setSearchKey}
      handleEnter={handleEnter}
    >
      <Grid container height="100%">
        <Grid item xs={1} height="100%">
          {/* <div className={styles._sidebar_left}>sidebar_left</div> */}
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
        <Grid item xs={2.5}>
          <div className={styles._sidebar_right}>
            <Stack>
              <Box paddingLeft={1} padding={1}>
                <TextField
                  id="standard-basic"
                  label="Nhập tên phân loại"
                  variant="standard"
                  value={searchCate}
                  fullWidth
                  onChange={(e) => {
                    handleSetSearchCate(e.target.value);
                  }}
                />
              </Box>
              {selectedCate.length === 0 && (
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "4",
                    WebkitBoxOrient: "vertical",
                    fontSize: "0.7rem",
                    fontWeight: "700",
                    // borderBottom: 1,
                    // marginBottom: "10px",
                    color: "#9c9c9c",
                    paddingLeft: "10px",
                  }}
                >
                  Chưa chọn phân loại nào
                </Typography>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignContent: "flex-start",
                  p: 1,
                  // m: 1,
                  bgcolor: "background.paper",
                  maxWidth: "100%",
                  maxHeight: 200,
                  borderRadius: 1,
                  // backgroundColor: "blue",
                  overflow: "auto",
                }}
              >
                {selectedCate?.map((item) => {
                  return (
                    <CategoryItem
                      sx={{
                        ":hover": {
                          bgcolor: "#e54850",
                        },
                        bgcolor: "#c7c7c7",
                      }}
                    >
                      <CloseIcon
                        sx={{
                          fontSize: 16,
                          paddingRight: 1,
                          color: "#c7c7c7",
                          marginBottom: -0.4,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleRemoveItem(item);
                        }}
                      />
                      {item.name}
                    </CategoryItem>
                  );
                })}
              </Box>
              <Box margin={1} color="#a5a5a5" border={0.2}></Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignContent: "flex-start",
                  p: 1,
                  // m: 1,
                  bgcolor: "background.paper",
                  maxWidth: "100%",
                  maxHeight: 200,
                  borderRadius: 1,
                  // backgroundColor: "blue",
                  overflow: "auto",
                }}
              >
                {suggestCate?.map((item) => {
                  if (!selectedCate.some((e) => e.id === item.id)) {
                    return (
                      <CategoryItem
                        sx={{
                          ":hover": {
                            bgcolor: "#a5a5a5",
                          },
                          bgcolor: "#e7e7e7",
                        }}
                      >
                        <AddIcon
                          sx={{
                            fontSize: 16,
                            paddingRight: 1,
                            color: "#e7e7e7",
                            marginBottom: -0.4,
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleSelectItem(item);
                          }}
                        />
                        {item.name}
                      </CategoryItem>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0A5379",
                  marginLeft: 1.4,
                  height: 30,
                  width: 150,
                  marginTop: 2,
                  textTransform: "none",
                }}
                onClick={handleFilter}
              >
                Lọc sản phẩm
              </Button>
            </Stack>
          </div>
        </Grid>
      </Grid>
      <Modal
        open={openImageChoice}
        onClose={handleCloseImageChoice}
        aria-describedby="modal-modal-description"
      >
        <Box>
          <ImageChoiceForm selectedProductId={selectedProductId} />
        </Box>
      </Modal>
    </HomeLayout>
  );
};

export default HomePage;
