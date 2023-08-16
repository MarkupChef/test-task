import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { FormControl, MenuItem, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import * as React from 'react';
import { FC, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import productSchema from '../../forms/schemas/product.schemas';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { addDataItem, saveDataItem } from '../../store/commonSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface PopupFormInput {
  id?: number;
  categoryId: string;
  author: string;
  name: string;
  text: string;
  price: number;
  rating: number;
  stock: number;
  publicationYear: string;
}

interface CustomizedDialogsProps {
  handleClose: () => void;
  open: boolean;
  id?: number;
  categoryId?: string;
  author?: string;
  name?: string;
  text?: string;
  price?: number;
  rating?: number;
  stock?: number;
  publicationYear?: string;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const CustomizedDialogs: FC<CustomizedDialogsProps> = ({
  open,
  handleClose,
  id,
  categoryId,
  author,
  name,
  text,
  price,
  rating,
  stock,
  publicationYear,
}) => {
  const dispatch = useAppDispatch();

  const { categoryList } = useAppSelector((state) => state.common);

  const {
    control,
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm<PopupFormInput>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      id: 0,
      categoryId: '1',
      author: '',
      name: '',
      text: '',
      price: 0,
      rating: 0,
      stock: 0,
      publicationYear: '',
    },
  });

  useEffect(() => {
    reset();
  }, [open]);

  useEffect(() => {
    setValue('id', id || 0);
    setValue('categoryId', categoryId || '1');
    setValue('author', author || '');
    setValue('name', name || '');
    setValue('text', text || '');
    setValue('price', price || 0);
    setValue('rating', rating || 0);
    setValue('stock', stock || 0);
    setValue('publicationYear', publicationYear || '');
  }, [id]);

  const onSubmit: SubmitHandler<PopupFormInput> = (data) => {
    const dataItem = {
      categoryId: +data.categoryId,
      author: data.author,
      name: data.name,
      text: data.text,
      price: +data.price,
      rating: +data.rating,
      stock: +data.stock,
      publicationYear: +data.publicationYear,
    };

    if (data.id) {
      dispatch(
        saveDataItem({
          id: data.id,
          ...dataItem,
        })
      );
    } else {
      dispatch(addDataItem(dataItem));
    }

    handleClose();
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth={'sm'}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            {id ? 'Edit product' : 'Add new product'}
          </BootstrapDialogTitle>
          <DialogContent className={'flex flex-col gap-8'} dividers>
            {id && <input type="hidden" {...register('id')} />}
            <FormControl>
              <Controller
                name="author"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors?.author}
                    helperText={errors?.author?.message}
                    fullWidth
                    label="Author"
                    variant="outlined"
                    size={'small'}
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors?.name}
                    helperText={errors?.name?.message}
                    fullWidth
                    label="Name"
                    variant="outlined"
                    size={'small'}
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <Controller
                name="text"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors?.text}
                    helperText={errors?.text?.message}
                    fullWidth
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    size={'small'}
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value === 0 ? '' : field.value}
                    error={!!errors?.price}
                    helperText={errors?.price?.message}
                    fullWidth
                    label="Price"
                    variant="outlined"
                    size={'small'}
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <Controller
                name="stock"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value === 0 ? '' : field.value}
                    error={!!errors?.stock}
                    helperText={errors?.stock?.message}
                    fullWidth
                    label="Stock"
                    variant="outlined"
                    size={'small'}
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value === 0 ? '' : field.value}
                    error={!!errors?.rating}
                    helperText={errors?.rating?.message}
                    fullWidth
                    label="Rating"
                    variant="outlined"
                    size={'small'}
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="publicationYear"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value ? dayjs(field.value.toString()) : ''}
                      label={'Publication Year'}
                      slotProps={{
                        textField: {
                          size: 'small',
                          error: !!errors?.publicationYear,
                          helperText: errors?.publicationYear?.message,
                        },
                      }}
                      views={['year']}
                      openTo="year"
                      onChange={(data) => {
                        if (data) {
                          if (typeof data === 'string') {
                            field.onChange(data);
                          } else {
                            field.onChange(data.year().toString());
                          }
                        }
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select id="category-select" label="Category" size={'small'}>
                    {categoryList.map(({ id, name }) => (
                      <MenuItem key={`category-${id}`} value={`${id}`}>
                        {name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button type={'submit'} autoFocus>
              Save
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </>
  );
};

export default CustomizedDialogs;
