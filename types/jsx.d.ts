import { JSX } from "solid-js";

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      ['sl-button-group']: any;
      ['sl-button']: any;
      ['sl-range']: any;
    }
  }
}
