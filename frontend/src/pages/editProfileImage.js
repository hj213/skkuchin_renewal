import { CssBaseline, ThemeProvider} from '@mui/material';
import theme from '../theme/theme';
import dynamic from 'next/dynamic';
import { useState} from "react";

const EditProfileImage = dynamic(() => import('../components/MyPage/EditProfileImage'));

const editProfileImage = () => {
    const [image, setImage] = useState("");

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <EditProfileImage image={image} setImage={setImage}/>
        </ThemeProvider>

    )

}

export default dynamic(() => Promise.resolve(editProfileImage), {
    ssr: false,
});