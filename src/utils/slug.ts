import slugify from "slugify";
import { IBookRepository } from "../repositories/interfaces/ibook.repository";

export const generateUniqueSlug = async (
  title: string,
  bookRepository: IBookRepository
): Promise<string> => {
  const rawSlug = slugify(title, { lower: true, strict: true });
  let slug = rawSlug;
  let count = 1;
  while (await bookRepository.findBySlug(slug)) {
    slug = `${rawSlug}-${count}`;
    count++;
  }
  return slug;
};