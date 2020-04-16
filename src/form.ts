/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Vue from 'vue';
import { cloneDeep } from './util';

interface VForm {
  validate(): boolean;
  resetValidation(): void;
}

export const FormMixin = Vue.extend({
  props: {
    value: { type: Boolean, default: false },
    editing: { type: Object },
  },
  data: () => ({
    item: undefined,
  }),
  created(): void {
    this.formReset();
  },
  methods: {
    formInit(): any | undefined {
      return undefined;
    },
    formSave(): Promise<any> {
      return Promise.resolve(this.item);
    },
    formElement(): VForm {
      return (this.$refs.form as unknown) as VForm;
    },
    formSubmit(): void {
      const elem = this.formElement();
      if (elem != null && elem.validate()) {
        this.formSave().then((current) => {
          this.$emit('saved', { current, previous: this.editing });
          this.formCancel();
        });
      }
    },
    formCancel(): void {
      this.$emit('input', false);
    },
    formReset(): void {
      const elem = this.formElement();
      if (elem != null) {
        elem.resetValidation();
      }

      let promise = this.formInit();
      if (!(promise instanceof Promise)) {
        promise = Promise.resolve(promise);
      }
      return promise.then((item: any) => {
        this.item = cloneDeep(this.editing, item);
        this.formReady();
        return this.item;
      });
    },
    formReady(): void {},
  },
  computed: {
    formContext(): string {
      return 'Item';
    },
    formTitle(): string {
      return this.editing == null ? `New ${this.formContext}` : `Edit ${this.formContext}`;
    },
  },
  watch: {
    value(on): void {
      if (on) this.formReset();
    },
  },
});
