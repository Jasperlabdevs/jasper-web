declare namespace globalThis {
  interface DefaultRootState {
    communityTypes: any;
    messages: any;
  }

  type NotificationType = {
    type: "error" | "success" | "info" | undefined;
    title: string;
    message: string;
    autoDeleteTime?: number;
  };
}
