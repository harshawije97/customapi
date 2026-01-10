export type User = {
  id: string;
  fullName: string;
  email: string;
  role: 'INTERN' | 'ENGINEER' | 'TRAINEE';
  dateOfBirth?: string;
  age: number;
};

export type CreateUser = {
  fullName: string;
  email: string;
  role: 'INTERN' | 'ENGINEER' | 'TRAINEE';
  dateOfBirth?: string;
  age: number;
};

export type UpdateUser = {
  fullName?: string;
  email?: string;
  role?: 'INTERN' | 'ENGINEER' | 'TRAINEE';
  dateOfBirth?: string;
  age?: number;
};
