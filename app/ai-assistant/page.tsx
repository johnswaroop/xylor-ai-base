"use client";

import { useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import {
  Pin,
  PinOff,
  Search,
  User,
  Clock,
  AlertCircle,
  CheckCircle2,
  Circle,
  Timer,
  Plus,
  Calendar,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Loader2,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
// Hardcoded demo data
const projects = [
  {
    name: "PROJ-001",
    project_name: "Website Redesign",
    status: "Open",
    percent_complete: 65,
    expected_end_date: "2024-02-15",
    customer: "Acme Corp",
    project_type: "External",
    creation: "2024-01-01T10:00:00Z",
    modified: "2024-01-10T14:30:00Z",
  },
  {
    name: "PROJ-002",
    project_name: "Mobile App Development",
    status: "Open",
    percent_complete: 30,
    expected_end_date: "2024-03-30",
    customer: "TechStart Inc",
    project_type: "External",
    creation: "2024-01-05T09:00:00Z",
    modified: "2024-01-09T16:45:00Z",
  },
  {
    name: "PROJ-003",
    project_name: "ERP Implementation",
    status: "Open",
    percent_complete: 85,
    expected_end_date: "2024-01-25",
    customer: "Global Solutions",
    project_type: "Internal",
    creation: "2023-12-15T08:00:00Z",
    modified: "2024-01-11T09:15:00Z",
  },
  {
    name: "PROJ-004",
    project_name: "Security Audit",
    status: "Completed",
    percent_complete: 100,
    expected_end_date: "2024-01-10",
    customer: "SecureBank",
    project_type: "External",
    creation: "2023-12-01T10:00:00Z",
    modified: "2024-01-10T17:00:00Z",
  },
];

const tasks = [
  {
    name: "TASK-001",
    subject: "Design Homepage Layout",
    status: "Completed",
    priority: "High",
    exp_start_date: "2024-01-01",
    exp_end_date: "2024-01-05",
    progress: 100,
    project: "PROJ-001",
    creation: "2024-01-01T10:00:00Z",
    modified: "2024-01-05T17:00:00Z",
  },
  {
    name: "TASK-002",
    subject: "Implement User Authentication",
    status: "Working",
    priority: "High",
    exp_start_date: "2024-01-06",
    exp_end_date: "2024-01-12",
    progress: 75,
    project: "PROJ-001",
    creation: "2024-01-06T09:00:00Z",
    modified: "2024-01-11T14:30:00Z",
  },
  {
    name: "TASK-003",
    subject: "Setup Database Schema",
    status: "Overdue",
    priority: "Urgent",
    exp_start_date: "2024-01-03",
    exp_end_date: "2024-01-08",
    progress: 40,
    project: "PROJ-001",
    creation: "2024-01-03T08:00:00Z",
    modified: "2024-01-09T12:00:00Z",
  },
  {
    name: "TASK-004",
    subject: "Mobile UI Framework Setup",
    status: "Open",
    priority: "Medium",
    exp_start_date: "2024-01-15",
    exp_end_date: "2024-01-20",
    progress: 0,
    project: "PROJ-002",
    creation: "2024-01-10T11:00:00Z",
    modified: "2024-01-10T11:00:00Z",
  },
  {
    name: "TASK-005",
    subject: "API Integration Testing",
    status: "Working",
    priority: "High",
    exp_start_date: "2024-01-08",
    exp_end_date: "2024-01-15",
    progress: 60,
    project: "PROJ-002",
    creation: "2024-01-08T10:00:00Z",
    modified: "2024-01-11T16:00:00Z",
  },
  {
    name: "TASK-006",
    subject: "Data Migration Scripts",
    status: "Completed",
    priority: "High",
    exp_start_date: "2023-12-20",
    exp_end_date: "2024-01-05",
    progress: 100,
    project: "PROJ-003",
    creation: "2023-12-20T09:00:00Z",
    modified: "2024-01-05T18:00:00Z",
  },
  {
    name: "TASK-007",
    subject: "User Training Documentation",
    status: "Working",
    priority: "Medium",
    exp_start_date: "2024-01-08",
    exp_end_date: "2024-01-20",
    progress: 80,
    project: "PROJ-003",
    creation: "2024-01-08T08:00:00Z",
    modified: "2024-01-11T10:00:00Z",
  },
  {
    name: "TASK-008",
    subject: "Security Penetration Testing",
    status: "Completed",
    priority: "Urgent",
    exp_start_date: "2023-12-05",
    exp_end_date: "2024-01-08",
    progress: 100,
    project: "PROJ-004",
    creation: "2023-12-05T09:00:00Z",
    modified: "2024-01-08T16:00:00Z",
  },
];

const issues = [
  {
    name: "ISS-001",
    subject: "Login page not responsive on mobile",
    status: "Open",
    priority: "High",
    issue_type: "Bug",
    opening_date: "2024-01-10T10:30:00Z",
    project: "PROJ-001",
    creation: "2024-01-10T10:30:00Z",
    modified: "2024-01-10T15:00:00Z",
  },
  {
    name: "ISS-002",
    subject: "Add dark mode toggle",
    status: "Replied",
    priority: "Medium",
    issue_type: "Feature",
    opening_date: "2024-01-09T14:15:00Z",
    project: "PROJ-001",
    creation: "2024-01-09T14:15:00Z",
    modified: "2024-01-10T09:30:00Z",
  },
  {
    name: "ISS-003",
    subject: "Database connection timeout",
    status: "Resolved",
    priority: "Urgent",
    issue_type: "Bug",
    opening_date: "2024-01-08T09:45:00Z",
    project: "PROJ-001",
    creation: "2024-01-08T09:45:00Z",
    modified: "2024-01-09T16:30:00Z",
  },
  {
    name: "ISS-004",
    subject: "App crashes on iOS 15",
    status: "Open",
    priority: "High",
    issue_type: "Bug",
    opening_date: "2024-01-11T11:20:00Z",
    project: "PROJ-002",
    creation: "2024-01-11T11:20:00Z",
    modified: "2024-01-11T11:20:00Z",
  },
  {
    name: "ISS-005",
    subject: "Slow ERP module loading",
    status: "Working",
    priority: "Medium",
    issue_type: "Performance",
    opening_date: "2024-01-09T13:00:00Z",
    project: "PROJ-003",
    creation: "2024-01-09T13:00:00Z",
    modified: "2024-01-11T14:00:00Z",
  },
];

const communications = [
  {
    name: "COMM-001",
    communication_type: "Email",
    content:
      "Hi team, please review the latest homepage designs. The client has requested some changes to the color scheme and wants to see a darker theme option. Let's schedule a call to discuss the implementation timeline.",
    sender: "client@acmecorp.com",
    recipients: ["john.doe@company.com", "jane.smith@company.com"],
    subject: "Homepage Design Review - Color Scheme Changes",
    reference_doctype: "Project",
    reference_name: "PROJ-001",
    communication_date: "2024-01-10T14:30:00Z",
    creation: "2024-01-10T14:30:00Z",
    modified: "2024-01-10T14:30:00Z",
  },
  {
    name: "COMM-002",
    communication_type: "Call",
    content:
      "Call with client regarding mobile responsiveness issues. Duration: 45 minutes. Key points discussed: Need to prioritize mobile-first design approach, fix login page issues by end of week, consider implementing progressive web app features.",
    sender: "jane.smith@company.com",
    recipients: ["client@acmecorp.com"],
    subject: "Mobile Responsiveness Discussion",
    reference_doctype: "Issue",
    reference_name: "ISS-001",
    communication_date: "2024-01-10T16:00:00Z",
    creation: "2024-01-10T16:00:00Z",
    modified: "2024-01-10T16:00:00Z",
  },
  {
    name: "COMM-003",
    communication_type: "Chat",
    content:
      "Quick sync on database schema progress. Bob mentioned the connection timeout issue has been resolved with the new connection pooling implementation. We can now move forward with the authentication system integration.",
    sender: "john.doe@company.com",
    recipients: ["bob.wilson@company.com", "jane.smith@company.com"],
    subject: "Database Schema Update",
    reference_doctype: "Task",
    reference_name: "TASK-002",
    communication_date: "2024-01-09T10:15:00Z",
    creation: "2024-01-09T10:15:00Z",
    modified: "2024-01-09T10:15:00Z",
  },
  {
    name: "COMM-004",
    communication_type: "Email",
    content:
      "Weekly project status update: Website redesign is 65% complete. Homepage design has been finalized and approved. Authentication system implementation is in progress with 75% completion. Database schema setup encountered some delays but is now resolved. Expected completion remains on track for Feb 15th.",
    sender: "john.doe@company.com",
    recipients: ["client@acmecorp.com", "manager@company.com"],
    subject: "Weekly Status Update - Website Redesign",
    reference_doctype: "Project",
    reference_name: "PROJ-001",
    communication_date: "2024-01-11T09:00:00Z",
    creation: "2024-01-11T09:00:00Z",
    modified: "2024-01-11T09:00:00Z",
  },
  {
    name: "COMM-005",
    communication_type: "Email",
    content:
      "ERP implementation is nearing completion at 85%. Data migration scripts have been successfully tested and deployed. Currently working on user training documentation and final system testing. Go-live date confirmed for Jan 25th.",
    sender: "sarah.johnson@company.com",
    recipients: ["manager@globalsolutions.com"],
    subject: "ERP Implementation - Final Phase Update",
    reference_doctype: "Project",
    reference_name: "PROJ-003",
    communication_date: "2024-01-11T13:30:00Z",
    creation: "2024-01-11T13:30:00Z",
    modified: "2024-01-11T13:30:00Z",
  },
  {
    name: "COMM-006",
    communication_type: "Chat",
    content:
      "Mobile app framework setup is ready to begin. Alice has completed the research phase and identified React Native as the best option for cross-platform development. Starting development next week.",
    sender: "alice.brown@company.com",
    recipients: ["charlie.davis@company.com"],
    subject: "Mobile Framework Decision",
    reference_doctype: "Task",
    reference_name: "TASK-004",
    communication_date: "2024-01-11T15:45:00Z",
    creation: "2024-01-11T15:45:00Z",
    modified: "2024-01-11T15:45:00Z",
  },
];

export interface TaggedContext {
  type: "project" | "task" | "issue" | "communication";
  id: string;
  name: string;
}

export default function AIAssistantPage() {
  const [taggedContext, setTaggedContext] = useState<TaggedContext[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set()
  );

  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "/api/chat",
      body: {
        taggedContext: taggedContext,
      },
    });

  // Using hardcoded demo data - no loading states needed
  const projectsLoading = false;
  const tasksLoading = false;
  const issuesLoading = false;
  const communicationsLoading = false;

  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProjects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const isProjectExpanded = (projectId: string) => {
    return expandedProjects.has(projectId);
  };

  const toggleTag = (type: TaggedContext["type"], id: string, name: string) => {
    setTaggedContext((prev) => {
      const exists = prev.find((item) => item.type === type && item.id === id);
      if (exists) {
        // If removing a project, also remove all related items
        if (type === "project") {
          const projectTasks = getTasksByProject(id);
          const projectIssues = getIssuesByProject(id);
          const projectCommunications = communications.filter(
            (comm) =>
              comm.reference_doctype === "Project" && comm.reference_name === id
          );

          return prev.filter((item) => {
            // Remove the project itself
            if (item.type === type && item.id === id) return false;

            // Remove related tasks
            if (
              item.type === "task" &&
              projectTasks.some((task) => task.name === item.id)
            )
              return false;

            // Remove related issues
            if (
              item.type === "issue" &&
              projectIssues.some((issue) => issue.name === item.id)
            )
              return false;

            // Remove related communications
            if (
              item.type === "communication" &&
              projectCommunications.some((comm) => comm.name === item.id)
            )
              return false;

            return true;
          });
        } else {
          // For non-project items, just remove the single item
          return prev.filter((item) => !(item.type === type && item.id === id));
        }
      } else {
        // Adding new item
        const newItems: TaggedContext[] = [{ type, id, name }];

        // If adding a project, automatically add all related items
        if (type === "project") {
          const projectTasks = getTasksByProject(id);
          projectTasks.forEach((task) => {
            if (
              !prev.some(
                (item) => item.type === "task" && item.id === task.name
              )
            ) {
              newItems.push({
                type: "task",
                id: task.name,
                name: task.subject,
              });
            }
          });

          // Add related issues
          const projectIssues = getIssuesByProject(id);
          projectIssues.forEach((issue) => {
            if (
              !prev.some(
                (item) => item.type === "issue" && item.id === issue.name
              )
            ) {
              newItems.push({
                type: "issue",
                id: issue.name,
                name: issue.subject,
              });
            }
          });

          // Add related communications
          const projectCommunications = communications.filter(
            (comm) =>
              comm.reference_doctype === "Project" && comm.reference_name === id
          );
          projectCommunications.forEach((comm) => {
            if (
              !prev.some(
                (item) => item.type === "communication" && item.id === comm.name
              )
            ) {
              newItems.push({
                type: "communication",
                id: comm.name,
                name: `${comm.communication_type} - ${comm.sender}`,
              });
            }
          });
        }

        return [...prev, ...newItems];
      }
    });
  };

  const isTagged = (type: TaggedContext["type"], id: string) => {
    return taggedContext.some((item) => item.type === type && item.id === id);
  };

  const clearAllTags = () => {
    setTaggedContext([]);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "resolved":
      case "closed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "working":
      case "replied":
        return <Timer className="h-4 w-4 text-blue-600" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "cancelled":
        return "bg-gray-50 text-gray-700 border-gray-200";
      case "overdue":
        return "bg-red-50 text-red-700 border-red-200";
      case "working":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "bg-red-50 text-red-700 border-red-200";
      case "high":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "No date";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Filter tasks and issues by project
  const getTasksByProject = (projectName: string) => {
    const filteredTasks = tasks.filter((task) => task.project === projectName);
    return filteredTasks;
  };

  const getIssuesByProject = (projectName: string) => {
    return issues.filter((issue) => issue.project === projectName);
  };

  // Filter communications for search
  const filteredCommunications = communications.filter(
    (comm) =>
      comm.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (comm.subject &&
        comm.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Check if any data is loading
  const isAnyLoading =
    projectsLoading || tasksLoading || issuesLoading || communicationsLoading;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const chatContainer = document.getElementById("chat-messages");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Column - ERPNext Context Panel */}
      <div className="w-2/5 border-r border-gray-200 bg-white flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
              <p className="text-sm text-gray-500 mt-1">ERPNext workspace</p>
            </div>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <div className="px-6 pt-4 border-b border-gray-100">
            <TabsList className="grid w-full grid-cols-2 bg-gray-50 p-1">
              <TabsTrigger value="overview" className="text-sm font-medium">
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="communications"
                className="text-sm font-medium"
              >
                Messages
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="overview"
            className="flex-1 overflow-y-auto px-0 pb-0 m-0"
          >
            {/* Tagged Context */}
            {taggedContext.length > 0 && (
              <div className="mx-6 mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-blue-900">
                    Tagged Context ({taggedContext.length})
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllTags}
                    className="text-blue-700 hover:text-blue-900 h-7 text-xs"
                  >
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {taggedContext.map((item) => (
                    <Badge
                      key={`${item.type}-${item.id}`}
                      variant="secondary"
                      className="flex items-center gap-2 bg-white border-blue-200 text-blue-800 text-xs px-3 py-1"
                    >
                      <span className="capitalize font-medium">
                        {item.type}:
                      </span>
                      <span className="truncate max-w-24">{item.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTag(item.type, item.id, item.name);
                        }}
                      >
                        <PinOff className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isAnyLoading && (
              <div className="flex items-center justify-center p-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-3" />
                  <span className="text-sm text-gray-600">
                    Loading projects...
                  </span>
                </div>
              </div>
            )}

            {/* Error State - Not needed for demo with hardcoded data */}

            {/* Project List */}
            {!isAnyLoading && (
              <div className="px-6 py-4 space-y-3">
                {projects.map((project) => {
                  const projectTasks = getTasksByProject(project.name);
                  const projectIssues = getIssuesByProject(project.name);
                  const completedTasks = projectTasks.filter(
                    (t) => t.status.toLowerCase() === "completed"
                  );
                  const openIssues = projectIssues.filter(
                    (i) => i.status.toLowerCase() === "open"
                  );
                  const isExpanded = isProjectExpanded(project.name);

                  return (
                    <div
                      key={project.name}
                      className={`rounded-xl border transition-all duration-200 ${
                        isExpanded
                          ? "border-blue-200 bg-blue-50 shadow-sm"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      {/* Project Header */}
                      <div
                        className="p-5 cursor-pointer"
                        onClick={() => toggleProjectExpansion(project.name)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-base font-semibold text-gray-900 truncate">
                                {project.project_name}
                              </h3>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTag(
                                    "project",
                                    project.name,
                                    project.project_name
                                  );
                                }}
                              >
                                {isTagged("project", project.name) ? (
                                  <PinOff className="h-4 w-4 text-blue-600" />
                                ) : (
                                  <Pin className="h-4 w-4" />
                                )}
                              </Button>
                            </div>

                            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>{project.customer || "No customer"}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {formatDate(project.expected_end_date)}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                              <Badge
                                className={`${getStatusColor(
                                  project.status
                                )} text-sm px-3 py-1`}
                                variant="outline"
                              >
                                {project.status}
                              </Badge>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <TrendingUp className="h-4 w-4" />
                                <span>
                                  {project.percent_complete || 0}% Complete
                                </span>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{
                                  width: `${project.percent_complete || 0}%`,
                                }}
                              ></div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-6 text-sm">
                              <div className="flex items-center gap-2 text-gray-600">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <span>{completedTasks.length} completed</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Circle className="h-4 w-4" />
                                <span>{projectTasks.length} total tasks</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <AlertCircle className="h-4 w-4 text-orange-500" />
                                <span>{openIssues.length} issues</span>
                              </div>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 ml-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleProjectExpansion(project.name);
                            }}
                          >
                            {isExpanded ? (
                              <ChevronDown className="h-5 w-5 text-gray-600" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-gray-600" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="border-t border-blue-200 bg-white rounded-b-xl">
                          <div className="p-5 space-y-4">
                            {/* Tasks Section */}
                            {projectTasks.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  Tasks ({projectTasks.length})
                                </h4>
                                <div className="space-y-2">
                                  {projectTasks.slice(0, 3).map((task) => (
                                    <div
                                      key={task.name}
                                      className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                          {getStatusIcon(task.status)}
                                          <span className="text-sm font-medium text-gray-900">
                                            {task.subject}
                                          </span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-5 w-5 p-0 opacity-60 hover:opacity-100"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleTag(
                                                "task",
                                                task.name,
                                                task.subject
                                              );
                                            }}
                                          >
                                            {isTagged("task", task.name) ? (
                                              <PinOff className="h-3 w-3 text-blue-600" />
                                            ) : (
                                              <Pin className="h-3 w-3" />
                                            )}
                                          </Button>
                                        </div>
                                        <Badge
                                          className={`${getPriorityColor(
                                            task.priority
                                          )} text-xs`}
                                          variant="outline"
                                        >
                                          {task.priority}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                          <div
                                            className="bg-blue-600 h-1.5 rounded-full"
                                            style={{
                                              width: `${task.progress || 0}%`,
                                            }}
                                          ></div>
                                        </div>
                                        <span className="text-xs text-gray-500 min-w-[35px]">
                                          {task.progress || 0}%
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                  {projectTasks.length > 3 && (
                                    <div className="text-center">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs text-gray-500"
                                      >
                                        +{projectTasks.length - 3} more tasks
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Issues Section */}
                            {projectIssues.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                                  <AlertCircle className="h-4 w-4 text-orange-500" />
                                  Issues ({projectIssues.length})
                                </h4>
                                <div className="space-y-2">
                                  {projectIssues.slice(0, 2).map((issue) => (
                                    <div
                                      key={issue.name}
                                      className="p-3 bg-orange-50 rounded-lg border border-orange-200"
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          {getStatusIcon(issue.status)}
                                          <span className="text-sm font-medium text-gray-900">
                                            {issue.subject}
                                          </span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-5 w-5 p-0 opacity-60 hover:opacity-100"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleTag(
                                                "issue",
                                                issue.name,
                                                issue.subject
                                              );
                                            }}
                                          >
                                            {isTagged("issue", issue.name) ? (
                                              <PinOff className="h-3 w-3 text-blue-600" />
                                            ) : (
                                              <Pin className="h-3 w-3" />
                                            )}
                                          </Button>
                                        </div>
                                        <Badge
                                          className={`${getPriorityColor(
                                            issue.priority
                                          )} text-xs`}
                                          variant="outline"
                                        >
                                          {issue.priority}
                                        </Badge>
                                      </div>
                                    </div>
                                  ))}
                                  {projectIssues.length > 2 && (
                                    <div className="text-center">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs text-gray-500"
                                      >
                                        +{projectIssues.length - 2} more issues
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Issues Error State - Not needed for demo */}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="communications"
            className="flex-1 overflow-y-auto px-0 pb-0 m-0"
          >
            {/* Search Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-300 bg-gray-50"
                />
              </div>
            </div>

            {/* Loading State */}
            {communicationsLoading && (
              <div className="flex items-center justify-center p-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-3" />
                  <span className="text-sm text-gray-600">
                    Loading messages...
                  </span>
                </div>
              </div>
            )}

            {/* Error State - Not needed for demo */}

            {/* Communications List */}
            {!communicationsLoading && (
              <div className="px-6 py-4 space-y-3">
                {filteredCommunications.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-500">
                      <div className="text-sm font-medium">
                        No messages found
                      </div>
                      {searchQuery && (
                        <div className="text-xs mt-1">
                          Try adjusting your search terms
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  filteredCommunications.map((comm) => (
                    <div
                      key={comm.name}
                      className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge
                              variant="outline"
                              className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {comm.communication_type === "Email" && "📧"}
                              {comm.communication_type === "Call" && "📞"}
                              {comm.communication_type === "Chat" && "💬"}
                              {comm.communication_type}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 w-5 p-0 opacity-60 hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTag(
                                  "communication",
                                  comm.name,
                                  `${comm.communication_type} - ${comm.sender}`
                                );
                              }}
                            >
                              {isTagged("communication", comm.name) ? (
                                <PinOff className="h-4 w-4 text-blue-600" />
                              ) : (
                                <Pin className="h-4 w-4" />
                              )}
                            </Button>
                            <div className="flex items-center gap-1 text-xs text-gray-500 ml-auto">
                              <Clock className="h-3 w-3" />
                              {formatDate(comm.communication_date)}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm mb-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="font-medium text-gray-900">
                              {comm.sender}
                            </span>
                            <span className="text-gray-400">→</span>
                            <span className="text-gray-600 text-sm">
                              {Array.isArray(comm.recipients)
                                ? comm.recipients.join(", ")
                                : comm.recipients}
                            </span>
                          </div>

                          {comm.subject && (
                            <div className="text-sm font-medium text-gray-900 mb-2">
                              {comm.subject}
                            </div>
                          )}

                          <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                            {comm.content}
                          </p>

                          <Badge
                            variant="secondary"
                            className="text-xs bg-gray-100 text-gray-700"
                          >
                            {comm.reference_doctype}: {comm.reference_name}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Column - AI Chat Interface */}
      <div className="w-3/5 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                AI Assistant
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Ask questions about your projects and tasks
              </p>
            </div>
            {/* Tagged Context Display */}
            {taggedContext.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Context:</span>
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  {taggedContext.length} item
                  {taggedContext.length !== 1 ? "s" : ""} tagged
                </Badge>
              </div>
            )}
          </div>

          {/* Context Chips */}
          {taggedContext.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">
                  Active Context
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllTags}
                  className="text-blue-700 hover:text-blue-900 h-6 text-xs"
                >
                  Clear All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {taggedContext.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="flex items-center gap-2 bg-white border border-blue-200 text-blue-800 text-xs px-3 py-1.5 rounded-full"
                  >
                    <span className="capitalize font-medium">{item.type}:</span>
                    <span className="truncate max-w-32">{item.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => toggleTag(item.type, item.id, item.name)}
                    >
                      <PinOff className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto" id="chat-messages">
          <div className="p-6">
            {/* Message Display */}
            {messages.map((message, index) => {
              const isUser = message.role === "user";
              const isLastMessage = index === messages.length - 1;
              const isStreaming = isLastMessage && !isUser && isLoading;

              return (
                <div
                  key={message.id || index}
                  className={`mb-4 flex ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      isUser
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900 border border-gray-200"
                    }`}
                  >
                    {isUser ? (
                      <div className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </div>
                    ) : (
                      <div className="text-sm">
                        <MarkdownRenderer>
                          {message.content + (isStreaming ? "..." : "")}
                        </MarkdownRenderer>
                        {isStreaming && (
                          <span className="inline-block w-2 h-4 bg-current opacity-75 animate-pulse ml-1" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator for Initial Response */}
            {isLoading &&
              messages.length > 0 &&
              messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-100 text-gray-900 border border-gray-200 rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}

            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-2xl">🤖</div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Welcome to your AI Assistant
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Tag projects, tasks, or issues from the left panel to
                    provide context, then ask me anything about your work.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 text-left">
                    <div className="text-sm font-medium text-gray-900 mb-2">
                      Try asking:
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>
                        • &quot;What&apos;s the status of my projects?&quot;
                      </li>
                      <li>• &quot;Which tasks are overdue?&quot;</li>
                      <li>• &quot;Summarize recent communications&quot;</li>
                      <li>• &quot;What should I prioritize next?&quot;</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Input Area */}
        <div className="border-t border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Quick Actions */}
            {taggedContext.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => {
                    const event = {
                      target: {
                        value:
                          "What's the current status of my tagged projects?",
                      },
                    } as React.ChangeEvent<HTMLInputElement>;
                    handleInputChange(event);
                  }}
                >
                  📊 Project Status
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => {
                    const event = {
                      target: {
                        value: "What tasks are overdue or need attention?",
                      },
                    } as React.ChangeEvent<HTMLInputElement>;
                    handleInputChange(event);
                  }}
                >
                  ⏰ Overdue Tasks
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => {
                    const event = {
                      target: {
                        value: "Summarize recent communications and activities",
                      },
                    } as React.ChangeEvent<HTMLInputElement>;
                    handleInputChange(event);
                  }}
                >
                  💬 Communications
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => {
                    const event = {
                      target: { value: "What should I prioritize next?" },
                    } as React.ChangeEvent<HTMLInputElement>;
                    handleInputChange(event);
                  }}
                >
                  🎯 Next Steps
                </Button>
              </div>
            )}

            {/* Input Field */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder={
                    taggedContext.length > 0
                      ? "Ask about your tagged items..."
                      : "Tag some projects or tasks first, then ask me anything..."
                  }
                  disabled={isLoading}
                  className="pr-12 min-h-[44px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      const form = e.currentTarget.form;
                      if (form) {
                        const formEvent = new Event("submit", {
                          bubbles: true,
                          cancelable: true,
                        });
                        form.dispatchEvent(formEvent);
                      }
                    }
                  }}
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  </div>
                )}
              </div>
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white min-w-[44px] h-[44px]"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span className="text-lg">→</span>
                )}
              </Button>
              {isLoading && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={stop}
                  className="min-w-[60px] h-[44px] border-red-200 text-red-600 hover:bg-red-50"
                >
                  Stop
                </Button>
              )}
            </div>

            {/* Context Info */}
            {taggedContext.length === 0 && (
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <Pin className="h-3 w-3" />
                Tip: Click the pin icons (📌) on projects, tasks, or issues to
                add context
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
