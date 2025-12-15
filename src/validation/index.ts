import { object, string, array } from 'yup';

export const  taskSchema = object({
    title: string().required(),
    labels: array().min(1, "You can't leave this blank.").max(3, "Label limit reached").required("You can't leave this blank."),
    description: string().required(),
});
