import { number, object, string } from 'yup';

const author = string()
  .required('Author field cannot be blank')
  .max(21, 'Author should contain at most 21 character(s)');

const productSchema = object().shape({
  categoryId: string().required(),
  author,
  name: string().required('Name field cannot be blank'),
  text: string().required('Description field cannot be blank'),
  price: number()
    .required('Price field cannot be blank')
    .min(1, 'Price should contain at least 1 character(s)')
    .moreThan(0, 'Price must be more then 0')
    .typeError('Price must be a number'),

  rating: number()
    .required('Rating field cannot be blank')
    .min(0.1, 'The Rating value must be from 0.1')
    .max(10, 'The Rating value must be no more than 10')
    .typeError('Rating must be a number')
    .test('maxDigits', 'Rating must have at most 3 characters', (value) => {
      if (!value) {
        return true;
      }
      const ratingString = value.toString();

      return ratingString.length <= 3;
    }),

  stock: number().required('Stock field cannot be blank').typeError('Rating must be a number'),
  publicationYear: string().required('Publication Year field cannot be blank'),
});

export default productSchema;
