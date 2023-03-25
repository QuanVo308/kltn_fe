import styles from "./product.module.css";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Stack from "@mui/material/Stack";
import { useState } from "react";

export default function Product(props) {
  const [showLink, setShowLink] = useState(false);

  const handleMouseOver = () => {
    setShowLink(true);
  };

  const handleMouseOut = () => {
    setShowLink(false);
  };
  return (
    <Box margin={1} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {/* <div>{props.info.id}</div> */}

      <Card
        sx={{
          maxWidth: 200,
          height: 390,
          border: 1,
          borderColor: "#c7c7c7",
          "&:hover": {
            // maxWidth: 240,
            // height: 500,
            boxShadow: "4px 4px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        {/* <CardMedia
          sx={{ height: 140, maxWidth: 200 }}
          image={`http://localhost:8000/api/product_test/${70}/get_image/`}
          title="green iguana"
        /> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            // bgColor: "yellow",
            height: "170px",
          }}
        >
          <img
            src={`http://localhost:8000/api/product_test/${props.id}/get_image/`}
            alt="UET CLASS"
            className={styles.productImg}
          />
        </Box>

        <CardContent sx={{ paddingTop: 0.6 }}>
          <Box
            sx={{
              width: "100%",
              height: "30px",
              // backgroundColor: "yellow",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {showLink && (
              <Button
                style={{
                  width: "120px",
                  height: "25px",
                }}
                variant="contained"
              >
                <Typography fontSize={10} fontWeight={600}>
                  Đến nơi bán
                </Typography>
              </Button>
            )}
          </Box>

          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {props.info.name}
          </Typography>
          <Typography
            color="red"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "4",
              WebkitBoxOrient: "vertical",
            }}
          >
            {props.info.price}
          </Typography>
          <img
            src={`http://localhost:8000/api/product_test/${props.id}/get_image/`}
            alt="UET CLASS"
            className={styles.platformLogo}
          />
        </CardContent>
        <CardActions>
          <Button size="small">
            <Typography fontSize={10} fontWeight={600}>
              Tìm tương tự
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
