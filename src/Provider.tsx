import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from "@mantine/core";
import '@mantine/dropzone/styles.css';
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