export interface FilterPropertiesInterface {
  name?: any;

  createdAt?: Date;

  updatedAt?: Date;

  isDeactivated?: boolean;

  order?: 'ASC' | 'DESC';

  limit?: number;

  page?: number;
}
