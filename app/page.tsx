"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { saveAs } from "file-saver";
import AddData from "@/actions/AddData";
import GetData from "@/actions/GetData";
import { writeToExcel } from "@/actions/WriteToExcel";

interface Person {
  id: string;
  numberOfPeople: number;
  hasUdyogYojanaCard: string;
  numberOfWomen: number;
  numberOfVoterID: number;
  contactNumber: string;
  numberOfGirlChild: number;
  governmentAssistance: string;
  doorNumber: string;
  womenDetails: {
    name: string;
    dropout: string;
    voterID: string;
    continueEducation?: string;
    educationQualification?: string;
    voterIDReason?: string;
    dropoutReason?: string;
  }[];
  rationCardType: string;
}

export default function SurveyForm() {
  const validationSchema = Yup.object({
    doorNumber: Yup.string().required("Door number is required"),
    numberOfPeople: Yup.number()
      .required("Number of people is required")
      .positive("Must be a positive number")
      .integer("Must be a whole number"),
    numberOfVoterID: Yup.number()
      .notRequired()
      .integer("Must be a whole number")
      .min(0, "Number of Voter IDs cannot be negative"),
    numberOfGirlChild: Yup.number()
      .required("Number of girl child in the house is required")
      .positive("Must be a positive number")
      .min(0, "Number of women cannot be negative"),
    numberOfWomen: Yup.number()
      .required("Number of women in the house is required")
      .positive("Must be a positive number")
      .min(0, "Number of women cannot be negative"),
    womenDetails: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Name is required"),
        educationQualification: Yup.string().required(
          "Education qualification is required"
        ),
        dropout: Yup.boolean().required("Dropout status is required"),
        dropoutReason: Yup.string().when("dropout", {
          is: true,
          then: () => Yup.string().required("Please provide dropout reason"),
          otherwise: () => Yup.string().notRequired(),
        }),
        continueEducation: Yup.boolean().notRequired(),
        voterID: Yup.boolean().required("Voter ID status is required"),
        voterIDReason: Yup.string().when("voterID", {
          is: false,
          then: () =>
            Yup.string().required(
              "Please provide reason for not having a Voter ID"
            ),
          otherwise: () => Yup.string().notRequired(),
        }),
      })
    ),
    rationCardType: Yup.string().required("Ration Card Type is required"),
    governmentAssistance: Yup.string().notRequired(),
    contactNumber: Yup.string().notRequired(),
    hasUdyogYojanaCard: Yup.boolean().required("Udyog Yojana Card is required"),
  });

  const onSubmit = (values: any) => {
    toast.promise(AddData(values), {
      loading: "Adding Data to Database...",
      success: (data) => {
        return `Data saved Successfully`;
      },
      error: "Error",
    });
  };
  interface WomanDetails {
    name: string;
    educationQualification: string;
    dropout: boolean;
    dropoutReason?: string;
    continueEducation?: boolean;
    voterID: boolean;
    voterIDReason?: string;
  }
  const initialValues: {
    doorNumber: string;
    numberOfPeople: string;
    numberOfVoterID: number;
    numberOfWomen: number;
    numberOfGirlChild: number;
    womenDetails: WomanDetails[];
    rationCardType: string;
    governmentAssistance: string;
    contactNumber: string;
    hasUdyogYojanaCard: boolean;
  } = {
    doorNumber: "",
    numberOfPeople: "",
    numberOfVoterID: 0,
    numberOfWomen: 0,
    numberOfGirlChild: 0,
    womenDetails: [],
    rationCardType: "",
    governmentAssistance: "",
    contactNumber: "",
    hasUdyogYojanaCard: false,
  };

  function generateExcel() {
    toast.promise(GetData, {
      loading: "Fetching Data...",
      success: (data) => {
        toast.promise(writeToExcel(data as Person[]), {
          loading: "Converting to Excel...",
          success: (data) => {
            const blob = new Blob([data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const url = window.URL.createObjectURL(blob);

            saveAs(blob, "RuralData.xlsx");

            window.URL.revokeObjectURL(url);

            return "Excel created Successfully";
          },
          error: "Could not convert to Excel.",
        });
        return "Excel created Successfully";
      },
      error: "Could not fetch data.",
    });
  }
  return (
    <div className="flex justify-center items-start h-screen my-4">
      <Toaster position="top-center" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form className="bg-[#fefefe] shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
            <p
              className="text-gray-900 text-right text-sm underline underline-offset-4 "
              onClick={generateExcel}
            >
              View Data
            </p>
            <h1 className="text-2xl text-gray-900 font-semibold pb-6">
              Rural Data Collection
            </h1>
            <div className="mb-4">
              <label
                htmlFor="doorNumber"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Door Number
              </label>
              <Field
                type="text"
                id="doorNumber"
                name="doorNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <ErrorMessage
                name="doorNumber"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="numberOfPeople"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Number of People in the House
              </label>
              <Field
                type="number"
                id="numberOfPeople"
                name="numberOfPeople"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <ErrorMessage
                name="numberOfPeople"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="numberOfPeople"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Number of People with Voter ID
              </label>
              <Field
                type="number"
                id="numberOfVoterID"
                name="numberOfVoterID"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <ErrorMessage
                name="numberOfVoterID"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="numberOfGirlChild"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Number of Girl Child in the house
              </label>
              <Field
                type="number"
                id="numberOfGirlChild"
                name="numberOfGirlChild"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <ErrorMessage
                name="numberOfGirlChild"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="numberOfWomen"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Number of Women in the House
              </label>
              <Field
                type="number"
                id="numberOfWomen"
                name="numberOfWomen"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <ErrorMessage
                name="numberOfWomen"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <FieldArray name="womenDetails">
              {({ push, remove }) => (
                <div>
                  {Array.from({
                    length: parseInt(values.numberOfWomen.toString()) || 0,
                  }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-300 rounded-lg p-4 mb-4"
                    >
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">
                        Woman {index + 1} Details
                      </h3>
                      <div className="mb-4">
                        <label
                          htmlFor={`womenDetails.${index}.name`}
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Name
                        </label>
                        <Field
                          type="text"
                          id={`womenDetails.${index}.name`}
                          name={`womenDetails.${index}.name`}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        <ErrorMessage
                          name={`womenDetails.${index}.name`}
                          component="div"
                          className="text-red-500 text-xs italic"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor={`womenDetails.${index}.educationQualification`}
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Highest Education Qualification
                        </label>
                        <Field
                          as="select"
                          id={`womenDetails.${index}.educationQualification`}
                          name={`womenDetails.${index}.educationQualification`}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                          <option value="">Select</option>
                          <option value="None">None</option>

                          <option value="Primary School">Primary School</option>
                          <option value="Secondary School">
                            Secondary School
                          </option>
                          <option value="High School">High School</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Undergraduate">Undergraduate</option>
                          <option value="Postgraduate">Postgraduate</option>
                        </Field>
                        <ErrorMessage
                          name={`womenDetails.${index}.educationQualification`}
                          component="div"
                          className="text-red-500 text-xs italic"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Did they drop out of college?
                        </label>
                        <div className="flex items-center">
                          <Field
                            type="radio"
                            id={`womenDetails.${index}.dropout`}
                            name={`womenDetails.${index}.dropout`}
                            value="true"
                            className="mr-2"
                          />
                          <label
                            htmlFor={`womenDetails.${index}.dropout`}
                            className="text-sm text-gray-900"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Field
                            type="radio"
                            id={`womenDetails.${index}.dropout`}
                            name={`womenDetails.${index}.dropout`}
                            value="false"
                            className="mr-2"
                          />
                          <label
                            htmlFor={`womenDetails.${index}.dropout`}
                            className="text-sm text-gray-900"
                          >
                            No
                          </label>
                        </div>
                        <ErrorMessage
                          name={`womenDetails.${index}.dropout`}
                          component="div"
                          className="text-red-500 text-xs italic"
                        />
                      </div>

                      {values.womenDetails[index]?.dropout &&
                        values.womenDetails[index]?.dropout.toString() ===
                          "true" && (
                          <div className="mb-4">
                            <label
                              htmlFor={`womenDetails.${index}.dropoutReason`}
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Reason for Dropout
                            </label>
                            <Field
                              type="text"
                              id={`womenDetails.${index}.dropoutReason`}
                              name={`womenDetails.${index}.dropoutReason`}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            <ErrorMessage
                              name={`womenDetails.${index}.dropoutReason`}
                              component="div"
                              className="text-red-500 text-xs italic"
                            />
                          </div>
                        )}
                      {values.womenDetails[index]?.dropout &&
                        values.womenDetails[index]?.dropout.toString() ===
                          "true" && (
                          <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                              Do they plan to continue their education?
                            </label>
                            <div className="flex items-center">
                              <Field
                                type="radio"
                                id={`womenDetails.${index}.continueEducation`}
                                name={`womenDetails.${index}.continueEducation`}
                                value="true"
                                className="mr-2"
                              />
                              <label
                                htmlFor={`womenDetails.${index}.continueEducation`}
                                className="text-sm text-gray-900"
                              >
                                Yes
                              </label>
                            </div>
                            <div className="flex items-center">
                              <Field
                                type="radio"
                                id={`womenDetails.${index}.continueEducation`}
                                name={`womenDetails.${index}.continueEducation`}
                                value="false"
                                className="mr-2"
                              />
                              <label
                                htmlFor={`womenDetails.${index}.continueEducation`}
                                className="text-sm text-gray-900"
                              >
                                No
                              </label>
                            </div>
                            <ErrorMessage
                              name={`womenDetails.${index}.continueEducation`}
                              component="div"
                              className="text-red-500 text-xs italic"
                            />
                          </div>
                        )}

                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Do they have a Voter ID?
                        </label>
                        <div className="flex items-center">
                          <Field
                            type="radio"
                            id={`womenDetails.${index}.voterID`}
                            name={`womenDetails.${index}.voterID`}
                            value="true"
                            className="mr-2"
                          />
                          <label
                            htmlFor={`womenDetails.${index}.voterID`}
                            className="text-sm text-gray-900"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Field
                            type="radio"
                            id={`womenDetails.${index}.voterID`}
                            name={`womenDetails.${index}.voterID`}
                            value="false"
                            className="mr-2"
                          />
                          <label
                            htmlFor={`womenDetails.${index}.voterID`}
                            className="text-sm text-gray-900"
                          >
                            No
                          </label>
                        </div>
                        <ErrorMessage
                          name={`womenDetails.${index}.voterID`}
                          component="div"
                          className="text-red-500 text-xs italic"
                        />
                      </div>
                      {values.womenDetails[index]?.voterID &&
                        values.womenDetails[index]?.voterID.toString() ===
                          "false" && (
                          <div className="mb-4">
                            <label
                              htmlFor={`womenDetails.${index}.voterIDReason`}
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Reason for not having a Voter ID
                            </label>
                            <Field
                              type="text"
                              id={`womenDetails.${index}.voterIDReason`}
                              name={`womenDetails.${index}.voterIDReason`}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            <ErrorMessage
                              name={`womenDetails.${index}.voterIDReason`}
                              component="div"
                              className="text-red-500 text-xs italic"
                            />
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
            <div className="mb-4">
              <label
                htmlFor="rationCardType"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Ration Card Type
              </label>
              <Field
                as="select"
                id="rationCardType"
                name="rationCardType"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Select</option>
                <option value="APL">APL</option>
                <option value="BPL">BPL</option>
              </Field>
              <ErrorMessage
                name="rationCardType"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="governmentAssistance"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Government Financial Assistance
              </label>
              <Field
                type="text"
                id="governmentAssistance"
                name="governmentAssistance"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <ErrorMessage
                name="governmentAssistance"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="contactNumber"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Contact Number ( having Digital facility like GPay )
              </label>
              <Field
                type="text"
                id="contactNumber"
                name="contactNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <ErrorMessage
                name="contactNumber"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Do they have Udyog Yojana Card?
              </label>
              <div className="flex items-center">
                <Field
                  type="radio"
                  id="hasUdyogYojanaCard"
                  name="hasUdyogYojanaCard"
                  value="true"
                  className="mr-2"
                />
                <label
                  htmlFor="hasUdyogYojanaCard"
                  className="text-sm text-gray-900"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <Field
                  type="radio"
                  id="hasUdyogYojanaCard"
                  name="hasUdyogYojanaCard"
                  value="false"
                  className="mr-2"
                />
                <label
                  htmlFor="hasUdyogYojanaCard"
                  className="text-sm text-gray-900"
                >
                  No
                </label>
              </div>
              <ErrorMessage
                name="hasUdyogYojanaCard"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
