import { useGraphQLSubscriptionQuery } from "./useGraphQLSubscriptionQuery";

let mockWebSocket;

describe("useGraphQLSubscriptionQuery", () => {
  beforeEach(() => {
    mockWebSocket = {
      send: jest.fn(),
      close: jest.fn(),
      addEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
      onopen: jest.fn(),
    };
    global.WebSocket = jest.fn(() => mockWebSocket);
  });

  afterEach(() => {
    mockWebSocket.close();
  });

  test("should establish a WebSocket connection", () => {
    const { connect } = useGraphQLSubscriptionQuery({ token: "sampleToken" });
    const socket = connect();
    expect(socket).toBeDefined();
    expect(socket).toBeInstanceOf(mockWebSocket.constructor);
  });

  test("should get error while establishing WebSocket connection", () => {
    const { connect } = useGraphQLSubscriptionQuery({ token: 123 });

    connect();
  });

  test("should subscribe and receive data from WebSocket", async () => {
    const subscriptionQuery = "subscription { ... }";
    const { connect, subscribe } = useGraphQLSubscriptionQuery({
      token: "sampleToken",
    });
    const socket = connect();
    const subscriptionPromise = subscribe(socket, subscriptionQuery);
    const event = new MessageEvent("message", {
      data: JSON.stringify({ type: "data", payload: { data: "sampleData" } }),
    });
    mockWebSocket.dispatchEvent(event);

    const { loading, responseData, error, errorMessage } = subscriptionPromise;
    expect(loading).toBeFalsy();
    expect(error).toBeFalsy();
    expect(errorMessage);
    expect(responseData);
  });


  test("should handle connection with connection ack", async () => {
    jest.mock("uuid", () => ({ v4: () => "mocked-uuid" }));
    jest.mock("../utils/persistentData", () => ({
      removeKeyFromLocalStorage: jest.fn(),
    }));
    const socket = {
      onopen: jest.fn(),
      addEventListener: jest.fn(),
      send: jest.fn(),
      close: jest.fn(),
      message: jest.fn(),
    };
    const mockEvent = {
      data: JSON.stringify({
        type: "connection_ack",
        payload: { errors: [{ message: "connection_ack" }] },
      }),
    };
    jest.spyOn(global, "WebSocket").mockImplementation(() => socket);
    const options = { token: "mocked-token" };
    const subscriptionQuery = "mocked-subscription-query";
    const { subscribe } = useGraphQLSubscriptionQuery(options);
    const subscribePromise = subscribe(socket, subscriptionQuery);
    socket.onopen();
    socket.addEventListener.mock.calls[1][1](mockEvent);

    const result = subscribePromise;

    socket.message();

    expect(result);

    expect(socket.close);
  });

  test("should handle connection with connection KeepAlive", async () => {
    jest.mock("uuid", () => ({ v4: () => "mocked-uuid" }));
    jest.mock("../utils/persistentData", () => ({
      removeKeyFromLocalStorage: jest.fn(),
    }));
    const socket = {
      onopen: jest.fn(),
      addEventListener: jest.fn(),
      send: jest.fn(),
      close: jest.fn(),
      message: jest.fn(),
    };
    const mockEvent = {
      data: JSON.stringify({
        type: "ka",
        payload: { errors: [{ message: "KeepAlive" }] },
      }),
    };
    jest.spyOn(global, "WebSocket").mockImplementation(() => socket);
    const options = { token: "mocked-token" };
    const subscriptionQuery = "mocked-subscription-query";
    const { subscribe } = useGraphQLSubscriptionQuery(options);
    const subscribePromise = subscribe(socket, subscriptionQuery);
    socket.onopen();
    socket.addEventListener.mock.calls[1][1](mockEvent);

    const result = subscribePromise;

    socket.message();

    expect(result);

    expect(socket.close);
  });
  test("should handle connection with connection connection_error", async () => {
    jest.mock("uuid", () => ({ v4: () => "mocked-uuid" }));
    jest.mock("../utils/persistentData", () => ({
      removeKeyFromLocalStorage: jest.fn(),
    }));
    const socket = {
      onopen: jest.fn(),
      addEventListener: jest.fn(),
      send: jest.fn(),
      close: jest.fn(),
      message: jest.fn(),
    };
    const mockEvent = {
      data: JSON.stringify({
        type: "connection_error",
        payload: { errors: [{ message: "connection_error" }] },
      }),
    };
    jest.spyOn(global, "WebSocket").mockImplementation(() => socket);
    const options = { token: "mocked-token" };
    const subscriptionQuery = "mocked-subscription-query";
    const { subscribe } = useGraphQLSubscriptionQuery(options);
    const subscribePromise = subscribe(socket, subscriptionQuery);
    socket.onopen();
    socket.addEventListener.mock.calls[1][1](mockEvent);

    const result = subscribePromise;

    socket.message();

    expect(result);

    expect(socket.close);
  });

  test("should handle connection with  error", async () => {
    jest.mock("uuid", () => ({ v4: () => "mocked-uuid" }));
    jest.mock("../utils/persistentData", () => ({
      removeKeyFromLocalStorage: jest.fn(),
    }));
    const socket = {
      onopen: jest.fn(),
      addEventListener: jest.fn(),
      send: jest.fn(),
      close: jest.fn(),
      message: jest.fn(),
    };
    const mockEvent = {
      data: JSON.stringify({
        type: "error",
        payload: { errors: [{ message: "error" }] },
      }),
    };
    jest.spyOn(global, "WebSocket").mockImplementation(() => socket);
    const options = { token: "mocked-token" };
    const subscriptionQuery = "mocked-subscription-query";
    const { subscribe } = useGraphQLSubscriptionQuery(options);
    const subscribePromise = subscribe(socket, subscriptionQuery);
    socket.onopen();
    socket.addEventListener.mock.calls[1][1](mockEvent);

    const result = subscribePromise;

    socket.message();

    expect(result);

    expect(socket.close);
  });


  test("should handle connection with  stop", async () => {
    jest.mock("uuid", () => ({ v4: () => "mocked-uuid" }));
    jest.mock("../utils/persistentData", () => ({
      removeKeyFromLocalStorage: jest.fn(),
    }));
    const socket = {
      onopen: jest.fn(),
      addEventListener: jest.fn(),
      send: jest.fn(),
      close: jest.fn(),
      message: jest.fn(),
    };
    const mockEvent = {
      data: JSON.stringify({
        type: "stop",
        payload: { errors: [{ message: "stop" }] },
      }),
    };
    jest.spyOn(global, "WebSocket").mockImplementation(() => socket);
    const options = { token: "mocked-token" };
    const subscriptionQuery = "mocked-subscription-query";
    const { subscribe } = useGraphQLSubscriptionQuery(options);
    const subscribePromise = subscribe(socket, subscriptionQuery);
    socket.onopen();
    socket.addEventListener.mock.calls[1][1](mockEvent);

    const result = subscribePromise;

    socket.message();

    expect(result);

    expect(socket.close);
  });

  test("should handle connection with  data", async () => {
    jest.mock("uuid", () => ({ v4: () => "mocked-uuid" }));
    jest.mock("../utils/persistentData", () => ({
      removeKeyFromLocalStorage: jest.fn(),
    }));
    const socket = {
      onopen: jest.fn(),
      addEventListener: jest.fn(),
      send: jest.fn(),
      close: jest.fn(),
      message: jest.fn(),
    };
    const mockEvent = {
      data: JSON.stringify({
        type: "data",
        payload: { errors: [{ message: "data" }] },
      }),
    };
    jest.spyOn(global, "WebSocket").mockImplementation(() => socket);
    const options = { token: "mocked-token" };
    const subscriptionQuery = "mocked-subscription-query";
    const { subscribe } = useGraphQLSubscriptionQuery(options);
    const subscribePromise = subscribe(socket, subscriptionQuery);
    socket.onopen();
    socket.addEventListener.mock.calls[1][1](mockEvent);

    const result = subscribePromise;

    socket.message();

    expect(result);

    expect(socket.close);
  });


  test("should handle connection with  close", async () => {
    jest.mock("uuid", () => ({ v4: () => "mocked-uuid" }));
    jest.mock("../utils/persistentData", () => ({
      removeKeyFromLocalStorage: jest.fn(),
    }));
    const socket = {
      onopen: jest.fn(),
      addEventListener: jest.fn(),
      send: jest.fn(),
      close: jest.fn(),
      message: jest.fn(),
    };
    const mockEvent = {
      data: JSON.stringify({
        type: "close",
        payload: { errors: [{ message: "close" }] },
      }),
    };
    jest.spyOn(global, "WebSocket").mockImplementation(() => socket);
    const options = { token: "mocked-token" };
    const subscriptionQuery = "mocked-subscription-query";
    const { subscribe } = useGraphQLSubscriptionQuery(options);
    const subscribePromise = subscribe(socket, subscriptionQuery);
    socket.onopen();
    socket.addEventListener.mock.calls[1][1](mockEvent);

    const result = subscribePromise;

    socket.message();

    expect(result);

    expect(socket.close);
  });

  test("should handle connection with connection error", async () => {
    jest.mock("uuid", () => ({ v4: () => "mocked-uuid" }));
    jest.mock("../utils/persistentData", () => ({
      removeKeyFromLocalStorage: jest.fn(),
    }));
    const socket = {
      onopen: jest.fn(),
      addEventListener: jest.fn(),
      send: jest.fn(),
      close: jest.fn(),
      message: jest.fn(),
    };
    const mockEvent = {
      data: JSON.stringify({
        type: "error",
        payload: { errors: [{ message: "connection_error" }] },
      }),
    };
    jest.spyOn(global, "WebSocket").mockImplementation(() => socket);
    const options = { token: "mocked-token" };
    const subscriptionQuery = "mocked-subscription-query";
    const { subscribe } = useGraphQLSubscriptionQuery(options);
    const subscribePromise = subscribe(socket, subscriptionQuery);
    socket.onopen();
    socket.addEventListener.mock.calls[1][1](mockEvent);

    const result = subscribePromise;

    socket.message();

    expect(result);

    expect(socket.close);
  });
  test("should handle connection error", async () => {
    jest.mock("uuid", () => ({ v4: () => "mocked-uuid" }));
    jest.mock("../utils/persistentData", () => ({
      removeKeyFromLocalStorage: jest.fn(),
    }));
    const socket = {
      onopen: jest.fn(),
      addEventListener: jest.fn(),
      send: jest.fn(),
      close: jest.fn(),
      message: jest.fn(),
    };
    const mockEvent = {
      data: JSON.stringify({
        type: "ConnectionError",
        payload: { errors: [{ message: "mocked-error-message" }] },
      }),
    };
    jest.spyOn(global, "WebSocket").mockImplementation(() => socket);
    const options = { token: "mocked-token" };
    const subscriptionQuery = "mocked-subscription-query";
    const { subscribe } = useGraphQLSubscriptionQuery(options);
    const subscribePromise = subscribe(socket, subscriptionQuery);
    socket.onopen();
    socket.addEventListener.mock.calls[1][1](mockEvent);

    const result = subscribePromise;

    socket.message();

    expect(result);

    expect(socket.close);
  });


});
