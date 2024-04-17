export interface OptionSelect {
  value: any;
  label: string;
}

export interface NewOptionSelect {
  code: string;
  name: string;
}

export interface OptionRadio {
  isActive?: boolean;
  id: number | string;
  label: string;
}

export interface CustomErrorMessages {
  required?: string;
  email?: string;
  minlength?: string;
  maxlength?: string;
  min?: string;
  max?: string;
}
