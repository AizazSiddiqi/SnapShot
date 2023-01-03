// Libhoney is the Honeycomb SDK for sending telemetry Events to Honeycomb's API
// Docs for Libhoney live at https://docs.honeycomb.io/getting-data-in/javascript/libhoney/
// Here's our Honeycomb SDK configuration
import Libhoney from "libhoney";

const hny = new Libhoney({
    writeKey: "yDeDoIX8zaSpdWKtPSejhK",
    dataset: "snapshop-app-events"
});

const sendEvent = (eventData) => {
    let ev = hny.newEvent();
    for (const eventName in eventData) {
        ev.addField(eventName, eventData[eventName]);
    }
    ev.send();
}

export default sendEvent;