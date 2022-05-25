# Vue Form Builder

This package is designed for Vue 2 and doesn't provide yet a support for Vue 3.

## Installation

```bash
yarn add @paxtiz/vue-form-builder
```

## Usage

### Add plugin
```vue
import FormBuilder from '@paxtiz/vue-form-builder'

Vue.use(FormBuilder)
```

### Example
```vue
<template>
    <FormBuilder
        :button="button"
        :items="items"
        :model="model"
        @submit="onSubmit"
    />
</template>

<script>
import { minLength, contains } from "@paxtiz/vue-form-builder"

export default {
    data: () => ({
        button: {
            tetx: "Click me :)",
        },
        items: [
            {
                type: "text",
                name: "name",
                label: "Post name",
                placeholder: true,
                validators: [
                minLength(2, "Name is too short"),
                contains(
                    "hello",
                    "Name must contains the string 'hello'"
                ),
                ],
                classes: ["custom-button"],
            },
            {
                children: [
                    {
                        type: "file",
                        name: "file",
                        multiple: false,
                        label: "Post image",
                    },
                    {
                        type: "checkbox",
                        name: "tags",
                        label: "Post tags",
                        options: [
                            { value: 1, label: "Tag 1" },
                            { value: 2, label: "Tag 2" },
                            { value: 3, label: "Tag 3" },
                        ],
                    }
                ]
            }
        ],
        model: {
            name: "My first post",
            file: null,
            tags: [1, 3],
        },
    }),

    methods: {
        onSubmit(form) {
            console.log(form)
        }
    }
}
</script>
```