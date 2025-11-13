// components/login-button.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Fragment } from "react";
import { useFormStatus } from "react-dom";

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" aria-disabled={pending} disabled={pending}>
      {pending ? (
        <Fragment>
          <Loader2 className="h-10 w-10 animate-spin text-orange-600" />
          Autenticando...
        </Fragment>
      ) : (
        "Acessar"
      )}
    </Button>
  );
}