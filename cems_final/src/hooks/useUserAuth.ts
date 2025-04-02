import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useUserAuth = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token || role !== "user") {
        router.push("/login");
      }
    }
  }, [router]);
};