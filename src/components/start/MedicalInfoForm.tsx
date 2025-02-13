// components/start/MedicalInfoForm.tsx
"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

export type Medication = {
  medication_name: string;
  dosage: string;
  frequency: "daily" | "weekly" | "monthly" | "as_needed";
  start_date: string;
  end_date?: string;
};

export type Allergy = {
  allergen: string;
  reaction: string;
  severity: "mild" | "moderate" | "severe";
};

export type MedicalInfo = {
  medications: Medication[];
  allergies: Allergy[];
  diagnoses: string;
  cognitive_symptoms: string;
};

type MedicalInfoFormProps = {
  data: MedicalInfo;
  onChange: (data: MedicalInfo) => void;
};

export default function MedicalInfoForm({ data, onChange }: MedicalInfoFormProps) {
  const handleAddMedication = () => {
    onChange({
      ...data,
      medications: [
        ...data.medications,
        { medication_name: "", dosage: "", frequency: "daily", start_date: "", end_date: "" },
      ],
    });
  };

  const handleRemoveMedication = (index: number) => {
    const meds = [...data.medications];
    meds.splice(index, 1);
    onChange({ ...data, medications: meds });
  };

  const handleAddAllergy = () => {
    onChange({
      ...data,
      allergies: [
        ...data.allergies,
        { allergen: "", reaction: "", severity: "mild" },
      ],
    });
  };

  const handleRemoveAllergy = (index: number) => {
    const allys = [...data.allergies];
    allys.splice(index, 1);
    onChange({ ...data, allergies: allys });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Medical Information</h2>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Current Medications</h3>
        {data.medications.map((med, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`medication_name_${i}`}>Medication Name</Label>
              <Input
                id={`medication_name_${i}`}
                placeholder="Enter medication name"
                value={med.medication_name}
                onChange={(e) => {
                  const meds = [...data.medications];
                  meds[i].medication_name = e.target.value;
                  onChange({ ...data, medications: meds });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`dosage_${i}`}>Dosage</Label>
              <Input
                id={`dosage_${i}`}
                placeholder="Enter dosage"
                value={med.dosage}
                onChange={(e) => {
                  const meds = [...data.medications];
                  meds[i].dosage = e.target.value;
                  onChange({ ...data, medications: meds });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`frequency_${i}`}>Frequency</Label>
              <Select
                value={med.frequency}
                onValueChange={(value) => {
                  const meds = [...data.medications];
                  meds[i].frequency = value as Medication["frequency"];
                  onChange({ ...data, medications: meds });
                }}
              >
                <SelectTrigger id={`frequency_${i}`}>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="as_needed">As Needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`start_date_${i}`}>Start Date</Label>
              <Input
                id={`start_date_${i}`}
                type="date"
                value={med.start_date}
                onChange={(e) => {
                  const meds = [...data.medications];
                  meds[i].start_date = e.target.value;
                  onChange({ ...data, medications: meds });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`end_date_${i}`}>End Date</Label>
              <Input
                id={`end_date_${i}`}
                type="date"
                value={med.end_date}
                onChange={(e) => {
                  const meds = [...data.medications];
                  meds[i].end_date = e.target.value;
                  onChange({ ...data, medications: meds });
                }}
              />
            </div>
            <div className="flex items-center">
              <Button variant="outline" onClick={() => handleRemoveMedication(i)}>
                Remove Medication
              </Button>
            </div>
          </div>
        ))}
        <Button onClick={handleAddMedication}>Add Medication</Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Allergies</h3>
        {data.allergies.map((allergy, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`allergen_${i}`}>Allergen</Label>
              <Input
                id={`allergen_${i}`}
                placeholder="Enter allergen"
                value={allergy.allergen}
                onChange={(e) => {
                  const allers = [...data.allergies];
                  allers[i].allergen = e.target.value;
                  onChange({ ...data, allergies: allers });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`reaction_${i}`}>Reaction</Label>
              <Textarea
                id={`reaction_${i}`}
                placeholder="Describe the reaction"
                value={allergy.reaction}
                onChange={(e) => {
                  const allers = [...data.allergies];
                  allers[i].reaction = e.target.value;
                  onChange({ ...data, allergies: allers });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`severity_${i}`}>Severity</Label>
              <Select
                value={allergy.severity}
                onValueChange={(value) => {
                  const allers = [...data.allergies];
                  allers[i].severity = value as Allergy["severity"];
                  onChange({ ...data, allergies: allers });
                }}
              >
                <SelectTrigger id={`severity_${i}`}>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center">
              <Button variant="outline" onClick={() => handleRemoveAllergy(i)}>
                Remove Allergy
              </Button>
            </div>
          </div>
        ))}
        <Button onClick={handleAddAllergy}>Add Allergy</Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Diagnoses</h3>
        <div className="space-y-2">
          <Label htmlFor="diagnoses">Current Diagnoses</Label>
          <Textarea
            id="diagnoses"
            placeholder="List your current diagnoses"
            value={data.diagnoses}
            onChange={(e) => onChange({ ...data, diagnoses: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Cognitive Symptoms</h3>
        <div className="space-y-2">
          <Label htmlFor="cognitive_symptoms">Cognitive Symptoms</Label>
          <Textarea
            id="cognitive_symptoms"
            placeholder="Describe your cognitive symptoms"
            value={data.cognitive_symptoms}
            onChange={(e) => onChange({ ...data, cognitive_symptoms: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
