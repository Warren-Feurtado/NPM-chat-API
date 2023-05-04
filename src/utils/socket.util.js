import { io } from "socket.io-client";
import { SOCKETAPI } from "../environment/env";

export class SocketUtil {
  listeners = new Map([
    ["msg", new Map()],
    ["contact", new Map()],
    ["endcontact", new Map()],
  ]);

  //the hashtag here is used to make the variable private
  #socket = io(SOCKETAPI);

  constructor() {
    [...this.listeners.keys()].forEach((key) => {
      this.#socket.on(key, (object) => {
        console.log("LISTENER AUTOMIZER", key);
        this.listeners.get(key)?.forEach((callback) => {
          callback(object);
        });
      });
    });
  }

  //Check if the event is registered in the listeners list.
  //if event exists get it and set its value, which in our case is a map, "(hence we set another key and value)", whose value is a callback
  //if event not valid throw error in console
  on(event, c, key) {
    if (this.listeners.has(event)) this.listeners.get(event)?.set(key, c);
    else console.error(`"${event}" is not a registered listener event!`);
  }

  
  boot(uuid) {
    return new Promise((resolve, reject) => {
      this.#socket.emit("boot", { uuid }, (status, data = "") => {
        if (status) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  }

  chat(name) {
    this.#socket.emit("chat", { name });
  }

  sendMsg(content) {
    let msgData = {msg: content};
    this.#socket.emit("msg", msgData );
  }

  vmsg(content) {
    return new Promise((resolve, reject) => {
      this.#socket.emit("vmsg", { content }, (status, data = "") => {
        if (status) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  }

  file(content) {
    return new Promise((resolve, reject) => {
      this.#socket.emit("file", { content, ext: "" }, (status, data = "") => {
        if (status) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  }

  contact() {
    return new Promise((resolve, reject) => {
      this.#socket.emit("contact", (status, data = "") => {
        if (status) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  }

  endcontact() {
    return new Promise((resolve, reject) => {
      this.#socket.emit("endcontact", (status, data = "") => {
        if (status) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  }
}
