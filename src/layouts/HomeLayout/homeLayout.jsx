import styles from "./homeLayout.module.css";
import Header from "../../components/Header/header";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const HomeLayout = (props) => {
  var showSearch = false;
  // var handleReload
  // const handleReloadTemp = () => {
  //   console.log('temp')
  // };
  if (props.showSearch) {
    showSearch = props.showSearch;
  }

  // if (props.handleReload) {
  //   console.log('temp')
  //   handleReload = handleReloadTemp;
  // } else {
  //   console.log('not temp')
    // handleReload = props.handleReload;
  // }

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
          handleReload={props.handleReload}
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
