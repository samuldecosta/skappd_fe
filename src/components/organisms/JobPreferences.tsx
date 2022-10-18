import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useForm } from 'react-hook-form';
import { FormTextField } from '@components/atoms/FormTextField';
import { PersonalDetailsSchema } from 'src/schema/personalDetailsSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormCustomRadioField } from '@components/atoms/FormCustomRadioField';

const jobStatus = [
  {
    value: "1",
    title: 'Ready to Mingle'
  },
  {
    value: "2",
    title: 'Looking Around'
  },
  {
    value: "3",
    title: 'Currently off the Market'
  }
];

export const JobPreferences = () => {
  const [selectedJobStatus, setSelectedJobStatus] = useState('')
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    fullName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  }>({
    resolver: yupResolver(PersonalDetailsSchema),
  });

  const onSubmit = (formData: any) => {
    console.log(formData)
  }
  return (
    <Box sx={{ p: [2, 4] }}>
      <Typography variant="h6">Job Preferences</Typography>
      <Typography sx={{
        display: 'flex',
        alignItems: "center"
      }}><AccessTimeIcon fontSize="small" /> 1-2 mins</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4} sx={{ my: 4 }}>
          <Grid item>
            <Typography sx={{ mb: 2 }}>What is your current job status?</Typography>
              {jobStatus.map((status) => 
                <FormCustomRadioField
                  key={status.value} 
                  value={status.value}
                  isSelected={selectedJobStatus === status.value}
                  onSelect={(value) => {
                    setSelectedJobStatus(value);
                  }}
                  title={status.title}
                />)}
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ mb: 2 }}>Address</Typography>
            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid item xs={6}>
                <FormTextField
                  field={{
                    label: 'Street Address',
                    name: `address`,
                    control: control,
                    error: errors?.address,
                    options: { autoCapitalize: true },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  field={{
                    label: 'State/Province',
                    name: `state`,
                    control: control,
                    error: errors?.state,
                    options: { autoCapitalize: true },
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid item xs={6}>
                <FormTextField
                  field={{
                    label: 'City',
                    name: `city`,
                    control: control,
                    error: errors?.city,
                    options: { autoCapitalize: true },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  field={{
                    label: 'Zip Code',
                    name: `zip`,
                    control: control,
                    error: errors?.zip,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button sx={{ backgroundColor: '#1EC271', color: "#fff", position: 'absolute', right: '32px', bottom: '32px' }}>Let's go</Button>
      </form>
    </Box>
  )
}
