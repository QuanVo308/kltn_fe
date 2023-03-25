import "./header.scss";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Header(props) {
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
            }}
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
            }}
          >
            COMPARATOR
          </Typography>
          {/* </Box> */}
        </Grid>
        <Grid item xs={8}>
          <div>other</div>
        </Grid>
      </Grid>
    </Box>
  );
}
