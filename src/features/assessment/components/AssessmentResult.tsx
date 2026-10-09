import { Alert, Box, Code, Text } from '@mantine/core';
import type { Assessment } from '../schema';

export interface AssessmentResultProps {
  assessment: Assessment;
}

export function AssessmentResult({ assessment }: AssessmentResultProps) {
  return (
    <Alert
      color="green"
      variant="light"
      title="Assessment Saved"
      radius="sm"
      mt="lg"
      styles={{
        root: {
          backgroundColor: '#f0fdf4',
          borderColor: '#86efac',
          borderWidth: 1,
          borderStyle: 'solid',
          textAlign: 'left',
        },
        title: {
          color: '#166534',
          fontWeight: 700,
        },
      }}
    >
      <Box mt="xs">
        <Text size="xs" fw={600} c="#166534" mb={4}>
          Parsed Record Output:
        </Text>
        <Code
          block
          style={{
            backgroundColor: '#0f172a',
            color: '#f8fafc',
            borderRadius: '4px',
            padding: '12px 14px',
            fontSize: '12.5px',
            lineHeight: 1.5,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            maxHeight: '280px',
            overflowY: 'auto',
            display: 'block',
            textAlign: 'left',
            border: '1px solid #1e293b',
          }}
        >
          {JSON.stringify(assessment, null, 2)}
        </Code>
      </Box>
    </Alert>
  );
}
