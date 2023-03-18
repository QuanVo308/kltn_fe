import "./homeLayout.css";
import Header from "../../components/Header/header";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const HomeLayout = (props) => {
  return (
    // <>
    //   <Box sx={{ height: "100vh" }}>
    <Stack spacing={2} height="98vh">
      <Box className="header">
        <Header />
      </Box>
      <Grid container height="100%">
        <Grid item xs={2} height="100%">
          <div className="_sidebar_left">sidebar_left</div>
        </Grid>
        <Grid item xs={8}>
          <div className="section">{props.children}</div>
        </Grid>
        <Grid item xs={2}>
          <div className="_sidebar_right">sidebar_right</div>
        </Grid>
      </Grid>
    </Stack>
    //   </Box>
    // </>
  );
};

export default HomeLayout;
