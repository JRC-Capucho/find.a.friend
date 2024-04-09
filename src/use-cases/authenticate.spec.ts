import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate user", async () => {
    await usersRepository.create({
      name: "John Doe",
      password: await hash("123456789", 8),
      email: "johndoe@mail.com",
    });

    const { user } = await sut.execute({
      password: "123456789",
      email: "johndoe@mail.com",
    });

    expect(user.name).toEqual("John Doe");
  });
});
