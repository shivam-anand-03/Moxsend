"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  History,
  Layout,
  Upload,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCcw,
  Copy,
  FileText,
  Users,
  StarHalfIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Schema for the input form
const inputSchema = z.object({
  description: z
    .string()
    .min(10, { message: "Please provide a bit more detail (min 10 chars)" }),
});

type InputFormValues = z.infer<typeof inputSchema>;

// Mock Data structure
interface EmailVariation {
  id: string;
  subject: string;
  body: string;
  personalizedLine: string;
}

interface IterationData {
  before: string;
  after: string;
  change: string;
}

export default function MoxsendUI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [variations, setVariations] = useState<EmailVariation[]>([]);
  const [improvement, setImprovement] = useState<IterationData | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("manual");
  const [isImproved, setIsImproved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormValues>({
    resolver: zodResolver(inputSchema),
  });

  // Simulated Generation Logic
  const generateEmail = async (data: InputFormValues) => {
    setLoading(true);
    setError(null);
    setVariations([]);
    setImprovement(null);
    setIsImproved(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockedVariations: EmailVariation[] = [
        {
          id: "1",
          subject: "Revolutionize Your Workflow with Moxsend",
          body: `Hi there,\n\nI noticed you're looking to scale your product operations. At Moxsend, we help teams like yours automate the boring stuff so you can focus on building.\n\nWould you be open to a 5-minute chat next week?\n\nBest,\nThe Moxsend Team`,
          personalizedLine:
            "I saw your recent post about scaling productivity and thought this might hit the mark.",
        },
        {
          id: "2",
          subject: "Quick question about your audience growth",
          body: `Hey,\n\nManaging a growing audience is tough. Moxsend was built specifically for creators who need to stay connected without spending 24/7 on email.\n\nReady to see how it works?\n\nCheers,\nTeam Moxsend`,
          personalizedLine:
            "Your audience engagement levels are impressive, and we want to help you keep that momentum.",
        },
      ];

      setVariations(mockedVariations);
    } catch (err) {
      setError("Failed to generate email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Simulated Improvement Logic
  const handleImprove = async (index: number) => {
    setLoading(true);
    const original = variations[index]?.body;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const improvedBody =
        original +
        "\n\nP.S. We also just launched a new analytics dashboard that I think you'd love.";

      setImprovement({
        before: original as string,
        after: improvedBody,
        change: "Added a compelling P.S. line with a value-add discovery.",
      });
      setIsImproved(true);
    } finally {
      setLoading(false);
    }
  };

  // CSV Upload Logic
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setLoading(true);
    // Mock CSV parsing
    setTimeout(() => {
      setCsvData([
        { name: "John Doe", company: "TechCorp", email: "john@techcorp.com" },
        {
          name: "Jane Smith",
          company: "DesignFlow",
          email: "jane@designflow.com",
        },
        { name: "Alex Johnson", company: "GrowthX", email: "alex@growthx.com" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
  });

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 font-sans md:p-8 lg:p-12">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Header */}
        <header className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Moxsend <span className="text-indigo-600">UI</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">
            Turn your product descriptions into high-converting personalized
            cold emails in seconds.
          </p>
        </header>

        <Tabs
          defaultValue="manual"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="mb-8 flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Manual Input
              </TabsTrigger>
              <TabsTrigger value="csv" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                CSV Bulk
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Manual Input Section */}
          <TabsContent value="manual" className="space-y-8">
            <Card className="overflow-hidden border-none shadow-xl shadow-slate-200/50">
              <CardHeader className="border-b border-slate-100 bg-white">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileText className="h-5 w-5 text-indigo-500" />
                  Define your outreach
                </CardTitle>
                <CardDescription>
                  Tell us about your product and who you're targeting.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form
                  onSubmit={handleSubmit(generateEmail)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Describe your product & audience
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="e.g. A CRM for real estate agents that automates follow-ups. Targeting mid-sized agencies in the US..."
                      className="min-h-[120px] resize-none border-slate-200 focus:ring-indigo-500"
                      {...register("description")}
                    />
                    {errors.description && (
                      <p className="flex items-center gap-1 text-sm text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-lg bg-indigo-600 text-base text-white transition-all hover:bg-indigo-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <RefreshCcw className="h-4 w-4 animate-spin" />
                        Generating magic...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Generate Email
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Output Section */}
            <AnimatePresence mode="wait">
              {variations.length > 0 && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                      Generated Variations
                    </h2>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-500">
                      {variations.length} options ready
                    </span>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {variations.map((v, idx) => (
                      <Card
                        key={v.id}
                        className="group border-2 border-slate-200 transition-colors hover:border-indigo-200"
                      >
                        <CardHeader className="border-b border-slate-50 pb-3">
                          <div className="flex items-start justify-between">
                            <div className="rounded bg-indigo-50 px-2 py-1 text-xs font-bold tracking-wider text-indigo-700 uppercase">
                              Variation {idx + 1}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-400 hover:text-indigo-600"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <CardTitle className="mt-3 text-base leading-tight transition-colors group-hover:text-indigo-700">
                            {v.subject}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                          <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600 italic">
                            <span className="mb-1 block text-[10px] font-bold tracking-tighter text-indigo-600 uppercase not-italic">
                              Personalized Hook:
                            </span>
                            "{v.personalizedLine}"
                          </div>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
                            {v.body}
                          </p>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button
                            variant="outline"
                            className="w-full border-indigo-100 font-medium text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
                            onClick={() => handleImprove(idx)}
                          >
                            Improve this email
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Improvement/Iteration Section */}
            <AnimatePresence>
              {improvement && isImproved && !loading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-12 space-y-4"
                >
                  <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-black p-2 px-4 text-sm font-medium text-white">
                    <History className="h-4 w-4" />
                    Iteration History
                  </div>

                  <div className="grid gap-0 overflow-hidden rounded-2xl border-2 border-slate-200 shadow-2xl md:grid-cols-2">
                    <div className="border-r border-slate-200 bg-slate-50 p-6">
                      <div className="mb-4 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-slate-400" />
                        <span className="text-sm font-bold text-slate-500 uppercase">
                          Before
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap text-slate-500 line-through opacity-60">
                        {improvement.before}
                      </p>
                    </div>
                    <div className="relative bg-white p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                          <span className="text-sm font-bold text-indigo-600 uppercase">
                            After Improvement
                          </span>
                        </div>
                        <span className="rounded bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700">
                          AI OPTIMIZED
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap text-slate-800">
                        {improvement.after}
                      </p>
                      <div className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500 italic">
                        <strong>Logic applied:</strong> {improvement.change}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          {/* CSV Bulk Section */}
          <TabsContent value="csv" className="space-y-8">
            <Card className="border-none shadow-xl shadow-slate-200/50">
              <CardContent className="p-10">
                <div
                  {...getRootProps()}
                  className={cn(
                    "flex cursor-pointer flex-col items-center gap-4 rounded-2xl border-2 border-dashed p-12 text-center transition-all",
                    isDragActive
                      ? "border-indigo-500 bg-indigo-50/50"
                      : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50/50",
                  )}
                >
                  <input {...getInputProps()} />
                  <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <Upload className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Upload your CSV
                    </h3>
                    <p className="mt-1 text-slate-500">
                      Drag and drop or click to browse
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="h-3 w-3" />
                    Strictly accepts .csv files
                  </div>
                </div>
              </CardContent>
            </Card>

            {csvData.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                    <Users className="h-6 w-6 text-indigo-500" />
                    Recipient Preview
                  </h2>
                  <Button className="bg-indigo-600">
                    Process All {csvData.length} Contacts
                  </Button>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="px-6 py-4 text-sm font-bold text-slate-600">
                          Name
                        </th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-600">
                          Company
                        </th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-600">
                          Email
                        </th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-600">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {csvData.map((row, i) => (
                        <tr
                          key={i}
                          className="transition-colors hover:bg-slate-50/50"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">
                            {row.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {row.company}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {row.email}
                          </td>
                          <td className="px-6 py-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
                            >
                              Details <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 p-4 backdrop-blur-sm">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 shadow-xl"
            >
              <StarHalfIcon className="h-8 w-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-slate-900">
              Moxsend AI is thinking...
            </h3>
            <p className="mt-2 text-slate-500">
              Crafting your personalized outreach sequence
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
