export class Food {
  _id?: string;
  id: string  | undefined;
  name!: string;
  price!: number;
  tags!: string[];
  favorite!: boolean;
  stars!: number;
  imageUrl!: string;
  origins!: string[];
  cookTime!: string;
}

