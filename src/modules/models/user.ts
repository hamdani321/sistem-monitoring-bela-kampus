import { Mahasiswa } from "./mahasiswa";

export class User {
  id: number = 0;
  name: string = "";
  email: string = "";
  //relasi
  mahasiswa: Mahasiswa | null = null;
}
