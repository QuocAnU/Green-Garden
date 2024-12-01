import { SignIn } from '@clerk/nextjs';

export default function SignInPage(): JSX.Element {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white">
      <SignIn  />
    </div>
  );
}
