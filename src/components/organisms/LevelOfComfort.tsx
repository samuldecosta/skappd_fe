import { Box, Button, Grid, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StepAccordion } from "@components/molecules/StepAccordion";
import { FormCheckboxGrid } from "@components/atoms/FormCheckboxGrid";
import { LevelOfComfortSchema } from "src/schema/onboardingSchema";
import { useState } from "react";

export const LevelOfComfort = () => {
  const [expanded, setExpanded] = useState<string>("");
  const formInstance = useForm({
    resolver: yupResolver(LevelOfComfortSchema)
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues
  } = formInstance;

  const onSubmit = (formData: any) => {
    console.log(formData);
  };

  return (
    <Box>
      <Box sx={{ mx: 3, mt: 3 }}>
        <Typography variant="h6">Level of Comfort</Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <AccessTimeIcon fontSize="small" /> 1-2 mins
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ my: 4 }}>
          <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
            <StepAccordion
              title="Highest Education"
              value={getValues('hightestEducation')}
              name="hightestEducation"
              expanded={expanded}
              handleChange={setExpanded}
            >
              <FormCheckboxGrid
                field={{
                  name: "hightestEducation",
                  label: "Highest Education",
                  control: control,
                  options: {
                    options: [
                      {
                        value: "Bachelors in OT",
                        label: "Bachelors in OT",
                      },
                      {
                        value: "Bachelors in Kinesiology and Exercise Science",
                        label: "Bachelors in Kinesiology and Exercise Science",
                      },
                      {
                        value: "Bachelors in Health Science",
                        label: "Bachelors in Health Science",
                      },
                    ],
                  },
                }}
                formInstance={formInstance}
              />
            </StepAccordion>
          </Grid>
          <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
            <StepAccordion
              title="OT Certifications"
              value={getValues('otherCertificates')}
              name="otherCertificates"
              expanded={expanded}
              handleChange={setExpanded}
            >
              <Typography sx={{ mb: 2 }}></Typography>
              <FormCheckboxGrid
                field={{
                  name: "otherCertificates",
                  label: "OT Certifications",
                  control: control,
                  options: {
                    options: [
                      {
                        value: "Per Diem",
                        label: "Per Diem",
                      },
                      {
                        value: "Part Time",
                        label: "Part Time",
                      },
                      {
                        value: "Contract",
                        label: "Contract",
                      },
                      {
                        value: "Full Time",
                        label: "Full Time",
                      },
                    ],
                  },
                }}
                formInstance={formInstance}
              />
            </StepAccordion>
          </Grid>
          <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
            <StepAccordion
              title="Bonus"
              value={getValues('bonus')}
              name="bonus"
              expanded={expanded}
              handleChange={setExpanded}
            >
              <Typography sx={{ mb: 2 }}></Typography>
              <FormCheckboxGrid
                field={{
                  name: "Bonus",
                  label: "Bonus",
                  control: control,
                  options: {
                    options: [
                      {
                        value: "days",
                        label: "Days",
                      },
                      {
                        value: "4-10s",
                        label: "4-10s",
                      },
                      {
                        value: "Swing",
                        label: "Swing",
                      },
                      {
                        value: "Call",
                        label: "Call",
                      },
                      {
                        value: "Nights",
                        label: "Nights",
                      },
                      {
                        value: "7 On - 7 Off",
                        label: "7 On - 7 Off",
                      },
                      {
                        value: "Weekends",
                        label: "Weekends",
                      },
                      {
                        value: "Variable",
                        label: "Variable",
                      },
                    ],
                  },
                }}
                formInstance={formInstance}
              />
            </StepAccordion>
          </Grid>
        </Grid>
        <Button
          type="submit"
          sx={{
            backgroundColor: "#1EC271",
            color: "#fff",
            position: "absolute",
            right: "32px",
            bottom: "32px",
          }}
        >
          Let&apos;s go
        </Button>
      </form>
    </Box>
  );
};