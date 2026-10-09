import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { AssessmentForm } from './features/assessment/AssessmentForm';

const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'xs',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
});

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AssessmentForm />
    </MantineProvider>
  );
}
