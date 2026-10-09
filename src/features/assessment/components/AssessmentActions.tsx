import { Button, Group } from '@mantine/core';

export interface AssessmentActionsProps {
  onLoadSample: () => void;
  isSaving: boolean;
}

export function AssessmentActions({ onLoadSample, isSaving }: AssessmentActionsProps) {
  return (
    <Group justify="flex-end" mt="lg" gap="sm">
      <Button
        type="button"
        variant="default"
        onClick={onLoadSample}
        style={{ borderColor: '#d8d3c9' }}
      >
        Load sample patient
      </Button>
      <Button
        type="submit"
        style={{ backgroundColor: '#0b2545' }}
        loading={isSaving}
        disabled={isSaving}
      >
        Save Assessment
      </Button>
    </Group>
  );
}
