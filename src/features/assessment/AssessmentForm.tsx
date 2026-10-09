import { useState } from 'react';
import { Box, Container, Paper, Stack, Text, Title } from '@mantine/core';
import { schemaResolver, useForm } from '@mantine/form';
import { samplePatient } from './samplePatient';
import { assessmentSchema, type Assessment } from './schema';
import { AssessmentActions } from './components/AssessmentActions';
import { AssessmentFields, type FormValues } from './components/AssessmentFields';
import { AssessmentResult } from './components/AssessmentResult';

export type { FormValues };

const initialValues: FormValues = {
  mrn: '',
  patientName: '',
  dateOfBirth: '',
  assessmentDate: '',
  mobility: '',
  barthelIndex: '',
  medicationCount: '',
  pharmacistReviewRequested: false,
  followUpDate: '',
  consentObtained: false,
};

export interface AssessmentFormProps {
  onSave?: (assessment: Assessment) => void | Promise<void>;
}

export function AssessmentForm({ onSave }: AssessmentFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [savedAssessment, setSavedAssessment] = useState<Assessment | null>(null);

  const form = useForm<FormValues>({
    initialValues,
    validate: schemaResolver(assessmentSchema),
    validateInputOnBlur: true,
  });

  const handleSubmit = async (values: FormValues) => {
    setSavedAssessment(null);
    const parsed = assessmentSchema.parse(values);
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      await onSave?.(parsed);
      setSavedAssessment(parsed);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setSavedAssessment(null);
    form.onSubmit(handleSubmit)(event);
  };

  const handleLoadSample = () => {
    setSavedAssessment(null);
    form.setValues(samplePatient);
    form.clearErrors();
  };

  return (
    <Container size="sm" py={{ base: 'md', sm: 'xl' }}>
      <Paper
        withBorder
        shadow="xs"
        radius="sm"
        style={{
          backgroundColor: '#faf8f5',
          borderColor: '#d8d3c9',
          overflow: 'hidden',
        }}
      >
        <Box
          bg="#0b2545"
          px={{ base: 'md', sm: 'xl' }}
          py={{ base: 'md', sm: 'lg' }}
          style={{ borderBottom: '3px solid #134074' }}
        >
          <Title order={2} c="white" fw={700} fz={{ base: 20, sm: 22 }}>
            Geriatric Care Assessment
          </Title>
          <Text
            size="xs"
            c="#8da9c4"
            mt={2}
            fw={500}
            tt="uppercase"
            style={{ letterSpacing: '0.8px' }}
          >
            In-Home Clinical Assessment & Protocol Record
          </Text>
        </Box>

        <Box p={{ base: 'md', sm: 'xl' }}>
          <form onSubmit={handleFormSubmit} noValidate>
            <Stack gap="lg">
              <AssessmentFields form={form} />
              <AssessmentActions
                onLoadSample={handleLoadSample}
                isSaving={isSaving}
              />
            </Stack>
          </form>

          {savedAssessment && <AssessmentResult assessment={savedAssessment} />}
        </Box>
      </Paper>
    </Container>
  );
}
