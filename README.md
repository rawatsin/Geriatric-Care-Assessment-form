# Geriatric Care Assessment Form

A single-page in-home Geriatric Care Assessment form application designed for visiting nurses checking on elderly patients at home. Built with React 19, Mantine, and Zod 4 for Manufac Analytics.

## Deployment

- **Live Application URL**: [Geriatric Care Assessment Form](https://geriatric-care-assessment-form-orpin.vercel.app/)

---

## Tech Stack

- **Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 8
- **Language**: TypeScript
- **UI Components**: Mantine 9 (`@mantine/core`, `@mantine/dates`, `@mantine/hooks`)
- **Form State & Resolution**: `@mantine/form`
- **Schema & Validation**: Zod 4 (`zod`)
- **Date Handling**: Day.js
- **Testing**: Vitest, React Testing Library (`@testing-library/react`, `@testing-library/jest-dom`), and JSDOM
- **Linting**: ESLint

---

## Key Features

1. **10 Clinical Assessment Fields**:
   - `mrn`: Medical record number (`TextInput`, validated against regex `/^MRN-\d{6}$/`).
   - `patientName`: Patient name (`TextInput`, 2–60 characters).
   - `dateOfBirth`: Date of birth (`DateInput`, ISO `YYYY-MM-DD`).
   - `assessmentDate`: Assessment visit date (`DateInput`, capped at today).
   - `mobility`: Functional mobility status (`Select`, dynamically generated from `MOBILITY` array with Title Case labels).
   - `barthelIndex`: Barthel Index score (`NumberInput`, 0–100 in steps of 5). Configured with `clampBehavior="none"` so out-of-range numbers are rejected by validation rather than silently altered.
   - `medicationCount`: Regular medications count (`NumberInput`, 0–30, with `clampBehavior="none"`).
   - `pharmacistReviewRequested`: Pharmacist review indicator (`Checkbox`).
   - `followUpDate`: Next review date (`DateInput`, ISO `YYYY-MM-DD`).
   - `consentObtained`: Informed consent verification (`Checkbox`, mandatory).

2. **Schema-Driven Validation (`schemaResolver`)**:
   - Validation is driven strictly by `assessmentSchema` via Mantine's `schemaResolver`. No validation rules or regexes are duplicated in the UI layer.
   - Guarded cross-field validation rules:
     - **Age cutoff**: Patient must be aged 60 or older on the assessment date.
     - **Timeline check**: Follow-up review date must be strictly after the assessment date.
     - **Polypharmacy guard**: Five or more medications automatically requires a pharmacist review.
     - **Mandatory consent**: Assessment cannot be saved without consent.

3. **User Experience & Feedback**:
   - **Silent until blur**: Validation only executes on blur and on submit, keeping untouched fields quiet.
   - **Load sample patient**: One-click action fills the form with the pre-configured valid clinical fixture.
   - **Save simulation**: Form submission simulates saving for ~800 ms with button loading states, immediately dismisses stale alerts on re-submission, and displays the parsed Zod output in a high-contrast code viewer upon completion.

---

## Validation & Submission Flow

```
[ Form Input ] 
       │
       ▼ (on blur or submit)
[ @mantine/form: schemaResolver(assessmentSchema) ]
       │
       ├── Invalid ──► Render field-level errors under respective inputs
       │
       └── Valid (on submit)
             │
             ▼
     Clear previous alert
             │
             ▼
     Parse via assessmentSchema.parse()
             │
             ▼
     Simulate ~800ms save delay (button loading)
             │
             ▼
     Invoke onSave callback & display parsed JSON in Code alert
```

1. **Type Synchronization**: Form values are mapped from `Assessment` without manually handwriting redundant interfaces.
2. **Standard Schema Execution**: Zod 4's native `~standard` implementation provides direct error mapping to Mantine fields.
3. **No Silent Clamping**: Clinical values are never quietly clamped or modified by UI components before validation.

---

## Installation & Setup

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone <repository-url>
cd geriatric-assessment-form
npm install
```

### Development Server

Start the local Vite development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Testing, Linting & Build

### Running Tests

Run the Vitest test suite:

```bash
npm test
```

Tests include:
- **Schema Boundary Test**: Uses `safeParse` to verify patients exactly 60 years old on assessment date are accepted while patients one day younger are rejected.
- **Form Submission Test**: Renders `AssessmentForm`, populates sample patient data, submits, and verifies the save handler receives parsed values.
- **Resubmission UI Test**: Asserts success feedback immediately hides upon clicking save and reappears on completion.

### Linting

Run ESLint:

```bash
npm run lint
```

### Type Checking

Run TypeScript check:

```bash
npx tsc --noEmit
```

### Production Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Project Structure

```
geriatric-assessment-form/
├── src/
│   ├── features/
│   │   └── assessment/
│   │       ├── components/
│   │       │   ├── AssessmentActions.tsx   # Action buttons (Load sample, Save)
│   │       │   ├── AssessmentFields.tsx    # 10 clinical form inputs
│   │       │   └── AssessmentResult.tsx     # Parsed JSON output alert
│   │       ├── AssessmentForm.tsx          # State, validation & orchestration
│   │       ├── AssessmentForm.test.tsx     # Vitest suite
│   │       ├── samplePatient.ts            # Valid patient fixture
│   │       └── schema.ts                   # Zod 4 clinical schema & types
│   ├── test/
│   │   └── setup.ts                        # Vitest & JSDOM environment mocks
│   ├── App.tsx                             # MantineProvider & layout wrapper
│   ├── main.tsx                            # React root entry point
│   └── index.css                           # Global typography & layout reset
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## Unfinished Work / Next Steps

All requirements from the assignment specification are fully implemented and passing:
- All 10 fields render and validate accurately.
- `schemaResolver` is correctly wired without duplicated validation logic.
- Tests, lint checks, type checks, and production builds pass without errors or warnings.

If extending this application further in a production setting, prospective next steps would include:
1. Integration with a live backend FHIR / EHR patient management API.
2. Offline data persistence using IndexedDB or local cache for home visits without stable network connectivity.
3. Accessible keyboard shortcuts for high-speed clinical data entry.
