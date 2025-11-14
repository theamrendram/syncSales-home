import { User } from "better-auth";
declare module "better-auth" {
  interface Session {
    user: {
      orgId: string | null;
      systemRole: string;
    } & User;
  }
}
