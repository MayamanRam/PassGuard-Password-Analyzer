export interface PasswordGeneratorOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean;     // e.g. 0, O, o, 1, l, I
  excludeSimilar: boolean;       // e.g. {} [] () / \ ' " ` ~ , ; : . < >
  requireAllSelected: boolean;   // guarantee at least 1 char of each chosen set
  count: number;                 // batch generation (1 - 50)
}

export interface GeneratedPasswordItem {
  id: string;
  password: string;
  entropy: number;
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  createdAt: number;
}

