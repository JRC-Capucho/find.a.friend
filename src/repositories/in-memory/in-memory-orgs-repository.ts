import { Org, Prisma } from "@prisma/client";
import { IOrgsRepository } from "../orgs-repository";
import { randomUUID } from "crypto";

export class InMemoryOrgsRepository implements IOrgsRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateWithoutPetInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      owner: data.owner,
      email: data.email,
      phone: data.phone,
      password: data.password,
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
    };

    this.items.push(org);

    return org;
  }
}
