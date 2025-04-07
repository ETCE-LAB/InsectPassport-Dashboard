import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from "@mantine/core";
import App from "./App";
import '@mantine/dropzone/styles.css';
import {LandingPage} from "./ui/LandingPage";
import AppRouter from "./Router";
import '@mantine/carousel/styles.css';

const theme = createTheme({
    /** Put your mantine theme override here */
});

export const Provider = () => {


    return <MantineProvider theme={theme}>
        <AppRouter />
    </MantineProvider>
}