export class NotFoundPetError extends Error {
  constructor() {
    super("Pet(s) not found.");
  }
}
