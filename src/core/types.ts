export type User = {
  id: string;
  fullName: string;
  email: string;
  role: 'INTERN' | 'ENGINEER' | 'TRAINEE';
  dateOfBirth?: Date | string | null;
  age: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
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
