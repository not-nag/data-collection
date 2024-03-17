"use client";
import AddData from "@/actions/AddData";
import GetData from "@/actions/GetData";
import { saveAs } from "file-saver";
import { WriteToExcel } from "@/actions/WriteToExcel";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";

export default function Form() {
  const [key, setKey] = useState(1);

  async function submitForm(formData: FormData) {
    const doorNumber = formData.get("doorNumber");
    const countOf18Above = formData.get("countOf18Above");
    const numberOfWomen = formData.get("numberOfWomen");
    const numberOfDroppedWomen = formData.get("numberOfDroppedWomen");
    const unemployedWomen = formData.get("unemployedWomen");
    const reason = formData.get("reason");
    const intentionToContinue = formData.get("intentionToContinue");
    const countOfVoterID = formData.get("countOfVoterID");
    const countOfHigherStudies = formData.get("countOfHigherStudies");
    const countOfSSLCStudents = formData.get("countOfSSLCStudents");
    const nameOfSSLCInstitution = formData.get("nameOfSSLCInstitution");
    const countOfChildren = formData.get("countOfChildren");
    const nameOfInstitutions = formData.get("nameOfInstitutions");
    const classOfStudents = formData.get("classOfStudents");
    const libraryCardCount = formData.get("libraryCardCount");
    const contactNumber = formData.get("contactNumber");
    const MGNREG = formData.get("MGNREG");
    const housingScheme = formData.get("housingScheme");
    const gruhaLakshmi = formData.get("gruhaLakshmi");
    const gruhaJyothi = formData.get("gruhaJyothi");
    const yuvaNidhi = formData.get("yuvaNidhi");

    toast.promise(
      AddData({
        doorNumber,
        countOf18Above,
        numberOfWomen,
        numberOfDroppedWomen,
        unemployedWomen,
        reason,
        intentionToContinue,
        countOfVoterID,
        countOfHigherStudies,
        countOfSSLCStudents,
        nameOfSSLCInstitution,
        countOfChildren,
        nameOfInstitutions,
        classOfStudents,
        libraryCardCount,
        contactNumber,
        MGNREG,
        housingScheme,
        gruhaJyothi,
        gruhaLakshmi,
        yuvaNidhi,
      }),
      {
        loading: "Adding Data..",
        success: (data) => {
          setKey(key + 1);
          return "Added successfully.";
        },
        error: "Could not save the data",
      }
    );
  }

  async function convertToExcel() {
    toast.promise(GetData, {
      loading: "Fetching Data...",
      success: (data) => {
        toast.promise(WriteToExcel(data), {
          loading: "Converting to Excel...",
          success: (data) => {
            const blob = new Blob([data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const url = window.URL.createObjectURL(blob);

            saveAs(blob, "CollectedData.xlsx");

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
    <div className="w-full bg-[#000101]">
      <Toaster position="top-center" />
      <div className="bg-[#fefefe] max-w-xl text-[#000101] mx-auto p-10">
        <p
          className="font-medium underline underline-offset-4 mb-2 cursor-pointer"
          onClick={convertToExcel}
        >
          View data
        </p>
        <h1 className="text-2xl font-semibold mb-6">Data Collection</h1>
        <form className="text-lg" action={submitForm} key={key}>
          <div className="mb-5 ">
            <label
              htmlFor="doorNumber"
              className="block mb-2  font-medium text-gray-900"
            >
              Door Number
            </label>
            <input
              type="text"
              id="doorNumber"
              name="doorNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="countOf18Above"
              className="block mb-2  font-medium text-gray-900"
            >
              Count of people aged 18 and above.
            </label>
            <input
              type="number"
              id="countOf18Above"
              name="countOf18Above"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="numberOfWomen"
              className="block mb-2  font-medium text-gray-900"
            >
              Count of women in the house.
            </label>
            <input
              type="number"
              id="numberOfWomen"
              name="numberOfWomen"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="numberOfDroppedWomen"
              className="block mb-2  font-medium text-gray-900"
            >
              Count of women who dropped out of education.
            </label>
            <input
              type="number"
              id="numberOfDroppedWomen"
              name="numberOfDroppedWomen"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="unemployedWomen"
              className="block mb-2  font-medium text-gray-900"
            >
              Count of unemployed women even after graduation.
            </label>
            <input
              type="number"
              id="unemployedWomen"
              name="unemployedWomen"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="reason"
              className="block mb-2  font-medium text-gray-900"
            >
              Reasons for droppping out. (Comma separated values)
            </label>
            <input
              type="text"
              id="reason"
              name="reason"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="ReasonA, ReasonB..."
              required
            />
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="intentionToContinue"
              className="block mb-2  font-medium text-gray-900"
            >
              If dropped out, Any intention to continue education ?
            </label>
            <input
              type="text"
              id="intentionToContinue"
              name="intentionToContinue"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="ReasonA, ReasonB..."
              required
            />
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="countOfVoterID"
              className="block mb-2  font-medium text-gray-900"
            >
              Count of people having Voter ID.
            </label>
            <input
              type="number"
              id="countOfVoterID"
              name="countOfVoterID"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="countOfHigherStudies"
              className="block mb-2  font-medium text-gray-900"
            >
              Count of people pursuing Higher studies.
            </label>
            <input
              type="number"
              id="countOfHigherStudies"
              name="countOfHigherStudies"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="countOfSSLCStudents"
              className="block mb-2  font-medium text-gray-900"
            >
              Count of students appearing for SSLC Board exam in 2024
            </label>
            <input
              type="number"
              id="countOfSSLCStudents"
              name="countOfSSLCStudents"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="nameOfSSLCInstitution"
              className="block mb-2  font-medium text-gray-900"
            >
              If appearing for Board Exams, enter the name of the institutions.
              (Comma separated values)
            </label>
            <input
              type="text"
              id="nameOfSSLCInstitution"
              name="nameOfSSLCInstitution"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              placeholder=" SchoolName1, SchoolName2..."
            />
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="countOfChildren"
              className="block mb-2  font-medium text-gray-900"
            >
              Count of children in the house.
            </label>
            <input
              type="number"
              id="countOfChildren"
              name="countOfChildren"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="nameOfInstitutions"
              className="block mb-2  font-medium text-gray-900"
            >
              Name of institutions of each student. (Comma separated values)
            </label>
            <input
              type="text"
              id="nameOfInstitutions"
              name="nameOfInstitutions"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              placeholder="School1, School2..."
            />
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="classOfStudents"
              className="block mb-2  font-medium text-gray-900"
            >
              Class of each student,(Comma separated values)
            </label>
            <input
              type="text"
              id="classOfStudents"
              name="classOfStudents"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              placeholder="7, 8, 4"
            />
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="libraryCardCount"
              className="block mb-2  font-medium text-gray-900"
            >
              Count of people having library card.
            </label>
            <input
              type="number"
              id="libraryCardCount"
              name="libraryCardCount"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="contactNumber"
              className="block mb-2  font-medium text-gray-900"
            >
              Contact number of Family head.
            </label>
            <input
              type="number"
              id="contactNumber"
              name="contactNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              placeholder="School1, School2..."
            />
          </div>
          <div>
            <h1 className="font-medium mb-4">
              Family uses which of the following schemes ?
            </h1>
            <div className="flex items-center mb-4">
              <input
                id="MGNREG"
                type="checkbox"
                value="Yes"
                name="MGNREG"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
              />
              <label
                htmlFor="MGNREG"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                MGNREG
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="housingScheme"
                name="housingScheme"
                type="checkbox"
                value="Yes"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
              />
              <label
                htmlFor="housingScheme"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Housing Scheme
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="gruhaLakshmi"
                type="checkbox"
                name="gruhaLakshmi"
                value="Yes"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
              />
              <label
                htmlFor="gruhaLakshmi"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Gruha Lakshmi
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="gruhaJyothi"
                name="gruhaJyothi"
                type="checkbox"
                value="Yes"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
              />
              <label
                htmlFor="gruhaJyothi"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Gruha Jyothi
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="yuvaNidhi"
                name="yuvaNidhi"
                type="checkbox"
                value="Yes"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
              />
              <label
                htmlFor="yuvaNidhi"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Yuva Nidhi
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            Submit
          </button>
        </form>
        <div className="text-right text-[#7b7a7a] mt-4">
          <p>Nagraj</p>
          <p>Final Year</p>
          <p>CSE Dept.</p>
        </div>
      </div>
    </div>
  );
}
