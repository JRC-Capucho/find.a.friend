import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { GetPetUseCase } from "./get-pet";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: GetPetUseCase;
describe("Get Pet Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new GetPetUseCase(petsRepository);
  });

  it("should be able to get pet", async () => {
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

    const { id } = await petsRepository.create({
      name: "Bombom",
      color: "Black",
      breed: "Pitbull",
      age: 2,
      org_id,
    });

    const { pet } = await sut.execute({ petId: id });

    expect(pet.id).toEqual(expect.any(String));
  });
});
