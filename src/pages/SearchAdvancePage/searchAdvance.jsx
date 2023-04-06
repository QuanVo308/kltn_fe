import styles from "./searchAdvance.module.css";
import HomeLayout from "../../layouts/HomeLayout/homeLayout";
import React, { useState, useEffect, useRef } from "react";
import { Box, Stack, Grid, Typography, Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
import CategoryService from "../../services/category.service";
import ProductService from "../../services/product.service";

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

const SearchAdvance = () => {
  const [selectedCate, setSelectedCate] = useState([]);
  const [suggestCate, setSuggestCate] = useState([]);
  const [searchCate, setSearchCate] = useState("");
  const [fileList, setFileList] = useState([]);
  const [fileDataURLs, setFileDataURLs] = useState([]);
  const [zipTemp, setZipTemp] = useState(null);
  const inputRef = useRef(null);
  var formData = new FormData();

  useEffect(() => {
    // setSuggestCate(testItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    CategoryService.getRandom(10).then((res) => {
      setSuggestCate(res);
    });
    setFileDataURLs([]);
    setSearchCate("");
    setSelectedCate([]);
    setFileList([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      CategoryService.search(searchCate, 10).then((res) => {
        setSuggestCate(res);
      });
    }, 700);

    return () => clearTimeout(timer);
  }, [searchCate, selectedCate]);

  useEffect(() => {
    let fileReader,
      isCancel = false;
    var JSZip = require("jszip");
    var zip = new JSZip();
    setFileDataURLs([]);

    if (fileList[0]) {
      for (var i = 0; i < fileList.length; i++) {
        // console.log(fileList[i].name);
        zip.file(fileList[i].name, fileList[i]);

        fileReader = new FileReader();
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result && !isCancel) {
            setFileDataURLs((current) => [...current, result]);
          }
        };
        fileReader.readAsDataURL(fileList[i]);
      }
      zip.generateAsync({ type: "blob" }).then(function (blob) {
        console.log(blob);
        var tempZip = new File([blob], "temp.zip");
        // console.log(tempZip);
        setZipTemp(tempZip);
      });
    }
  }, [fileList]);

  // const getCategoryIds = () => {
  //   var categories = [];
  //   selectedCate.map((item) => {
  //     return categories.push(item.id);
  //   });
  //   return categories;
  // };

  const handleFileChange = (e) => {
    setFileList(e.target.files);
  };

  const handleReloadFileInput = () => {
    setFileDataURLs([]);
    setFileList([]);
    inputRef.current.value = null;
  };

  const test = (e) => {
    formData.append("file", zipTemp);
    console.log(zipTemp);
    ProductService.getSimilarityZip(formData)
  };

  const sumProductCategory = () => {
    var sum = 0;
    for (var i = 0; i < selectedCate.length; i++) {
      sum += selectedCate[i].quantity;
    }
    // console.log('sum', sum)
    return sum;
  };

  const handleSelectItem = (item) => {
    // setSuggestCate((current) => current.filter((sitem) => sitem !== item))
    if (!selectedCate.some((e) => e.id === item.id)) {
      setSelectedCate([...selectedCate, item]);
    }
    // CategoryService.search(searchCate, 10).then((res) => {
    //   setSuggestCate(res);
    // });
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
    <HomeLayout>
      <Button onClick={test}>test</Button>
      {/* 
      {fileDataURLs?.map((image) => {
        return <img src={image} alt="test"></img>
      })} */}

      <Grid container height="100%">
        <Grid item xs={2} height="100%">
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
              backgroundColor: "transparent",
              overflow: "auto",
            }}
          >
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "4",
                WebkitBoxOrient: "vertical",
                fontSize: "1.3rem",
                fontWeight: "700",
                // borderBottom: 1,
                // marginBottom: "10px",
                // color: "#9c9c9c",
                paddingLeft: "10px",
              }}
            >
              Tìm kiếm nâng cao
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={5.5}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "flex-start",
              paddingTop: 0.5,
              // m: 1,
              // bgcolor: "blue",
              width: "100%",
              height: "92vh",
              borderRadius: 1,
              // backgroundColor: "transparent",
              // overflow: "auto",
            }}
          >
            <Stack sx={{ width: "100%" }}>
              <Box sx={{ mt: 1, ml: -1, display:'flex', justifyContent: 'space-between', pr:9 }}>
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "4",
                    WebkitBoxOrient: "vertical",
                    fontSize: "0.9rem",
                    fontWeight: "700",
                    // borderBottom: 1,
                    // marginBottom: "10px",
                    color: "#606060",
                    paddingLeft: "10px",
                  }}
                >
                  Các ảnh đã tải lên{" "}
                </Typography>
                  <CachedIcon
                    sx={{
                      fontSize: 16,
                      paddingRight: 1,
                      color: "#606060",
                      marginBottom: -0.4,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleReloadFileInput();
                    }}
                  />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignContent: "flex-start",
                  // p: 1,
                  mt: 1,
                  mb: 3,
                  bgcolor: "white",
                  width: "90%",
                  maxHeight: "600px",
                  minHeight: "50px",
                  borderRadius: 1,
                  // backgroundColor: "blue",
                  overflow: "auto",
                }}
              >
                {fileDataURLs?.map((image) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        // flexWrap: "wrap",
                        justifyContent: "center",
                        // bgcolor: "background.paper",
                        width: "190px",
                        height: "190px",
                        margin: "5px",
                      }}
                    >
                      <img
                        src={image}
                        alt="product"
                        className={styles.productImgMenu}
                      />
                    </Box>
                  );
                })}
              </Box>
              <Box sx={{ mb: 1, ml: -1 }}>
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "4",
                    WebkitBoxOrient: "vertical",
                    fontSize: "0.9rem",
                    fontWeight: "700",
                    // borderBottom: 1,
                    // marginBottom: "10px",
                    color: "#606060",
                    paddingLeft: "10px",
                  }}
                >
                  Tải ảnh lên (có thể chọn nhiều tệp)
                </Typography>
              </Box>
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                accept="image/*"
                ref={inputRef}
              />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={3}>
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
              backgroundColor: "transparent",
              overflow: "auto",
            }}
          >
            <Stack>
              <Box paddingLeft={1} padding={1}>
                <TextField
                  id="standard-basic"
                  label="Nhập tên phân loại"
                  variant="standard"
                  // value={searchCate}
                  fullWidth
                  onChange={(e) => {
                    handleSetSearchCate(e.target.value);
                  }}
                />
              </Box>
              {selectedCate.length === 0 ? (
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
              ) : (
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
                  Phân loại đã chọn:
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
                  backgroundColor: "transparent",
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
                        bgcolor: "#f3f3f3",
                      }}
                    >
                      <CloseIcon
                        sx={{
                          fontSize: 16,
                          paddingRight: 1,
                          color: "#f3f3f3",
                          marginBottom: -0.4,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleRemoveItem(item);
                        }}
                      />
                      [{item.quantity}] {item.name}
                    </CategoryItem>
                  );
                })}
              </Box>
              <Box margin={1} color="#a5a5a5" border={0.2}></Box>
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
                Phân loại gợi ý:
              </Typography>
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
                  backgroundColor: "transparent",
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
                          bgcolor: "#cdcdcd",
                        }}
                      >
                        <AddIcon
                          sx={{
                            fontSize: 16,
                            paddingRight: 1,
                            color: "#cdcdcd",
                            marginBottom: -0.4,
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleSelectItem(item);
                          }}
                        />
                        [{item.quantity}] {item.name}
                      </CategoryItem>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </Box>
              {sumProductCategory() >= 300 && selectedCate.length > 1 && (
                <Box paddingTop={1}>
                  <Typography
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "4",
                      WebkitBoxOrient: "vertical",
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      // borderBottom: 1,
                      // marginBottom: "10px",
                      color: "#9ca90f",
                      paddingLeft: "10px",
                    }}
                  >
                    Không nên so sánh quá nhiều sản phẩm
                  </Typography>
                </Box>
              )}
              <Box paddingTop={1}>
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "4",
                    WebkitBoxOrient: "vertical",
                    fontSize: "0.8rem",
                    fontWeight: "700",
                    // borderBottom: 1,
                    // marginBottom: "10px",
                    color: "#606060",
                    paddingLeft: "10px",
                  }}
                >
                  Tổng sản phẩm so sánh: {sumProductCategory()}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={1.5}>
          {/* <div className={styles._sidebar_right}>sidebar_right</div> */}
        </Grid>
      </Grid>
    </HomeLayout>
  );
};

export default SearchAdvance;
