import "./searchAdvance.css";
import HomeLayout from "../../layouts/HomeLayout/homeLayout";
import Grid from "@mui/material/Grid";

const SearchAdvance = () => {
  return (
    <HomeLayout>
      <Grid container height="100%">
        <Grid item xs={2} height="100%">
          <div className="_sidebar_left">sidebar_left</div>
        </Grid>
        <Grid item xs={8}>
          <div className="section">test page</div>
        </Grid>
        <Grid item xs={2}>
          <div className="_sidebar_right">sidebar_right</div>
        </Grid>
      </Grid>
    </HomeLayout>
  );
};

export default SearchAdvance;
