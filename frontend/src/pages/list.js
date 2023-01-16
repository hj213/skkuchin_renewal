import { useDispatch, useSelector } from "react-redux"
import { load_places } from "../actions/place/place";
import Map from "../components/Map";
import Layout from "../hocs/Layout";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

export default function list(){

    const dispatch = useDispatch();
    const dispatchPlace = () => dispatch(load_places);
    const place = useSelector(state => state.place.place);
    const user = useSelector(state => state.auth.user);

    const card = (
        <>
          <CardContent>
            <Grid container spacing={2}>
                <Grid xs={2}>
                    <Typography sx={{fontSize: '18px', fontWeight:'500', lineHeight: '28px'}} color="#000000" gutterBottom>
                    기꾸스시
                    </Typography>
                </Grid>
                <Grid xs>
                    <Typography sx={{fontSize: '10px', fontWeight: '500'}} color="#a1a1a1" component="div">
                    초밥, 롤
                    </Typography>
                </Grid>
            </Grid>
            <Grid container >
                <Grid xs={2}>
                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                    스꾸친 평점 :
                    </Typography>
                </Grid>
                <Grid xs>
                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                    ⭐️
                    </Typography>
                </Grid>
                <Grid xs>
                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                    4.5/5
                    </Typography>
                </Grid>
                <Grid xs>
                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                    |
                    </Typography>
                </Grid>
                <Grid xs>
                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                    스꾸리뷰
                    </Typography>
                </Grid>
                <Grid xs>
                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                    33개
                    </Typography>
                </Grid>
            </Grid>
            <Grid container >
                <Grid >
                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                    위치 : 정문  
                    </Typography>
                </Grid>
                <Grid >
                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                     (성균관로)
                    </Typography>
                </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </>
      );

    return(
       <Layout>
            <div style={{ position: 'relative'}}>
                <Map latitude={37.58622450673971} longitude={126.99709024757782} />
            </div>
            
            <Card style={{
                borderRadius: '30px 30px 0 0' ,
                position: 'absolute',
                width: '552px',
                top: '641px',
                height: '353px',
                overflowX: 'x',
                zIndex: '1',
                }}>{card}
            </Card>
        </Layout>

    )
}