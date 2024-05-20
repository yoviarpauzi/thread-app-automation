import ButtonClearFilter from './ButtonClearFilter';
import '../../index.css';

const meta = {
  component: ButtonClearFilter,
  argTypes: {
    listener: {
      description: 'Function will remove the parameters in the url',
    },
  },
};

export default meta;

export const Default = {
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {listener: () => alert('Filter cleared!')},
};
