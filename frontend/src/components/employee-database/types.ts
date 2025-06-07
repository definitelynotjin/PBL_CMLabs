// types.ts
export type User = {
  id: string;
  employee_id: string;
};

export type Employee = {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  gender: string;
  phone: string;
  branch?: string;
  position: string;
  grade?: string;
  status: boolean;
  employment_status?: string;
  type?: string;
  user?: User; // Ensure this property is defined
};