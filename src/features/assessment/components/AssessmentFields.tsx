import { Checkbox, NumberInput, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import type { UseFormReturnType } from '@mantine/form';
import dayjs from 'dayjs';
import { MOBILITY, type Assessment } from '../schema';

export type FormValues = {
  [K in keyof Assessment]: K extends 'consentObtained'
    ? boolean
    : Assessment[K] | '';
};

export interface AssessmentFieldsProps {
  form: UseFormReturnType<FormValues>;
}

const formatMobilityLabel = (value: string) =>
  value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

const mobilityOptions = MOBILITY.map((value) => ({
  value,
  label: formatMobilityLabel(value),
}));

export function AssessmentFields({ form }: AssessmentFieldsProps) {
  return (
    <>
      <TextInput
        label="Medical record number"
        placeholder="MRN-004821"
        key={form.key('mrn')}
        {...form.getInputProps('mrn')}
      />

      <TextInput
        label="Patient name"
        key={form.key('patientName')}
        {...form.getInputProps('patientName')}
      />

      <DateInput
        label="Date of birth"
        valueFormat="YYYY-MM-DD"
        key={form.key('dateOfBirth')}
        {...form.getInputProps('dateOfBirth')}
      />

      <DateInput
        label="Assessment date"
        valueFormat="YYYY-MM-DD"
        maxDate={dayjs().format('YYYY-MM-DD')}
        key={form.key('assessmentDate')}
        {...form.getInputProps('assessmentDate')}
      />

      <Select
        label="Mobility"
        placeholder="Select a mobility status"
        data={mobilityOptions}
        key={form.key('mobility')}
        {...form.getInputProps('mobility')}
      />

      <NumberInput
        label="Barthel Index"
        step={5}
        min={0}
        max={100}
        clampBehavior="none"
        key={form.key('barthelIndex')}
        {...form.getInputProps('barthelIndex')}
      />

      <NumberInput
        label="Regular medications"
        min={0}
        max={30}
        clampBehavior="none"
        key={form.key('medicationCount')}
        {...form.getInputProps('medicationCount')}
      />

      <Checkbox
        label="Pharmacist review requested"
        key={form.key('pharmacistReviewRequested')}
        {...form.getInputProps('pharmacistReviewRequested', { type: 'checkbox' })}
      />

      <DateInput
        label="Next review date"
        valueFormat="YYYY-MM-DD"
        key={form.key('followUpDate')}
        {...form.getInputProps('followUpDate')}
      />

      <Checkbox
        label="Patient or representative has given consent"
        key={form.key('consentObtained')}
        {...form.getInputProps('consentObtained', { type: 'checkbox' })}
      />
    </>
  );
}
