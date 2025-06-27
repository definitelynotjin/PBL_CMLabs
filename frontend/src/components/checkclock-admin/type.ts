export interface Employee {
  id: string;
  name: string;
  position: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  status: string;
  approved: boolean;
  rejected: boolean;
  avatar?: string;
  department?: {
    name?: string;
  };
  ck_setting_id?: {
    name?: string;
  };
  proof_file_url?: string;
}

export interface DetailedEmployee extends Employee {
  avatar?: string | null;
  department?: string;
  check_clock_setting?: {
    name?: string;
  };
  proof_file_url?: string;
}
