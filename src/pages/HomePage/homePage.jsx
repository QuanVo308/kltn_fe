import "./homePage.css";
import HomeLayout from "../../layouts/HomeLayout/homeLayout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import React, { useState, useEffect } from "react";

const testItems = [
  "absc",
  "banh bong lan",
  "banh tao",
  "keo keo",
  "keo mut",
  "xe o to dieu khien tu xa",
  "sach giao khoa",
  "xit khu mui",
  "bot lam banh",
];

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

  useEffect(() => {
    setSuggestCate(testItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectItem = (item) => {
    // setSuggestCate((current) => current.filter((sitem) => sitem !== item))
    setSelectedCate([...selectedCate, item]);
  };

  const handleRemoveItem = (item) => {
    setSelectedCate((current) => current.filter((sitem) => sitem !== item));
    // setSuggestCate([...suggestCate, item])
  };

  return (
    <HomeLayout>
      <Grid container height="100%">
        <Grid item xs={2.5} height="100%">
          <div className="_sidebar_left">sidebar_left</div>
        </Grid>
        <Grid item xs={7}>
          <div className="section">home page</div>
        </Grid>
        <Grid item xs={2.5}>
          <div className="_sidebar_right">
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
          </div>
        </Grid>
      </Grid>
    </HomeLayout>
  );
};

export default HomePage;
