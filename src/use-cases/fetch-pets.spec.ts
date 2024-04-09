import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { FetchPetsUseCase } from "./fetch-pets";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: FetchPetsUseCase;

describe("Fetch Pets by City Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new FetchPetsUseCase(petsRepository);
  });

  it("Should be able to fetch pets by city", async () => {
    const { id: org_id } = await orgsRepository.create({
      password: "123",
      street: "street",
      neighborhood: "neighborhood",
      owner: "owner",
      name: "name",
      cep: "cep",
      city: "city",
      email: "email",
      phone: "phone",
      state: "state",
    });

    await petsRepository.create({
      name: "Bombom",
      color: "Black",
      breed: "Pitbull",
      age: 2,
      org_id,
    });

    await petsRepository.create({
      name: "Nala",
      color: "Black",
      breed: "Pitbull",
      age: 2,
      org_id,
    });

    const { pets } = await sut.execute({ city: "city" });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({
        name: "Bombom",
      }),
      expect.objectContaining({
        name: "Nala",
      }),
    ]);
  });
});
