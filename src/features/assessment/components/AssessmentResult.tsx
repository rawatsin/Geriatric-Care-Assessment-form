import { Alert, Box, Code, Text } from '@mantine/core';
import type { Assessment } from '../schema';

export interface AssessmentResultProps {
  assessment: Assessment;
}

export function AssessmentResult({ assessment }: AssessmentResultProps) {
  return (
    <Alert
      color="teal"
      title="Assessment Saved"
      radius="md"
      mt="lg"
      styles={{
        root: { textAlign: 'left' },
      }}
    >
      <Box mt="xs">
        <Text size="xs" fw={500} c="dimmed" mb={4}>
          Parsed Assessment Values:
        </Text>
        <Code
          block
          style={{
            backgroundColor: '#1a1b1e',
            color: '#f1f3f5',
            borderRadius: '6px',
            padding: '12px 14px',
            fontSize: '12.5px',
            lineHeight: 1.5,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            maxHeight: '280px',
            overflowY: 'auto',
            display: 'block',
            textAlign: 'left',
          }}
        >
          {JSON.stringify(assessment, null, 2)}
        </Code>
      </Box>
    </Alert>
  );
}
