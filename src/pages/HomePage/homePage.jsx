import styles from "./homePage.module.css";
import HomeLayout from "../../layouts/HomeLayout/homeLayout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import CategoryService from "../../services/category.service";
import Product from "../../components/Product/product";

const productInfor = {
  id: 817,
  name: "Ba lo CAMEL suc chua lon phu hop de di du lich.",
  price: "649.000",
  images: [
    {
      id: 3155,
      link: "https://down-vn.img.susercontent.com/file/4ca7b2db4a88c2823c2e0cd946d3e762_tn",
    },
    {
      id: 3156,
      link: "https://down-vn.img.susercontent.com/file/82f6635baf855ef8c3bfe26ff6ddd0f0_tn",
    },
    {
      id: 3157,
      link: "https://down-vn.img.susercontent.com/file/f5ccd563b670d4defe0b65771f5e87f0_tn",
    },
    {
      id: 3158,
      link: "https://down-vn.img.susercontent.com/file/751781dd5e3f6546eea4202eb27bc408_tn",
    },
    {
      id: 3159,
      link: "https://down-vn.img.susercontent.com/file/e1230738b92bd8a243d77fe102812cf5_tn",
    },
    {
      id: 3160,
      link: "https://down-vn.img.susercontent.com/file/fc60d6605984d41cdd3331f7d9471b4e_tn",
    },
    {
      id: 3161,
      link: "https://down-vn.img.susercontent.com/file/37a004af67f3be98c4dc0d89d63e6d8b_tn",
    },
    {
      id: 3162,
      link: "https://down-vn.img.susercontent.com/file/645326df5f98cda9da6a9dddf3ce05bd_tn",
    },
    {
      id: 3163,
      link: "https://down-vn.img.susercontent.com/file/8568981511bb90487d13187ec4c43ca8_tn",
    },
    {
      id: 3164,
      link: "https://down-vn.img.susercontent.com/file/eb6b79503d59bde67cba62069f561449_tn",
    },
  ],
  link: "https://shopee.vn/Ba-lô-CAMEL-sức-chứa-lớn-phù-hợp-để-đi-du-lịch.-i.264049024.12731670399",
  source_description: "Shopee Ba Lo Nam",
  crawled: true,
  updated_at: "2023-03-22T09:03:29.040000Z",
  created_at: "2023-03-22T09:00:46.698000Z",
  category: {
    id: 1,
    name: "ba lo nam",
  },
};

function SelectedItem(props) {
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

const HomePage = () => {
  const [selectedCate, setSelectedCate] = useState([]);
  const [suggestCate, setSuggestCate] = useState([]);
  const [searchCate, setSearchCate] = useState("");

  useEffect(() => {
    // setSuggestCate(testItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    CategoryService.getRandom(10).then((res) => {
      setSuggestCate(res);
    });
  }, []);

  // const handleTest = () => {
  //   CategoryService.search();
  // };

  const handleSelectItem = (item) => {
    // setSuggestCate((current) => current.filter((sitem) => sitem !== item))
    setSelectedCate([...selectedCate, item]);
    CategoryService.search(searchCate, 10).then((res) => {
      setSuggestCate(res);
    });
  };

  const handleSetSearchCate = (searchInput) => {
    setSearchCate(searchInput);
    CategoryService.search(searchInput, 10).then((res) => {
      setSuggestCate(res);
    });
  };

  const handleRemoveItem = (item) => {
    setSelectedCate((current) => current.filter((sitem) => sitem !== item));
    // setSuggestCate([...suggestCate, item])
  };

  return (
    <HomeLayout>
      <Grid container height="100%">
        <Grid item xs={2.5} height="100%">
          <div className={styles._sidebar_left}>sidebar_left</div>
        </Grid>
        <Grid item xs={7}>
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
              {/* <button onClick={handleTest}>test</button> */}

              <Product info={productInfor} id={70} />
              <Product info={productInfor} id={75} />
              <Product info={productInfor} id={80} />
              <Product info={productInfor} id={85} />
              <Product info={productInfor} id={85} />
              <Product info={productInfor} id={85} />
              <Product info={productInfor} id={85} />
              <Product info={productInfor} id={85} />
              <Product info={productInfor} id={85} />
              <Product info={productInfor} id={85} />
              <Product info={productInfor} id={85} />
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
                  label="Chọn phân loại"
                  variant="standard"
                  value={searchCate}
                  fullWidth
                  onChange={(e) => {
                    handleSetSearchCate(e.target.value);
                  }}
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
                  maxHeight: 200,
                  borderRadius: 1,
                  // backgroundColor: "blue",
                  overflow: "auto",
                }}
              >
                {selectedCate?.map((item) => {
                  return (
                    <SelectedItem
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
                      {item}
                    </SelectedItem>
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
                  if (!selectedCate.includes(item)) {
                    return (
                      <SelectedItem
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
                        {item}
                      </SelectedItem>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </Box>
            </Stack>
          </div>
        </Grid>
      </Grid>
    </HomeLayout>
  );
};

export default HomePage;
