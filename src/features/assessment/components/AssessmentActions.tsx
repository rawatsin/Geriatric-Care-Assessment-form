import { Button, Group } from '@mantine/core';

export interface AssessmentActionsProps {
  onLoadSample: () => void;
  isSaving: boolean;
}

export function AssessmentActions({ onLoadSample, isSaving }: AssessmentActionsProps) {
  return (
    <Group justify="flex-end" mt="xl">
      <Button type="button" variant="default" onClick={onLoadSample}>
        Load sample patient
      </Button>
      <Button type="submit" loading={isSaving} disabled={isSaving}>
        Save Assessment
      </Button>
    </Group>
  );
}
