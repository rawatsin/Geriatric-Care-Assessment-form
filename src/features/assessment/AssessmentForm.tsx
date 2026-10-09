import { useState } from 'react';
import { Container, Paper, Stack, Text, Title } from '@mantine/core';
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
    <Container size="sm" py="xl">
      <Paper withBorder shadow="sm" p="xl" radius="md">
        <Title order={2} mb={4}>
          Geriatric Care Assessment
        </Title>
        <Text size="sm" c="dimmed" mb="lg">
          In-home Clinical Assessment for Elderly Patients
        </Text>

        <form onSubmit={handleFormSubmit} noValidate>
          <Stack gap="md">
            <AssessmentFields form={form} />
            <AssessmentActions
              onLoadSample={handleLoadSample}
              isSaving={isSaving}
            />
          </Stack>
        </form>

        {savedAssessment && <AssessmentResult assessment={savedAssessment} />}
      </Paper>
    </Container>
  );
}
