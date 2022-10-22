import { OnboardingDesktopTimeline } from "@components/molecules/OnboardingDesktopTimeline";
import { OnboardingMobileTimeline } from "@components/molecules/OnboardingMobileTimeline";
import { ResponsiveAppBar } from "@components/molecules/ResponsiveAppBar";
import { BenefitsPriorities } from "@components/organisms/BenefitsPriorities";
import { EducationCertification } from "@components/organisms/EducationCertification";
import { JobPreferences } from "@components/organisms/JobPreferences";
import { LevelOfComfort } from "@components/organisms/LevelOfComfort";
import { LocationPreferences } from "@components/organisms/LocationPreferences";
import { LoginSetup } from "@components/organisms/LoginSetup";
import { PersonalDetails } from "@components/organisms/PersonalDetails";
import { SetupYourDiscipline } from "@components/organisms/SetupYourDiscipline";
import { Grid, useMediaQuery, Theme } from "@mui/material";
import { useState } from "react";
import { steps } from "src/constants/onboarding";

export const ONBOARDING_VIEW = {
  login_setup: LoginSetup,
  personal_details: PersonalDetails,
  job_preferences: JobPreferences,
  setup_your_discipline: SetupYourDiscipline,
  education_certifications: EducationCertification,
  level_of_comfort: LevelOfComfort,
  location_preferences: LocationPreferences,
  benefits_priorities: BenefitsPriorities,
};

const Onboarding = () => {
  const [activeStep, setActiveStep] =
    useState<keyof typeof ONBOARDING_VIEW>("personal_details");
  const View = ONBOARDING_VIEW[activeStep] ?? null;
  const isSmallDevice = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  return (
    <main>
      <ResponsiveAppBar />
      <Grid container>
        <Grid
          item
          sx={{
            width: "264px",
            p: 2,
            flexDirection: "column",
            display: { xs: "none", md: "flex" },
          }}
        >
          <OnboardingDesktopTimeline
            steps={steps}
            active={activeStep}
            setActive={(value) =>
              setActiveStep(value as keyof typeof ONBOARDING_VIEW)
            }
          />
        </Grid>
        <Grid
          item
          sx={{
            width: "100%",
            flexDirection: "column",
            display: { xs: "flex", md: "none" },
          }}
        >
          <OnboardingMobileTimeline
            steps={steps}
            active={activeStep}
            setActive={(value) =>
              setActiveStep(value as keyof typeof ONBOARDING_VIEW)
            }
          />
        </Grid>

        <Grid
          item
          sx={{
            backgroundColor: "#DAE7E2",
            flexGrow: 1,
            minHeight: "calc(100vh - 68px)",
            maxWidth: `${isSmallDevice ? "auto" : "calc(100vw - 264px"}`,
          }}
        >
          <View />
        </Grid>
      </Grid>
    </main>
  );
};

export default Onboarding;
