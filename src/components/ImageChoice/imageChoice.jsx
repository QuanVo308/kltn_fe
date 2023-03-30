import styles from "./imageChoice.module.css";
import { Box, Stack, Grid, Typography, Button } from "@mui/material";
import ProductService from "../../services/product.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function ImageChoiceForm(props) {
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState();
  const [productImgChose, setProductImgChose] = useState();
  const [imageChoosePrevId, setImageChoosePrevId] = useState(-1);
  const [imageChooseSet, setImageChooseSet] = useState([]);

  useEffect(() => {
    console.log(props.selectedProductId);
    setImageChooseSet([]);
    ProductService.getProduct(props.selectedProductId).then((res) => {
      setProductInfo(res);
      setProductImgChose(res.images[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedProductId]);

  const handleFindSimilar = () => {
    props.handleCloseImageChoice()
    navigate("/findSimilar", {
      state: { product: productInfo, imageChooseSet: imageChooseSet },
    });

  };
  const handleOnclickMenu = (image) => {
    setProductImgChose(image);
    console.log("test", imageChoosePrevId, image.id);
    if (imageChoosePrevId.id === image.id) {
      if (imageChooseSet.some((img) => image.id === img.id)) {
        console.log("check");
        setImageChooseSet((current) =>
          current.filter((sitem) => sitem !== image)
        );
      } else {
        console.log("check1");
        setImageChooseSet([...imageChooseSet, image]);
      }
    } else {
      setImageChoosePrevId(image);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 900,
        height: 500,
        bgcolor: "background.paper",
        // border: "2px solid #000",
        borderRadius: "15px",
        boxShadow: 24,
        justifyContent: "center",
        p: 4,
      }}
    >
      <Grid container height="100%">
        <Grid item xs={7} height="100%" marginRight={3}>
          {productInfo && (
            <Box
              sx={{
                display: "flex",
                // flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                // p: 1,
                // m: 1,
                bgcolor: "background.paper",
                width: "100%",
                height: "100%",
                borderRadius: 1,
                // backgroundColor: "blue",
                // overflow: "auto",
              }}
            >
              <img
                src={`${productImgChose.link}`}
                alt="menu"
                className={styles.productImgChose}
              />
            </Box>
          )}
        </Grid>
        <Grid item xs={4.5} height="100%">
          {productInfo && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignContent: "flex-start",
                p: 1,
                bgcolor: "background.paper",
                maxWidth: "100%",
                height: "100%",
                // backgroundColor: "yellow",
                borderLeft: 1,
                borderColor: "#d9d9d9",
              }}
            >
              <Stack>
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "4",
                    WebkitBoxOrient: "vertical",
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    // borderBottom: 1,
                    // marginBottom: "10px",
                    borderColor: "#000000",
                  }}
                >
                  {productInfo.name}
                </Typography>
                <Box>
                  <img
                    src={ProductService.getPlatFormLogo(productInfo.platform)}
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
                    height: "250px",
                    borderRadius: 1,
                    // backgroundColor: "blue",
                    overflow: "auto",
                  }}
                >
                  {productInfo.images.map((image) => (
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
                      {...(imageChooseSet.some(
                        (img) => img.id === image.id
                      ) && {
                        border: 2,
                        borderColor: "#da0d0d",
                      })}
                    >
                      <img
                        src={`${image.link}`}
                        alt="menu"
                        onClick={() => {
                          handleOnclickMenu(image);
                        }}
                        className={styles.productImgMenu}
                      />
                    </Box>
                  ))}
                </Box>
                {imageChooseSet.length === 0 ? (
                  <Typography fontSize={13} fontWeight={600} color="red">
                    Vui lòng chọn (kích chuột thêm một lần) ít nhất một ảnh để
                    tìm kiếm
                  </Typography>
                ) : (
                  <Typography fontSize={13} fontWeight={600} color="blue">
                    Đã chọn {imageChooseSet.length} ảnh
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    style={{
                      width: "70%",
                      height: "30px",
                    }}
                    {...(imageChooseSet.length === 0 && {
                      disabled: "true",
                    })}
                    variant="contained"
                    onClick={() => {
                      handleFindSimilar();
                    }}
                  >
                    <Typography
                      fontSize={13}
                      fontWeight={600}
                      // onClick={() => openInNewTab("https://bobbyhadz.com")}
                    >
                      Tìm sản phẩm tương tự
                    </Typography>
                  </Button>
                </Box>
              </Stack>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
