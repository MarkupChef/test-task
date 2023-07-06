import CloseIcon from '@mui/icons-material/Close';
import { FormControl, MenuItem, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { FC, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
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
  category: number;
  name: string;
  text: string;
}

interface CustomizedDialogsProps {
  handleClose: () => void;
  open: boolean;
  id?: number;
  categoryId?: number;
  name?: string;
  text?: string;
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

const CustomizedDialogs: FC<CustomizedDialogsProps> = ({ open, handleClose, id, categoryId, name, text }) => {
  const dispatch = useAppDispatch();

  console.log('categoryId', categoryId);
  console.log('name', name);

  const { categoryList } = useAppSelector((state) => state.common);

  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<PopupFormInput>({
    defaultValues: {
      category: 1,
      name: '',
      text: '',
    },
  });

  useEffect(() => {
    setValue('id', id || 0);
    setValue('category', categoryId || 1);
    setValue('name', name || '');
    setValue('text', text || '');
  }, [id]);

  const onSubmit: SubmitHandler<PopupFormInput> = (data) => {
    const categoryName = categoryList.find((category) => category.id === data.category);

    console.log('data', data);

    if (!categoryName?.name) {
      console.error('Category name not found');

      return;
    }

    const dataItem = {
      categoryId: data.category,
      category: categoryName.name,
      name: data.name,
      text: data.text,
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
            Add item
          </BootstrapDialogTitle>
          <DialogContent className={'flex flex-col gap-8'} dividers>
            {id && <input type="hidden" {...register('id')} />}

            <FormControl>
              <Controller
                name="category"
                control={control}
                defaultValue={1}
                render={({ field }) => (
                  <TextField {...field} select id="category-select" label="Category" size={'small'}>
                    {categoryList.map(({ id, name }) => (
                      <MenuItem key={`category-${id}`} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </FormControl>
            <FormControl>
              <Controller
                name="name"
                rules={{ required: `Name field is required` }}
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
                rules={{ required: `Text field is required` }}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors?.text}
                    helperText={errors?.text?.message}
                    fullWidth
                    label="Text"
                    variant="outlined"
                    multiline
                    rows={4}
                    size={'small'}
                  />
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
