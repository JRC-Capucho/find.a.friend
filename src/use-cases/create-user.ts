import { User } from "@prisma/client";
import { IUsersRepository } from "../repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { hash } from "bcryptjs";

interface ICreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface ICreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUserUseCaseRequest): Promise<ICreateUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    password = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return { user };
  }
}
