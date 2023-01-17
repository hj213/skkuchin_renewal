import { CssBaseline, Typography, Box, ThemeProvider } from '@mui/material';
import Map from '../components/Map';
import Layout from "../hocs/Layout";
import theme from '../theme/theme';
import styled from '@emotion/styled';

const homePage = () => {
  
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout
        title='스꾸친 home'
        content = '스꾸친의 메인 페이지입니다.'
      >
        <Map latitude={37.58622450673971} longitude={126.99709024757782} />
        <Test1>dasds</Test1>
        <Test2>dasds</Test2>
        <Test3>dasds</Test3>
        <Test4>dasds</Test4>
        <Typography variant='h1' sx={{fontSize: 30}}>볼드</Typography>
        <Typography variant='h2' sx={{fontSize: 30}}>미디엄</Typography>
        <Typography variant='h3' sx={{fontSize: 30}}>레귤러</Typography>
        <Box color='primary.main'>Haha</Box>
        <Box sx={{ color: theme.palette.primary.light }}>Haha</Box>
      </Layout>
    </ThemeProvider>
  )
};

const Test1 = styled.div`
  color: ${theme.palette.primary.main};
  font-size: 30px;
`

const Test2 = styled.div`
  color: ${theme.palette.primary.light};
  font-size: 30px;
`
const Test3 = styled.div`
  color: ${theme.palette.secondary.main};
  font-size: 30px;
`
const Test4 = styled.div`
  color: ${theme.palette.secondary.light};
  font-size: 30px;
`

export default homePage;