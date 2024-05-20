import InputFormContainer from './InputFormContainer';

const meta = {
  component: InputFormContainer,
  argTypes: {
    htmlFor: {
      description: 'The `for` attribute for the label, linking it to the input',
    },
    labelChildren: {
      description: 'The text to be displayed inside the label',
    },
    type: {
      description: 'The type of the input field (e.g., text, password, email)',
    },
    id: {
      description: 'The ID of the input field',
    },
    value: {
      description: 'The value of the input field',
    },
    listener: {
      description: 'Function to be called when the input value changes',
    },
  },
};

export default meta;

export const Default = {
  parameters: {layout: 'centered'},
  tags: ['autodocs'],
  args: {
    htmlFor: 'email',
    labelChildren: 'Email',
    type: 'email',
    id: 'email',
  },
};
