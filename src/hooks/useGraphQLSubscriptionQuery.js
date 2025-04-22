import { v4 as uuidv4 } from "uuid";
import { WEB_SOCKET_PROTOCOL } from "../constants";
import encodedHeaderPayload from "../utils/encodedHeaderPayload";
import {
  removeKeyFromLocalStorage,
} from "../utils/persistentData";

const MessageType = Object.freeze({
  ConnectionInit: "connection_init",
  ConnectionAck: "connection_ack",
  ConnectionError: "connection_error",
  Data: "data",
  Start: "start",
  Stop: "stop",
  Error: "error",
  KeepAlive: "ka",
  Complete: "complete",
});

export const useGraphQLSubscriptionQuery = (options) => {
  const uuid = uuidv4();
  const { token } = options;

  const connect = () => {
    try {
      const header = encodedHeaderPayload({
        Authorization: `Bearer ${token}`,
        host: import.meta.env.VITE_WEBSOCKET_HOST,
      });
      const payload = encodedHeaderPayload({});
      const url = `${import.meta.env.VITE_WEBSOCKET_URL}?header=${header}&payload=${payload}`;
      return new WebSocket(url, WEB_SOCKET_PROTOCOL);
    } catch (e) {
      console.error("connection error:", e);
    }
  };

  const unsubscribe = (socket) => {
    return () => socket.send(JSON.stringify({ type: "stop", uuid }));
  };

  const subscribe = (socket, query, variables) => {
    return new Promise((resolve, _reject) => {
      let loading = true,
        responseData = null,
        error = false,
        errorMessage = null,
        connectionTimeout,
        keepAliveCount = 0;
      socket.onopen = () => {
        console.log("WebSocket connection established");
        socket.send(
          JSON.stringify({
            id: uuid,
            type: MessageType.ConnectionInit,
          })
        );
      };

      socket.addEventListener("close", (closeMessage) => {
        console.log("Websocket close:", closeMessage);
        loading = false;
        error = true;
        errorMessage = "Connection is closed, please try again later";
        removeKeyFromLocalStorage(uuid);
        resolve({
          loading,
          responseData,
          error,
          errorMessage,
        });
      });

      socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case MessageType.ConnectionAck:
            console.log("Connection Acknowledged");
            connectionTimeout = setTimeout(() => {
              removeKeyFromLocalStorage(uuid);
              socket.close();
            }, data?.payload?.connectionTimeoutMs);
            break;

          case MessageType.KeepAlive:
            console.log("Keep-Alive message received");
            clearTimeout(connectionTimeout);
            if (keepAliveCount === 0) {
              socket.send(
                JSON.stringify({
                  id: uuid,
                  type: MessageType.Start,
                  payload: {
                    data: JSON.stringify({ query, variables }),
                    extensions: {
                      authorization: {
                        Authorization: `Bearer ${token}`,
                        host: import.meta.env.VITE_WEBSOCKET_HOST,
                      },
                    },
                  },
                })
              );
            }
            keepAliveCount = keepAliveCount + 1;
            break;

          case MessageType.ConnectionError:
            console.log("Not able to establish a connection");
            loading = false;
            error = true;
            errorMessage = data?.payload?.errors?.[0].message;
            responseData = null;
            removeKeyFromLocalStorage(uuid);
            resolve({
              loading,
              responseData,
              error,
              errorMessage,
            });
            break;

          case MessageType.Error:
            console.log("Websocket Error");
            loading = false;
            error = true;
            errorMessage = data?.payload?.errors?.[0].message;
            responseData = null;
            removeKeyFromLocalStorage(uuid);
            resolve({
              loading,
              responseData,
              error,
              errorMessage,
            });
            break;
          case MessageType.Stop:
            console.log("Connection Stopped");
            removeKeyFromLocalStorage(uuid);
            socket.close();
            break;
          case MessageType.Data:
            console.log("Data received from websocket");
            loading = false;
            error = false;
            errorMessage = null;
            responseData = data?.payload?.data;
            removeKeyFromLocalStorage(uuid);
            socket.send(JSON.stringify({ type: "stop", id: uuid }));
            socket.close();
            resolve({
              loading,
              responseData,
              error,
              errorMessage,
            });
            break;

          default:
            break;
        }
      });
    });
  };

  return {
    subscribe,
    unsubscribe,
    connect,
  };
};
