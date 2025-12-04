import type { LeafletEvent } from "leaflet";

export interface LeafletEventExtended extends LeafletEvent {
  originalEvent: MouseEvent & {
    pageX: number;
    pageY: number;
  };
}
