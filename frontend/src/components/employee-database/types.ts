export type User = {
  id: string;
  employee_id: string;
};

export type CheckClockSetting = {
  id: string;
  name: string;
};

export type Employee = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  phone: string;
  ck_settings_id?: string; // FK to CheckClockSetting
  check_clock_setting?: CheckClockSetting; // The related branch info
  position: string;
  contract_type?: string;
  grade?: string;
  status: number;
  employment_status?: string;
  type?: string;
  user?: User;
  join_date?: string;
  created_at?: string;
  avatar?: string | null;
  department?: string;
  tempat_lahir?: string;
  birth_date?: string;
  address?: string;
  pendidikan_terakhir?: string;
  nik?: string;
  bank?: string;
  nomor_rekening?: string;
  atas_nama_rekening?: string;
  tipe_sp?: string;
};
