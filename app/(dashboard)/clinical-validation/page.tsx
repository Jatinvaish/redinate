"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, X, FileText, CheckCircle2 } from "lucide-react";

type DurationOption = "last_30_days" | "last_3_months" | "last_12_months" | "custom";

interface CohortForm {
  modality: string;
  bodyParts: string[];
  dictatedBy: string[];
  sites: string[];
  scanners: string[];
  cohortTags: string[];
  confounders: string[];
  confounderNotes: string;
  groundTruthTypes: string[];
  aiToolId: string;
  modelVersionId: string;
  startDate: string;
  endDate: string;
  cohortName: string;
  notes: string;
  tumorBoardFile: File | null;
}

export default function ClinicalValidationBuilder() {
  const [duration, setDuration] = useState<DurationOption>("last_12_months");
  const [form, setForm] = useState<CohortForm>({
    modality: "",
    bodyParts: [],
    dictatedBy: [],
    sites: [],
    scanners: [],
    cohortTags: [],
    confounders: [],
    confounderNotes: "",
    groundTruthTypes: [],
    aiToolId: "",
    modelVersionId: "",
    startDate: "",
    endDate: "",
    cohortName: "",
    notes: "",
    tumorBoardFile: null,
  });

  const [previewData, setPreviewData] = useState<any>(null);
  const [isEstimating, setIsEstimating] = useState(false);

  const handleChange = (field: keyof CohortForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: keyof CohortForm, value: string) => {
    setForm(prev => {
      const current = prev[field] as string[];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleChange("tumorBoardFile", file);
    }
  };

  const handleEstimate = () => {
    setIsEstimating(true);
    setTimeout(() => {
      setPreviewData({
        totalExams: 1234,
        byCohort: { tp: 220, fn: 15, tn: 900, fp: 99 },
        bySite: { "Site A": 600, "Site B": 400, "Others": 234 },
        byGroundTruth: { biopsy: 180, report: 1054, annotation: 100 },
        previewRows: [
          {
            studyId: "STU-2024-001",
            date: "2024-12-01",
            modality: "Mammography",
            bodyPart: "Breast",
            site: "Main Campus",
            dictatedBy: "Dr. Smith",
            scanner: "Hologic - Selenia",
            confounders: ["Past surgery"],
            groundTruth: ["report", "biopsy"],
          },
          {
            studyId: "STU-2024-002",
            date: "2024-12-02",
            modality: "CT",
            bodyPart: "Chest",
            site: "Site A",
            dictatedBy: "Dr. Johnson",
            scanner: "GE Healthcare - Discovery",
            confounders: [],
            groundTruth: ["report"],
          },
          {
            studyId: "STU-2024-003",
            date: "2024-12-03",
            modality: "MRI",
            bodyPart: "Brain",
            site: "Site B",
            dictatedBy: "Dr. Williams",
            scanner: "Siemens - SOMATOM",
            confounders: ["Implants / hardware"],
            groundTruth: ["report", "annotation"],
          },
        ],
      });
      setIsEstimating(false);
    }, 1000);
  };

  const handleCreateRun = () => {
    console.log("Creating validation run with form:", form);
  };

  const handleReset = () => {
    setForm({
      modality: "",
      bodyParts: [],
      dictatedBy: [],
      sites: [],
      scanners: [],
      cohortTags: [],
      confounders: [],
      confounderNotes: "",
      groundTruthTypes: [],
      aiToolId: "",
      modelVersionId: "",
      startDate: "",
      endDate: "",
      cohortName: "",
      notes: "",
      tumorBoardFile: null,
    });
    setDuration("last_12_months");
    setPreviewData(null);
  };

  const bodyPartOptions = ["Chest", "Abdomen", "Breast", "Brain", "Spine", "Pelvis", "Other"];
  const radiologistOptions = ["Dr. Smith", "Dr. Johnson", "Dr. Williams", "Dr. Brown", "Dr. Davis"];
  const siteOptions = ["Main Campus", "Outpatient Center A", "Site 3", "Site 4"];
  const scannerOptions = ["GE Healthcare - Discovery", "Siemens - SOMATOM", "Hologic - Selenia"];
  const cohortTagOptions = [
    { value: "tp", label: "True Positive (TP)" },
    { value: "fp", label: "False Positive (FP)" },
    { value: "tn", label: "True Negative (TN)" },
    { value: "fn", label: "False Negative (FN)" },
  ];
  const confounderOptions = [
    "Past surgery (e.g., lumpectomy)",
    "Implants / hardware",
    "Significant artifacts",
    "Incomplete / aborted study",
    "Non-standard protocol",
  ];
  const groundTruthOptions = [
    "Radiology report (final signed)",
    "Biopsy / pathology report",
    "Structured annotation (lesion-level)",
    "Tumor board decision",
  ];
  const aiTools = [
    { id: "tool-1", name: "Gleamer BoneView", version: "v2.4.1", status: "510(k)-cleared" },
    { id: "tool-2", name: "Aidoc Brain CT", version: "v3.1.2", status: "510(k)-cleared" },
    { id: "tool-3", name: "Viz.ai Stroke", version: "v4.0.5", status: "510(k)-cleared" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Clinical Validation – Build Cohort</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Define your cohort criteria and preview results before creating a validation run
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT PANEL: FILTERS */}
        <div className="lg:col-span-1">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-4 pr-4">
              {/* Study Scope */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Study Scope</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Modality *
                    </Label>
                    <Select value={form.modality} onValueChange={(value) => handleChange("modality", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select modality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xray">X-ray</SelectItem>
                        <SelectItem value="mammo">Mammography</SelectItem>
                        <SelectItem value="ct">CT</SelectItem>
                        <SelectItem value="mri">MRI</SelectItem>
                        <SelectItem value="us">Ultrasound</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Body Part
                    </Label>
                    <div className="rounded-md border p-3 space-y-2 max-h-36 overflow-y-auto">
                      {bodyPartOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`body-${option}`}
                            checked={form.bodyParts.includes(option)}
                            onCheckedChange={() => handleMultiSelect("bodyParts", option)}
                          />
                          <Label htmlFor={`body-${option}`} className="text-sm cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Duration *
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "last_30_days", label: "Last 30 days" },
                        { id: "last_3_months", label: "Last 3 months" },
                        { id: "last_12_months", label: "Last 12 months" },
                        { id: "custom", label: "Custom" },
                      ].map((opt) => (
                        <Button
                          key={opt.id}
                          type="button"
                          variant={duration === opt.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDuration(opt.id as DurationOption)}
                        >
                          {opt.label}
                        </Button>
                      ))}
                    </div>
                    {duration === "custom" && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="space-y-1">
                          <Label className="text-xs">From</Label>
                          <Input
                            type="date"
                            value={form.startDate}
                            onChange={(e) => handleChange("startDate", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">To</Label>
                          <Input
                            type="date"
                            value={form.endDate}
                            onChange={(e) => handleChange("endDate", e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Dictated By
                    </Label>
                    <div className="rounded-md border p-3 space-y-2 max-h-32 overflow-y-auto">
                      {radiologistOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`rad-${option}`}
                            checked={form.dictatedBy.includes(option)}
                            onCheckedChange={() => handleMultiSelect("dictatedBy", option)}
                          />
                          <Label htmlFor={`rad-${option}`} className="text-sm cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Site ID
                    </Label>
                    <div className="rounded-md border p-3 space-y-2">
                      {siteOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`site-${option}`}
                            checked={form.sites.includes(option)}
                            onCheckedChange={() => handleMultiSelect("sites", option)}
                          />
                          <Label htmlFor={`site-${option}`} className="text-sm cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Scanner Type
                    </Label>
                    <div className="rounded-md border p-3 space-y-2">
                      {scannerOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`scanner-${option}`}
                            checked={form.scanners.includes(option)}
                            onCheckedChange={() => handleMultiSelect("scanners", option)}
                          />
                          <Label htmlFor={`scanner-${option}`} className="text-sm cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cohort & Confounders */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Cohort & Confounders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Cohort Tag
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      If left empty, all cases matching filters are eligible; cohort labels will be computed from ground truth.
                    </p>
                    <div className="rounded-md border p-3 space-y-2">
                      {cohortTagOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cohort-${option.value}`}
                            checked={form.cohortTags.includes(option.value)}
                            onCheckedChange={() => handleMultiSelect("cohortTags", option.value)}
                          />
                          <Label htmlFor={`cohort-${option.value}`} className="text-sm cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Confounders
                    </Label>
                    <div className="rounded-md border p-3 space-y-2 max-h-40 overflow-y-auto">
                      {confounderOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`conf-${option}`}
                            checked={form.confounders.includes(option)}
                            onCheckedChange={() => handleMultiSelect("confounders", option)}
                          />
                          <Label htmlFor={`conf-${option}`} className="text-sm cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Additional confounder notes (optional)</Label>
                    <Textarea
                      placeholder="Enter any additional confounder information..."
                      value={form.confounderNotes}
                      onChange={(e) => handleChange("confounderNotes", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Ground Truth Type *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Pick all sources you are willing to use as reference. When multiple apply, we'll prioritize biopsy → tumor board → annotation → report.
                    </p>
                    <div className="rounded-md border p-3 space-y-2">
                      {groundTruthOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`truth-${option}`}
                            checked={form.groundTruthTypes.includes(option)}
                            onCheckedChange={() => handleMultiSelect("groundTruthTypes", option)}
                          />
                          <Label htmlFor={`truth-${option}`} className="text-sm cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Tool & External Data */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">AI Tool & External Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      AI Tool to Test *
                    </Label>
                    <Select value={form.aiToolId} onValueChange={(value) => handleChange("aiToolId", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select AI tool" />
                      </SelectTrigger>
                      <SelectContent>
                        {aiTools.map((tool) => (
                          <SelectItem key={tool.id} value={tool.id}>
                            <div className="flex items-center gap-2">
                              <span>{tool.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {tool.status}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {form.aiToolId && (
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                        Model Version (optional)
                      </Label>
                      <Select value={form.modelVersionId} onValueChange={(value) => handleChange("modelVersionId", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select version" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="v1.0">v1.0</SelectItem>
                          <SelectItem value="v1.1">v1.1</SelectItem>
                          <SelectItem value="v2.0">v2.0 (beta)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Optional Tumor Board Registry / CSV
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Upload tumor board or registry CSV to enhance ground truth and confounder flags
                    </p>
                    {!form.tumorBoardFile ? (
                      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <Label htmlFor="file-upload" className="text-sm cursor-pointer">
                          <span className="text-primary hover:underline">Click to upload</span> or drag and drop
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">CSV files only</p>
                        <Input
                          id="file-upload"
                          type="file"
                          accept=".csv"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </div>
                    ) : (
                      <div className="border rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{form.tumorBoardFile.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleChange("tumorBoardFile", null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>

        {/* RIGHT PANEL: PREVIEW */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Cohort Preview</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    Reset Filters
                  </Button>
                  <Button size="sm" onClick={handleEstimate} disabled={isEstimating}>
                    {isEstimating ? "Estimating..." : "Estimate Cohort Size"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!previewData ? (
                <div className="text-center py-12">
                  <p className="text-sm text-muted-foreground">
                    Configure filters on the left, then click "Estimate Cohort Size" to preview results.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Summary Cards */}
                  <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{previewData.totalExams}</div>
                        <p className="text-xs text-muted-foreground">Total Candidate Exams</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">TP:</span>
                            <span className="font-medium">{previewData.byCohort.tp}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">FN:</span>
                            <span className="font-medium">{previewData.byCohort.fn}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">TN:</span>
                            <span className="font-medium">{previewData.byCohort.tn}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">FP:</span>
                            <span className="font-medium">{previewData.byCohort.fp}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-sm space-y-1">
                          {Object.entries(previewData.bySite).map(([site, count]) => (
                            <div key={site} className="flex justify-between">
                              <span className="text-muted-foreground">{site}:</span>
                              <span className="font-medium">{count as number}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-sm space-y-1">
                          {Object.entries(previewData.byGroundTruth).map(([type, count]) => (
                            <div key={type} className="flex justify-between">
                              <span className="text-muted-foreground capitalize">{type}:</span>
                              <span className="font-medium">{count as number}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Preview Table */}
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Preview (first 20 rows)</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-32">Study ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Modality</TableHead>
                            <TableHead>Body Part</TableHead>
                            <TableHead>Site</TableHead>
                            <TableHead>Dictated By</TableHead>
                            <TableHead>Scanner</TableHead>
                            <TableHead>Confounders</TableHead>
                            <TableHead>Ground Truth</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {previewData.previewRows.map((row: any, idx: number) => (
                            <TableRow key={idx}>
                              <TableCell className="font-mono text-xs">{row.studyId}</TableCell>
                              <TableCell className="text-xs">{row.date}</TableCell>
                              <TableCell className="text-xs">{row.modality}</TableCell>
                              <TableCell className="text-xs">{row.bodyPart}</TableCell>
                              <TableCell className="text-xs">{row.site}</TableCell>
                              <TableCell className="text-xs">{row.dictatedBy}</TableCell>
                              <TableCell className="text-xs">{row.scanner}</TableCell>
                              <TableCell>
                                <div className="flex gap-1 flex-wrap">
                                  {row.confounders.length > 0 ? (
                                    row.confounders.map((c: string, i: number) => (
                                      <Badge key={i} variant="outline" className="text-xs">
                                        {c}
                                      </Badge>
                                    ))
                                  ) : (
                                    <span className="text-xs text-muted-foreground">None</span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1 flex-wrap">
                                  {row.groundTruth.map((gt: string, i: number) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                      {gt}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Run Creation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Create Validation Run</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                  Cohort / Run Name *
                </Label>
                <Input
                  placeholder="e.g. MSK – Mammo – Breast – Last 12 months – v2 vs v1"
                  value={form.cohortName}
                  onChange={(e) => handleChange("cohortName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                  Notes for AI Committee (optional)
                </Label>
                <Textarea
                  placeholder="Add any notes or context for the AI governance committee..."
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => console.log("Save as template")}>
                Save as Template
              </Button>
              <Button onClick={handleCreateRun} disabled={!form.modality || !form.aiToolId || !form.cohortName}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Create Validation Run
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}