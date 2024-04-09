import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe("Create User Use Case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it("should be able to create user", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      password: "123456789",
      email: "johndoe@mail.com",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to create user with same email", async () => {
    await sut.execute({
      name: "John Doe",
      password: "123456789",
      email: "johndoe@mail.com",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        password: "123456789",
        email: "johndoe@mail.com",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
