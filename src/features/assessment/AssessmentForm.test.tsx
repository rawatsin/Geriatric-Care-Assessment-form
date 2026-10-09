import { MantineProvider } from '@mantine/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AssessmentForm } from './AssessmentForm';
import { samplePatient } from './samplePatient';
import { assessmentSchema } from './schema';

describe('Geriatric Assessment Form', () => {
  describe('Schema Validation - Age Boundary', () => {
    it('accepts a patient exactly 60 years old on assessment date and rejects one day younger', () => {
      // assessmentDate in samplePatient is '2026-08-07'
      // Exactly 60 years old on 2026-08-07 is born on 1966-08-07
      const exact60Patient = {
        ...samplePatient,
        dateOfBirth: '1966-08-07',
      };
      const exact60Result = assessmentSchema.safeParse(exact60Patient);
      expect(exact60Result.success).toBe(true);

      // One day younger is born on 1966-08-08 (one day short of 60)
      const oneDayYoungerPatient = {
        ...samplePatient,
        dateOfBirth: '1966-08-08',
      };
      const oneDayYoungerResult = assessmentSchema.safeParse(oneDayYoungerPatient);
      expect(oneDayYoungerResult.success).toBe(false);
      if (!oneDayYoungerResult.success) {
        const dateOfBirthError = oneDayYoungerResult.error.issues.find(
          (issue) => issue.path.includes('dateOfBirth')
        );
        expect(dateOfBirthError?.message).toBe(
          'This pathway is for patients aged 60 and over'
        );
      }
    });
  });

  describe('Form Component', () => {
    it('loads sample patient, submits, and calls save handler with parsed values', async () => {
      const handleSave = vi.fn();

      render(
        <MantineProvider>
          <AssessmentForm onSave={handleSave} />
        </MantineProvider>
      );

      const loadButton = screen.getByRole('button', {
        name: /load sample patient/i,
      });
      fireEvent.click(loadButton);

      const submitButton = screen.getByRole('button', {
        name: /save assessment/i,
      });
      fireEvent.click(submitButton);

      await waitFor(
        () => {
          expect(handleSave).toHaveBeenCalledWith(samplePatient);
        },
        { timeout: 3000 }
      );
    });
  });
});
