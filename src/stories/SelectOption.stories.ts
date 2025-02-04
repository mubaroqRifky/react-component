import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import SelectOption from "./SelectOption";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "Example/SelectOption",
    component: SelectOption,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "fullscreen",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {},
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { onChange: fn() },
} satisfies Meta<typeof SelectOption>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = Array.from({ length: 10 }).map((_, i) => {
    return {
        value: i + 1,
        text: `Option ${i + 1}`,
    };
});

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        label: "Label",
        placeholder: "Select Option",
        id: "value",
        optionLabel: "text",
        options,
        outlined: false,
        withSearch: true,
        multiple: false,
    },
};
