import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from "@mantine/core";
import AppRouter from "./Router";
import '@mantine/carousel/styles.css';
// ‼️ import charts styles after core package styles
import '@mantine/charts/styles.css';

const theme = createTheme({
    /** Put your mantine theme override here */
});

export const Provider = () => {


    return <MantineProvider theme={theme}>
        <AppRouter />
    </MantineProvider>
}