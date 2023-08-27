import { CssBaseline, ThemeProvider } from "@mui/material";
import dynamic from "next/dynamic";
import UpperBar from "../components/UpperBar";
import theme from "../theme/theme";

const RecommendPage = () => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <UpperBar />
            <div className="">

            </div>
        </ThemeProvider>
    );
};

export default dynamic(() => Promise.resolve(RecommendPage), {
    ssr: false,
});