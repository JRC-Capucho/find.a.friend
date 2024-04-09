import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository";
import { CreateOrgUseCase } from "./create-org";

let orgsRepository: InMemoryOrgsRepository;
let sut: CreateOrgUseCase;

describe("Create Org Pet Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgUseCase(orgsRepository);
  });

  it("should be able to create org", async () => {
    const { org } = await sut.execute({
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
    expect(org.id).toEqual(expect.any(String));
  });
});
