import { Pet } from "@prisma/client";
import { NotFoundPetError } from "./errors/not-found-pet-error";
import { IPetsRepository } from "../repositories/pets-repository";

interface IGetPetUseCaseRequest {
  petId: string;
}

interface IGetPetUseCaseResponse {
  pet: Pet;
}

export class GetPetUseCase {
  constructor(private petsRepository: IPetsRepository) {}
  async execute({
    petId,
  }: IGetPetUseCaseRequest): Promise<IGetPetUseCaseResponse> {
    const pet = await this.petsRepository.getById(petId);

    console.log(pet);
    if (!pet) {
      throw new NotFoundPetError();
    }

    return { pet };
  }
}
