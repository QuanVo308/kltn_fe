import styles from "./header.module.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";

export default function Header(props) {
  const navigate = useNavigate();
  const handleSeachChange = (search) => {
    // console.log(search);
    props.setSearchKey(search);
  };

  const handleSeachEnter = (e) => {
    if (e.key === "Enter") {
      props.handleEnter()
    }
  };

  return (
    <Box height="100%">
      <Grid container height="100%" paddingLeft={2}>
        <Grid item xs={1.5} height="100%">
          {/* <Box
            sx={{ display: "flex", justifyContent: "center", height: "100%" }}
          > */}
          <Typography
            fontSize={15}
            fontWeight={600}
            color="white"
            sx={{
              display: "flex",
              alignItems: "center",
              height: "40%",
              paddingTop: "3%",
              fontStyle: "italic",
              cursor: "pointer",
            }}
            onClick={() => {navigate("/"); props.handleReload()}}
          >
            PRODUCT
          </Typography>
          <Typography
            fontSize={15}
            fontWeight={600}
            color="white"
            sx={{
              display: "flex",
              alignItems: "center",
              height: "40%",
              paddingLeft: "10px",
              fontStyle: "italic",
              cursor: "pointer",
            }}
            onClick={() => {navigate("/"); props.handleReload()}}
          >
            COMPARATOR
          </Typography>
          {/* </Box> */}
        </Grid>
        <Grid item xs={7}>
          <div>other</div>
        </Grid>
        <Grid item xs={3}>
          {props.showSearch && (
            <Box
              display="flex"
              justifyContent={"center"}
              alignItems="center"
              height="100%"
              sx={{
                paddingLeft: "0px",
                // backgroundColor: "yellow",
              }}
            >
              <Box
                display="flex"
                justifyContent={"center"}
                alignItems="center"
                height="34px"
                width="80%"
                sx={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: "white",
                  borderRadius: "25px",
                  paddingTop: "2px",
                }}
              >
                <SearchIcon
                  sx={{
                    fontSize: 30,
                    paddingRight: 1,
                    color: "#c7c7c7",
                    marginBottom: -0.4,
                  }}
                  onClick={() => {}}
                />
                <input
                  className={styles.searchInput}
                  type="text"
                  onChange={(e) => {
                    handleSeachChange(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    handleSeachEnter(e);
                  }}
                  value = {props.searchKey}
                  placeholder="Nhập tên sản phẩm...."
                ></input>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
