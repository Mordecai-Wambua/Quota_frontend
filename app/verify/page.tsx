import { Verify } from "@/components/auth/Verify";
import { Suspense } from "react";

export default function VerifyPage() {
  return(
    <div className="min-h-screen bg-background text-white">
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <Verify />
      </Suspense>
    </div>
  )
}