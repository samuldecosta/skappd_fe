import styled from "@emotion/styled";
import { Theme, useMediaQuery } from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import React, { ReactNode } from "react";

const StyledAccordion = styled(Accordion)`
  min-height: 74px;
  width: 100%;
  border: none;
  box-shadow: none;
  display: flex;
  padding: 0 8px;
  background: ${({
    expanded,
    bgColor,
  }: {
    expanded: boolean;
    bgColor: string;
  }) => `${expanded ? bgColor : "transparent"}`};
`;

const StyledTitle = styled(Typography)`
  color: #065740;
  font-size: 16px;
  line-height: 15px;
  font-weight: 500;
  min-width: 160px;
`;

const StyledValue = styled(Typography)`
  color: #000;
  font-size: 16px;
  line-height: 15px;
  font-weight: 500;
`;

const EmptyValue = styled(Typography)`
  font-size: 16px;
  line-height: 15px;
  color: rgba(6, 87, 64, 0.4);
`;

const Edit = styled(Typography)`
  font-size: 16px;
  line-height: 15px;
  color: #1ec271;
`;

const StyledAccordionSummary = styled(AccordionSummary)(
  ({ isDesktop }: { isDesktop: boolean }) => ({
    "& .MuiAccordionSummary-content": {
      flexDirection: isDesktop ? "row" : "column",
      gap: "10px",
      "& p": {
        marginLeft: "0",
      },
      "& p:nth-last-child(1)": {
        color: "#1EC271",
        lineHeight: "1.2rem",
        paddingRight: "10px",
      },
    },
  })
);

type TProps = {
  name: string;
  title: ReactNode;
  value?: string;
  expanded: string;
  handleChange: (accordionName: string) => void;
  children: ReactNode;
  fieldsType: string;
};

export const StepAccordion = ({
  name,
  title,
  value,
  expanded,
  handleChange,
  children,
  fieldsType,
}: TProps) => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const selectedValues =
    fieldsType === "comboButtonWithInput"
      ? Array.isArray(value) &&
        value.map(({ key, value }) => `${key} ${value}yrs`)
      : value;
  return (
    <StyledAccordion
      square
      expanded={expanded === name}
      bgColor={fieldsType === "comboButtonWithInput" ? "#DAE7E2" : "#fff"}
    >
      {expanded !== name && (
        <StyledAccordionSummary
          aria-controls={`${name}-content`}
          id={`${name}-header`}
          sx={{
            minWidth: "100%",
          }}
          isDesktop={isDesktop}
          expandIcon={
            value && (
              <Edit
                onClick={() => {
                  handleChange(name);
                }}
              >
                Edit
              </Edit>
            )
          }
        >
          <StyledTitle
            onClick={() => {
              handleChange(name);
            }}
          >
            {title}
          </StyledTitle>
          {selectedValues ? (
            <StyledValue sx={{ ml: 2 }}>
              {Array.isArray(selectedValues)
                ? selectedValues.join(", ")
                : selectedValues}
            </StyledValue>
          ) : (
            <EmptyValue
              onClick={() => {
                handleChange(name);
              }}
            >
              Select
            </EmptyValue>
          )}
        </StyledAccordionSummary>
      )}
      <AccordionDetails>{children}</AccordionDetails>
    </StyledAccordion>
  );
};

StepAccordion.defaultProps = {
  fieldsType: "checkbox",
  value: [],
};
