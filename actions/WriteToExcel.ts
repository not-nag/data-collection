"use client";
import * as XLSX from "xlsx";

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

export async function writeToExcel(data: Person[]): Promise<Blob> {
  const headers = [
    "Door Number",
    "Number of People in the House",
    "Number of People with Voter ID",
    "Number of People with Voter ID",
    "Contact Number",
    "Number of Girl Child",
    "Government Assistance",
    "Ration Card Type",
    "Has Udyog Yojana Card",
    "Number of Women",
    "Name: Women Details",
    "Dropout",
    "Voter ID",
    "Continue Education",
    "Education Qualification",
    "Voter ID Reason",
    "Dropout Reason",
  ];

  const excelData: any[] = [];

  data.forEach((person) => {
    const personData = [
      person.doorNumber,
      person.numberOfPeople,
      person.numberOfVoterID,
      person.contactNumber,
      person.numberOfGirlChild,
      person.governmentAssistance,
      person.rationCardType,
      person.hasUdyogYojanaCard,
      person.numberOfWomen,
      "", // Placeholder for Women Details: Name
      "", // Placeholder for Women Details: Dropout
      "", // Placeholder for Women Details: Voter ID
      "", // Placeholder for Women Details: Continue Education
      "", // Placeholder for Women Details: Education Qualification
      "", // Placeholder for Women Details: Voter ID Reason
      "", // Placeholder for Women Details: Dropout Reason
    ];

    excelData.push(personData);

    person.womenDetails.forEach((detail) => {
      const detailData = [
        "", // Placeholder for Number of People
        "", // Placeholder for Has Udyog Yojana Card
        "", // Placeholder for Number of Women
        "", // Placeholder for Number of Voter ID
        "", // Placeholder for Contact Number
        "", // Placeholder for Number of Girl Child
        "", // Placeholder for Government Assistance
        "", // Placeholder for Door Number
        "", // Placeholder for Ration Card Type
        detail.name,
        detail.dropout,
        detail.voterID,
        detail.continueEducation || "",
        detail.educationQualification || "",
        detail.voterIDReason || "",
        detail.dropoutReason || "",
      ];

      excelData.push(detailData);
    });
  });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...excelData]);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  const excelBuffer = XLSX.write(workbook, { type: "array" });

  return new Blob([excelBuffer], { type: "application/octet-stream" });
}
