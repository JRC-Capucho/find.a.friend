import { Pet, Prisma } from "@prisma/client";
import { IFindParams, IPetsRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";
import { InMemoryOrgsRepository } from "./in-memory-orgs-repository";

export class InMemoryPetsRepository implements IPetsRepository {
  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  public items: Pet[] = [];

  async fetch(params: IFindParams) {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city,
    );

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energy_level ? item.energy_level === params.energy_level : true,
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true,
      );

    return pets;
  }

  async getById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }
    return pet;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      breed: data.breed,
      color: data.color,
      age: data.age,
      org_id: data.org_id,
    };

    this.items.push(pet);

    return pet;
  }
}
