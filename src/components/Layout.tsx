import {Container, Box} from "@mui/material";
import {Header} from "./Header";
import {Footer} from "./Footer";
import {PropsWithChildren} from "react";

export const Layout = ({children}: PropsWithChildren) => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header/>
            <Container component="main" sx={{flexGrow: 1, pb: "4rem"}}>
                {children}
            </Container>
            <Footer/>
        </Box>
    );
};
