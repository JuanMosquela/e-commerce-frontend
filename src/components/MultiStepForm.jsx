import { Stepper, Step, StepLabel } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useCreatePaymentMutation,
  useGetCartQuery,
} from "../redux/api/productsApi";
import FormControllers from "./FormControllers";

const MultiStepForm = ({ children, initialValues }) => {
  const { data: cartData } = useGetCartQuery();

  const [createPayment, { data, error }] = useCreatePaymentMutation();

  console.log(data);

  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    console.log(values);
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      const body = {
        name: values.firstName,
        lastName: values.lastName,
        email: values.email,
        streetName: values.streetName,
        streetNumber: values.streetNumber,
        zipCode: values.zipCode,
        areaCode: values.phone,
        phone: values.phone,
        identification: values.identification,
        identificationNumber: values.identificationNumber,
      };

      return createPayment({
        id: cartData?.result._id,
        body,
      });
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  console.log(data);

  useEffect(() => {
    if (data) {
      console.log(data?.body.init_point);
      window.location.href = data?.body.init_point;
    }
  }, [data]);

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {(formik) => (
        <Form>
          <Stepper sx={{ mb: "2rem" }} activeStep={stepNumber}>
            {steps.map((currentStep) => {
              const label = currentStep.props.stepName;

              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {step}
          <FormControllers
            isLastStep={isLastStep}
            hasPrevious={stepNumber > 0}
            onBackClick={() => previous(formik.values)}
          />
        </Form>
      )}
    </Formik>
  );
};

export const FormStep = ({ children }) => children;

export default MultiStepForm;
