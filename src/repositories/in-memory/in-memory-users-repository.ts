import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../users-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = [];
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
    };

    this.items.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
