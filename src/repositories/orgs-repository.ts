import { Org, Prisma } from "@prisma/client";

export interface IOrgsRepository {
  create(data: Prisma.OrgCreateWithoutPetInput): Promise<Org>;
}
