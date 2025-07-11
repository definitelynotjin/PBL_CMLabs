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
  avatar?: string | null;
  department?: string;
  ck_setting_id?: {
    name?: string;
  };
  proof_file_url?: string;
  supporting_document_path?: string;
}

export interface DetailedEmployee extends Employee {
  check_clock_setting?: {
    name?: string;
  };
}
