import { describe, it, beforeEach, expect } from "vitest";
import { CreatePetUseCase } from "./create-pet";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";

let petsRespository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: CreatePetUseCase;
describe("Create Pet Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRespository = new InMemoryPetsRepository(orgsRepository);
    sut = new CreatePetUseCase(petsRespository);
  });

  it("should be able to create pet", async () => {
    const { id } = await orgsRepository.create({
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

    const { pet } = await sut.execute({
      name: "Bombom",
      color: "Black",
      breed: "Pitbull",
      age: 2,
      org_id: id,
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
