export interface Step {
  name: string;
  title: string;
  status: "pending" | "current" | "completed" | "error";
} 