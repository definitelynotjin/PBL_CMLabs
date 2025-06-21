export type User = {
  id: string;
  employee_id: string;
};

export type CheckClockSetting = {
  id: string;
  name: string; // e.g., "Jakarta Office"
};

export type Employee = {
  id: string;               // Usually UUID string if you use UUIDs in backend
  user_id: string;
  first_name: string;
  last_name: string;
  gender: string;
  phone: string;
  ck_settings_id?: string; // FK to CheckClockSetting
  check_clock_setting?: CheckClockSetting; // The related branch info
  position: string;
  grade?: string;
  status: number;
  employment_status?: string;
  type?: string;
  user?: User;
};
