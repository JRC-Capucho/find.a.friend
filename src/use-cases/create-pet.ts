import { Pet } from "@prisma/client";
import { IPetsRepository } from "../repositories/pets-repository";

interface ICreatePetUseCaseRequest {
  name: string;
  breed: string;
  color: string;
  age: number;
  org_id: string;
}
interface ICreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(private petRepository: IPetsRepository) {}

  async execute({
    name,
    breed,
    color,
    age,
    org_id,
  }: ICreatePetUseCaseRequest): Promise<ICreatePetUseCaseResponse> {
    const pet = await this.petRepository.create({
      name,
      age,
      breed,
      color,
      org_id,
    });

    return { pet };
  }
}
