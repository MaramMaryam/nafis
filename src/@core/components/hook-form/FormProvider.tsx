import { FormProvider as Form } from 'react-hook-form';

interface FormProvider {
  children?: React.ReactNode,
  methods?: any,
  onSubmit?: () => any,
};

export default function FormProvider({ children, onSubmit, methods }: FormProvider) {

  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
