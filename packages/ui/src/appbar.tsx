import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="flex justify-between border-b px-4">
      <h1 className="text-xl">wallet</h1>
      <Button onClick={user ? onSignout : onSignin}>
        {user ? "logout" : "login"}
      </Button>
    </div>
  );
};
