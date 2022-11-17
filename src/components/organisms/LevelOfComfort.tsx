import { Box, Grid, Typography, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StepAccordion } from "@components/molecules/StepAccordion";
import { FormCheckboxGrid } from "@components/atoms/FormCheckboxGrid";
import { LevelOfComfortSchema } from "src/schema/onboardingSchema";
import { useEffect, useState } from "react";
import { FormFooter } from "@components/atoms/FormFooter";
import { set_step_completed } from "@state/onboarding";
import { useAtom } from "jotai";
import { useLevelOfComfort } from "services/levelOfComfort";
import { Loader } from "@components/atoms/Loader";

export const LevelOfComfort = ({
  showFooter = true,
}: {
  showFooter?: Boolean;
}) => {
  const [expanded, setExpanded] = useState<string>("");
  const formInstance = useForm({
    resolver: yupResolver(LevelOfComfortSchema),
  });

  const {
    getComfortSettingOptions,
    getPatientPopulationOptions,
    patientPopulationOptions = [],
    comfortSettingOptions = [],
    isLoading,
  } = useLevelOfComfort();

  useEffect(() => {
    getComfortSettingOptions();
    getPatientPopulationOptions();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = formInstance;

  const [activeStep, setStepComplete] = useAtom(set_step_completed);
  const onSubmit = (formData: any) => {
    console.log("Form Data ===> ", formData);
    setStepComplete(activeStep?.id);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          <Box sx={{ mx: 3, mt: 3 }}>
            <Typography variant="h6">Level of Comfort</Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* <AccessTimeIcon fontSize="small" /> 1-2 mins */}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container sx={{ mt: 4, mb: 8 }}>
              <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
                <StepAccordion
                  title="Comfort Setting"
                  value={getValues("comfortSetting")}
                  name="comfortSetting"
                  expanded={expanded}
                  handleChange={setExpanded}
                  isError={errors["comfortSetting"]}
                >
                  <FormCheckboxGrid
                    field={{
                      name: "comfortSetting",
                      label: "Comfort Setting",
                      control: control,
                      options: {
                        options: comfortSettingOptions,
                      },
                    }}
                    formInstance={formInstance}
                  />
                </StepAccordion>
              </Grid>
              <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
                <StepAccordion
                  title="Patient Population"
                  value={getValues("patientPopulation")}
                  name="patientPopulation"
                  expanded={expanded}
                  handleChange={setExpanded}
                  isError={errors["patientPopulation"]}
                >
                  <Typography sx={{ mb: 2 }}></Typography>
                  <FormCheckboxGrid
                    field={{
                      name: "patientPopulation",
                      label: "Patient Population",
                      control: control,
                      options: {
                        options: patientPopulationOptions,
                      },
                    }}
                    formInstance={formInstance}
                  />
                </StepAccordion>
              </Grid>
              {/* User this button when save the record from Diolo */}
              {!showFooter && (
                <Grid item xs={12} sx={{ mt: 2, ml: 2 }}>
                  <Button variant="outlined">Save</Button>
                </Grid>
              )}
            </Grid>

            {showFooter ? <FormFooter /> : ""}
          </form>
        </Box>
      )}
    </>
  );
};
