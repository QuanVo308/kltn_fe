import styles from "./homeLayout.module.css";
import Header from "../../components/Header/header";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const HomeLayout = (props) => {
  var showSearch = false;
  if (props.showSearch) {
    showSearch = props.showSearch;
  }

  return (
    // <>
    //   <Box sx={{ height: "100vh" }}>
    <Stack spacing={0} height="100vh">
      <Box className={styles.header}>
        <Header
          showSearch={showSearch}
          searchKey={props.searchKey}
          setSearchKey={props.setSearchKey}
          handleEnter={props.handleEnter}
        />
      </Box>
      {/* <Grid container height="100%">
        <Grid item xs={2} height="100%">
          <div className="_sidebar_left">sidebar_left</div>
        </Grid>
        <Grid item xs={8}>
          <div className="section">{props.children}</div>
        </Grid>
        <Grid item xs={2}>
          <div className="_sidebar_right">sidebar_right</div>
        </Grid>
      </Grid> */}
      <Box className={styles.section}>{props.children}</Box>
    </Stack>
    //   </Box>
    // </>
  );
};

export default HomeLayout;
