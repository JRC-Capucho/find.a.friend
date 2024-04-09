import { Pet, Prisma } from "@prisma/client";

export interface IFindParams {
  city: string;
  age?: string;
  size?: string;
  energy_level?: string;
  environment?: string;
}

export interface IPetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  getById(id: string): Promise<Pet | null>;
  fetch(params: IFindParams): Promise<Pet[] | null>;
}
