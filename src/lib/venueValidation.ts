import { z } from 'zod';

export const venueSchema = z.object({
  name: z.string().trim().min(1, 'Your venue needs a name'),
  description: z.string().trim().min(1, 'Please describe your venue'),
  maxGuests: z.coerce
    .number()
    .int('Max guests must be a whole number')
    .min(1, 'Max guests must be at least 1')
    .max(100, 'A venue cannot accomodate more than 100 guests'),
  price: z.coerce
    .number()
    .int('Price must be a whole number')
    .min(1, 'Price must be at least 1')
    .max(10000, 'A venue cannot cost more than 10 000'),
});

export type VenueFieldErrors = {
  name?: string;
  description?: string;
  maxGuests?: string;
  price?: string;
};

type VenueFormValues = {
  name: string;
  description: string;
  maxGuests: string;
  price: string;
};

type ValidateVenueResult =
  | { ok: true; data: z.infer<typeof venueSchema> }
  | { ok: false; fieldErrors: VenueFieldErrors };

export function validateVenue(values: VenueFormValues): ValidateVenueResult {
  const result = venueSchema.safeParse(values);

  if (result.success) {
    return { ok: true, data: result.data };
  }

  const fieldErrors: VenueFieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (
      field === 'name' ||
      field === 'description' ||
      field === 'maxGuests' ||
      field === 'price'
    ) {
      fieldErrors[field] = issue.message;
    }
  }

  return { ok: false, fieldErrors };
}
