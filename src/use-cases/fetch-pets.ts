import { Pet } from "@prisma/client";
import { IPetsRepository } from "../repositories/pets-repository";
import { NotFoundPetError } from "./errors/not-found-pet-error";

interface IFetchPetsUseCaseRequest {
  city: string;
  age?: string;
  size?: string;
  energy_level?: string;
  environment?: string;
}

interface IFetchPetsUseCaseResponse {
  pets: Pet[];
}

export class FetchPetsUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    environment,
  }: IFetchPetsUseCaseRequest): Promise<IFetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.fetch({
      city,
      age,
      size,
      energy_level,
      environment,
    });

    if (!pets) {
      throw new NotFoundPetError();
    }

    return { pets };
  }
}
