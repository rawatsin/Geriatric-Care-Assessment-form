import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Container, MantineProvider } from '@mantine/core';
import { AssessmentForm } from './features/assessment/AssessmentForm';

export default function App() {
  return (
    <MantineProvider>
      <Container size="md" py="xl">
        <AssessmentForm />
      </Container>
    </MantineProvider>
  );
}
