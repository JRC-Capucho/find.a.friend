import { User } from "@prisma/client";
import { IUsersRepository } from "../repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { compare } from "bcryptjs";
import { InvalidCredentailsError } from "./errors/invalid-credentails-error";

interface IAuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface IAuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserAlreadyExistsError();
    }

    const doesPasswordMatches = await compare(password, user.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentailsError();
    }

    return { user };
  }
}
