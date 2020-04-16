# BSM Vue Mixins

Common mixins for Vue projects, written in TypeScript.

## FormMixin

```html
<!-- src/components/users/Form.vue -->
<template>
  <v-dialog :value="value" persistent max-width="640" @keydown.esc="formCancel">
    <v-card>
      <v-card-title>
        <h2 class="headline" v-text="formTitle"></h2>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" lazy-validation v-if="item">
          <v-text-field label="Name" type="text" model="item.name"></v-text-field>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <slot></slot>
        <v-spacer></v-spacer>
        <v-btn text @click.native="formCancel">Cancel</v-btn>
        <v-btn text @click.native="formSubmit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { FormMixin } from 'bsm-vue-mixins';

export default {
  mixins: [FormMixin],
  data: () => ({
    formContext: 'Users',
  }),
  methods: {
    // On-save callback.
    formSave() {
      return Promise.resolve(this.item);
    },
  },
};
</script>
```

```html
<!-- src/views/users/List.vue -->
<template>
  <div>
    <user-form v-model="form.show" :editing="form.edit"></user-form>

    <v-btn @click="formOpen()">Add User</v-btn>
    <v-btn @click="formOpen(items[0])">Edit User #1</v-btn>
    <v-btn @click="formOpen(items[1])">Edit User #2</v-btn>
  </div>
</template>

<script>
import UserForm from '@/components/users/Form.vue';

export default {
  components: [UserForm],
  data: () => ({
    form: {
      show: false,
    },
    items: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ],
  }),
  methods: {
   formOpen(item) {
      this.form.edit = item;
      this.form.show = true;
    },
  },
};
</script>
```
