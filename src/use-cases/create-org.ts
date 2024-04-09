import { Org } from "@prisma/client";
import { IOrgsRepository } from "../repositories/orgs-repository";
import { hash } from "bcryptjs";

interface ICreateOrgUseCaseRequest {
  name: string;
  owner: string;
  email: string;
  phone: string;
  password: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

interface ICreateOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: IOrgsRepository) {}

  async execute({
    password,
    state,
    phone,
    email,
    city,
    cep,
    name,
    owner,
    neighborhood,
    street,
  }: ICreateOrgUseCaseRequest): Promise<ICreateOrgUseCaseResponse> {
    const passwordHash = await hash(password, 8);

    const org = await this.orgsRepository.create({
      password: passwordHash,
      state,
      phone,
      email,
      city,
      cep,
      name,
      owner,
      neighborhood,
      street,
    });

    return { org };
  }
}
